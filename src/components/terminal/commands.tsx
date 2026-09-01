import type { ReactNode } from "react";
import {
  personalInfo,
  about,
  experiences,
  projects,
  skillCategories,
  papersAndTalks,
  certifications,
  leadership,
} from "@/data/portfolio";

// Each command returns an array of "lines" so the terminal can reveal
// them one at a time for the typewriter effect.
export type CommandResult =
  | { kind: "output"; lines: ReactNode[] }
  | { kind: "clear" }
  | { kind: "navigate"; href: string }
  | { kind: "ai"; query: string };

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="text-[#29D6B9] underline hover:text-[#29D6B9]/80"
  >
    {children}
  </a>
);

// The command bar pinned above the terminal history — order matches the
// requested reference layout exactly.
export const PINNED_COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "education",
  "certifications",
  "leadership",
  "sudo",
  "clear",
] as const;

const HELP_GROUPS: { title: string; commands: string[] }[] = [
  {
    title: "About me",
    commands: ["about", "experience", "education", "skills", "certifications", "leadership"],
  },
  { title: "Work", commands: ["projects", "papers"] },
  { title: "Get in touch", commands: ["contact", "resume", "blog"] },
  { title: "System", commands: ["welcome", "sudo", "clear", "help", "exit", "home"] },
  { title: "Ask the assistant", commands: ["ask <question>", "retry"] },
];

function askUsage(): ReactNode[] {
  return [
    <span key="ask-usage" className="text-zinc-400">
      Ask me anything — start a line with <span className="text-[#29D6B9]">/</span> followed by
      your question, e.g. <span className="text-zinc-100">/what tech do you use?</span>, or type{" "}
      <span className="text-zinc-100">ask &lt;question&gt;</span>.
    </span>,
  ];
}

