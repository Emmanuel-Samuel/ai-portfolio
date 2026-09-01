import { NextResponse } from "next/server";
import { Resend } from "resend";
import { personalInfo } from "@/data/portfolio";
import {
  CONTACT_REQUEST_TIMEOUT_MS,
  contactRequestSchema,
  getContactSubmissionIssue,
} from "@/lib/contact";
import { checkRateLimit, getClientKey, getRateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60_000;
const RESEND_TIMEOUT_MS = CONTACT_REQUEST_TIMEOUT_MS;

const requestStore = new Map<string, { count: number; resetAt: number }>();

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error("Email request timed out.")), timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

// Short, human-quotable reference for every submission: PF-YYMMDD-XXXX
// Date prefix sorts chronologically in a mailbox; the suffix keeps it unique.
function makeReference() {
  const d = new Date();
  const yy = String(d.getUTCFullYear()).slice(2);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no I/L/O/0/1 - avoids misreading
  let suffix = "";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  return `PF-${yy}${mm}${dd}-${suffix}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getRecipients(recipientList?: string) {
  const recipients = recipientList
    ?.split(/[;,]/)
    .map((value) => value.trim())
    .filter(Boolean);

  return recipients && recipients.length > 0 ? [...new Set(recipients)] : [personalInfo.email];
}

export async function POST(request: Request) {
  const rateLimitResult = checkRateLimit(requestStore, getClientKey(request), {
    limit: RATE_LIMIT,
    windowMs: WINDOW_MS,
  });
  const rateLimitHeaders = getRateLimitHeaders(RATE_LIMIT, rateLimitResult.remaining, rateLimitResult.resetAt);

  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: "Too many contact requests. Please wait a few minutes before trying again." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": String(rateLimitResult.retryAfter),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid contact form submission." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const submissionIssue = getContactSubmissionIssue(parsed.data);
    if (submissionIssue) {
      if (submissionIssue.kind === "honeypot") {
        return NextResponse.json(
          { success: true, message: "Message sent successfully." },
          { headers: rateLimitHeaders }
        );
      }

      return NextResponse.json(
        { error: submissionIssue.message },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const sender = process.env.CONTACT_EMAIL_FROM?.trim();
    const recipients = getRecipients(process.env.CONTACT_EMAIL_TO);

    if (!apiKey || !sender) {
      return NextResponse.json(
        { error: "Contact email is not configured on the server yet." },
        { status: 503, headers: rateLimitHeaders }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, reason, message } = parsed.data;
    const reference = makeReference();
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const { data, error } = await withTimeout(
      resend.emails.send({
        from: sender,
        to: recipients,
        replyTo: email,
        subject: `[Portfolio ${reference}] ${reason} inquiry from ${name}`,
        text: [
          "New portfolio contact form submission",
          "",
          `Reference: ${reference}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Reason: ${reason}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin-bottom: 16px;">New portfolio contact form submission</h2>
            <p style="margin: 0 0 12px; font-family: monospace; color: #6b7280;"><strong>Reference:</strong> ${reference}</p>
            <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin: 0 0 8px;"><strong>Reason:</strong> ${escapeHtml(reason)}</p>
            <p style="margin: 24px 0 8px;"><strong>Message:</strong></p>
            <div style="padding: 16px; border-radius: 12px; background: #f3f4f6;">${safeMessage}</div>
          </div>
        `,
        tags: [
          { name: "source", value: "portfolio_contact" },
          { name: "channel", value: "website" },
        ],
      }),
      RESEND_TIMEOUT_MS
    );

    if (error) {
      console.error("Resend contact email failed", error);

      return NextResponse.json(
        { error: "Something went wrong while sending your message. Please try again later." },
        { status: 502, headers: rateLimitHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully.", reference, id: data?.id },
      { headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error("Contact form request failed", error);

    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again later." },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