function help(): ReactNode[] {
  return [
    <span key="ask-hint" className="text-zinc-100">
      <span className="text-[#29D6B9]">/&lt;question&gt;</span> — ask me anything, e.g.{" "}
      <span className="text-[#29D6B9]">/what tech do you use?</span>
    </span>,
    "Available commands:",
    ...HELP_GROUPS.map((group) => (
      <div key={group.title}>
        <p className="text-zinc-400">{group.title}</p>
        <ul className="ml-4">
          {group.commands.map((c) => (
            <li key={c}>
              <span className="text-zinc-100">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    )),
    <span key="ask-alias" className="text-zinc-400">
      <span className="text-zinc-100">ask &lt;question&gt;</span> is an alias for{" "}
      <span className="text-[#29D6B9]">/&lt;question&gt;</span>; if a request fails, type{" "}
      <span className="text-zinc-100">retry</span> to resend the last question.
    </span>,
    <span key="hint" className="text-zinc-400">
      Use the up/down arrow keys to browse command history.
    </span>,
  ];
}

export function welcome(): ReactNode[] {
  return [
    `Hi, I'm ${personalInfo.name}, an ${personalInfo.role}.`,
    "",
    "Welcome to my interactive 'AI powered' portfolio terminal!",
    "Type 'help' to see available commands, or start a line with / to ask me anything.",
  ];
}

function about_(): ReactNode[] {
  return [
    `${personalInfo.name} — ${personalInfo.role}`,
    personalInfo.tagline,
    <span key="summary" className="whitespace-pre-wrap">
      {about.summary}
    </span>,
    <ul key="highlights" className="ml-4 list-disc">
      {about.highlights.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>,
  ];
}

function skills(): ReactNode[] {
  return skillCategories.map((c) => (
    <div key={c.title}>
      <p className="text-zinc-100">{c.title}</p>
      <p className="ml-4 text-zinc-400">{c.skills.join(", ")}</p>
    </div>
  ));
}

function projectsCmd(): ReactNode[] {
  return projects.map((p) => (
    <div key={p.slug}>
      <p>
        <span className="text-zinc-100">{p.title}</span>{" "}
        <span className="text-zinc-400">({p.category})</span>
      </p>
      <p className="ml-4">{p.summary}</p>
      <p className="ml-4 text-zinc-400">{p.tech.join(", ")}</p>
      <p className="ml-4">
        <Link href={p.github}>[github]</Link>
        {p.live ? (
          <>
            {" | "}
            <Link href={p.live}>[live]</Link>
          </>
        ) : null}
      </p>
    </div>
  ));
}

function papers(): ReactNode[] {
  if (papersAndTalks.length === 0) {
    return [
      "Nothing published yet.",
      <span key="blog">
        See the <Link href="/blog">blog</Link> for writing in the meantime.
      </span>,
    ];
  }
  return papersAndTalks.map((p) => (
    <p key={p.title}>
      <span className="text-zinc-100">{p.title}</span> — {p.venue} ({p.date}){" "}
      <Link href={p.link}>[link]</Link>
    </p>
  ));
}

function experience(): ReactNode[] {
  const work = experiences.filter((e) => e.type === "work");
  return work.map((w) => (
    <div key={w.company + w.role}>
      <p>
        <span className="text-zinc-100">{w.role}</span> @ {w.company}{" "}
        <span className="text-zinc-400">({w.period})</span>
      </p>
      <p className="ml-4">{w.summary}</p>
      {w.bullets.length > 0 && (
        <ul className="ml-4 list-disc">
          {w.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  ));
}

function education(): ReactNode[] {
  const edu = experiences.filter((e) => e.type === "education");
  return edu.map((e) => (
    <div key={e.company + e.role}>
      <p>
        <span className="text-zinc-100">{e.role}</span> @ {e.company}{" "}
        <span className="text-zinc-400">({e.period})</span>
      </p>
      <p className="ml-4">{e.summary}</p>
      {e.bullets.length > 0 && (
        <ul className="ml-4 list-disc">
          {e.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  ));
}

function certificationsCmd(): ReactNode[] {
  return certifications.map((c) => (
    <p key={c.title}>
      <span className="text-zinc-100">{c.title}</span> — {c.issuer}{" "}
      <span className="text-zinc-400">({c.year})</span>
    </p>
  ));
}

function leadershipCmd(): ReactNode[] {
  return leadership.map((l) => (
    <div key={l.role + l.org}>
      <p>
        <span className="text-zinc-100">{l.role}</span> @ {l.org}{" "}
        <span className="text-zinc-400">({l.period})</span>
      </p>
      <p className="ml-4">{l.detail}</p>
    </div>
  ));
}

function contact(): ReactNode[] {
  return [
    <span key="email">
      Email: <Link href={`mailto:${personalInfo.email}`}>{personalInfo.email}</Link>
    </span>,
    <span key="linkedin">
      LinkedIn: <Link href={personalInfo.linkedin}>{personalInfo.linkedin}</Link>
    </span>,
    <span key="github">
      GitHub: <Link href={personalInfo.github}>{personalInfo.github}</Link>
    </span>,
  ];
}

function sudo(): ReactNode[] {
  return [
    <span key="sudo" className="text-rose-400">
      Permission denied: {personalInfo.name.split(" ")[0].toLowerCase()} is not in the sudoers
      file. This incident will be reported.
    </span>,
  ];
}

function truncate(s: string, max = 60) {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

function notFound(rawInput: string, onSuggestionClick: (cmd: string) => void): ReactNode[] {
  const echoed = truncate(rawInput);
  const suggestion = `/${echoed}`;
  return [
    <span key="nf-1">
      <span className="text-zinc-400">command not found:</span>{" "}
      <span className="text-rose-400">{echoed}</span>{" "}
      <span className="text-zinc-400">— type &apos;help&apos; for commands</span>
    </span>,
    <span key="nf-2">
      <span className="text-zinc-400">try:</span>{" "}
      <button
        type="button"
        onClick={() => onSuggestionClick(suggestion)}
        className="text-[#29D6B9] hover:text-[#29D6B9]/80 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29D6B9] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F0E]"
      >
        {suggestion}
      </button>{" "}
      <span className="text-zinc-400">to ask the assistant</span>
    </span>,
  ];
}

// Turns a small subset of markdown ([label](href), **bold**, `code`, "- " lists)
// into plain-text-terminal-friendly React nodes, without a markdown dependency.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      const label = match[1];
      const href = match[2];
      const external = /^https?:\/\//i.test(href);
      nodes.push(
        <a
          key={`${keyPrefix}-${key++}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-[#29D6B9] underline hover:text-[#29D6B9]/80"
        >
          {label}
        </a>,
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <span key={`${keyPrefix}-${key++}`} className="text-zinc-100 font-semibold">
          {match[3]}
        </span>,
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <span key={`${keyPrefix}-${key++}`} className="text-zinc-100">
          {match[4]}
        </span>,
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function formatMarkdown(markdown: string): ReactNode[] {
  return markdown.split("\n").map((line, i) => {
    if (line.trim() === "") return <span key={`md-${i}`} />;
    const listMatch = /^(\s*)[-*]\s+(.*)$/.exec(line);
    if (listMatch) {
      return (
        <span key={`md-${i}`}>
          {"  • "}
          {renderInline(listMatch[2], `md-${i}`)}
        </span>
      );
    }
    return <span key={`md-${i}`}>{renderInline(line, `md-${i}`)}</span>;
  });
}

export function runCommand(
  rawInput: string,
  onSuggestionClick: (cmd: string) => void,
): CommandResult {
  const trimmed = rawInput.trim();

  if (trimmed.startsWith("/")) {
    const query = trimmed.slice(1).trim();
    if (query === "") return { kind: "output", lines: askUsage() };
    return { kind: "ai", query };
  }

  const askMatch = /^ask\s+(.+)$/i.exec(trimmed);
  if (askMatch) {
    return { kind: "ai", query: askMatch[1].trim() };
  }

  const cmd = trimmed.toLowerCase();

  switch (cmd) {
    case "help":
      return { kind: "output", lines: help() };
    case "about":
      return { kind: "output", lines: about_() };
    case "skills":
      return { kind: "output", lines: skills() };
    case "projects":
      return { kind: "output", lines: projectsCmd() };
    case "papers":
      return { kind: "output", lines: papers() };
    case "experience":
      return { kind: "output", lines: experience() };
    case "education":
      return { kind: "output", lines: education() };
    case "certifications":
      return { kind: "output", lines: certificationsCmd() };
    case "leadership":
      return { kind: "output", lines: leadershipCmd() };
    case "contact":
      return { kind: "output", lines: contact() };
    case "welcome":
      return { kind: "output", lines: welcome() };
    case "sudo":
      return { kind: "output", lines: sudo() };
    case "clear":
      return { kind: "clear" };
    case "resume":
      return { kind: "navigate", href: personalInfo.resumeUrl };
    case "blog":
      return { kind: "navigate", href: "/blog" };
    case "exit":
    case "home":
      return { kind: "navigate", href: "/" };
    case "ask":
      return { kind: "output", lines: askUsage() };
    case "":
      return { kind: "output", lines: [] };
    default:
      return { kind: "output", lines: notFound(trimmed, onSuggestionClick) };
  }
}
