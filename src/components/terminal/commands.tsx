import type { ReactNode } from "react";
import { DATA } from "@/data/resume";

// Each command returns an array of "lines" so the terminal can reveal
// them one at a time for the typewriter effect.
export type CommandResult =
  | { kind: "output"; lines: ReactNode[] }
  | { kind: "clear" }
  | { kind: "navigate"; href: string };

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="text-blue-400 underline hover:text-blue-300"
  >
    {children}
  </a>
);

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "papers",
  "experience",
  "education",
  "contact",
  "clear",
  "sudo",
  "exit",
  "home",
] as const;

function help(): ReactNode[] {
  return [
    "Available commands:",
    <ul key="list" className="ml-4">
      {COMMANDS.map((c) => (
        <li key={c}>
          <span className="text-yellow-400">{c}</span>
        </li>
      ))}
    </ul>,
    <span key="hint" className="text-white/50">
      Use the up/down arrow keys to browse command history.
    </span>,
  ];
}

function about(): ReactNode[] {
  return [
    `${DATA.name} (${DATA.initials}) — ${DATA.location}`,
    DATA.description,
    <span key="summary" className="whitespace-pre-wrap">
      {DATA.summary}
    </span>,
  ];
}

function skills(): ReactNode[] {
  return [
    "Skills:",
    <span key="list" className="ml-4 text-white/80">
      {DATA.skills.map((s) => s.name).join(", ")}
    </span>,
  ];
}

function projects(): ReactNode[] {
  return DATA.projects.map((p) => (
    <div key={p.title}>
      <p>
        <span className="text-yellow-400">{p.title}</span>{" "}
        <span className="text-white/40">({p.dates})</span>
      </p>
      <p className="ml-4">{p.description}</p>
      <p className="ml-4 text-white/50">{p.technologies.join(", ")}</p>
      {p.links.length > 0 && (
        <p className="ml-4">
          {p.links.map((l, i) => (
            <span key={l.href + i}>
              {i > 0 && " | "}
              <Link href={l.href}>{l.type}</Link>
            </span>
          ))}
        </p>
      )}
    </div>
  ));
}

function papers(): ReactNode[] {
  const talks = DATA.papersAndTalks.map((p) => (
    <p key={p.title}>
      <span className="text-yellow-400">{p.title}</span> — {p.venue} (
      {p.date}) <Link href={p.link}>[link]</Link>
    </p>
  ));
  const oss = DATA.publicMlProjects.map((p) => (
    <p key={p.title}>
      <span className="text-yellow-400">{p.title}</span> — {p.description}{" "}
      <Link href={p.href}>[link]</Link>
    </p>
  ));
  return ["Papers, talks & open-source:", ...talks, ...oss];
}

function experience(): ReactNode[] {
  return DATA.work.map((w) => (
    <div key={w.company + w.title}>
      <p>
        <span className="text-yellow-400">{w.title}</span> @{" "}
        <Link href={w.href}>{w.company}</Link>{" "}
        <span className="text-white/40">
          ({w.start} - {w.end})
        </span>
      </p>
      <p className="ml-4">{w.description}</p>
    </div>
  ));
}

function education(): ReactNode[] {
  return DATA.education.map((e) => (
    <p key={e.school}>
      <span className="text-yellow-400">{e.degree}</span> —{" "}
      <Link href={e.href}>{e.school}</Link>{" "}
      <span className="text-white/40">
        ({e.start} - {e.end})
      </span>
    </p>
  ));
}

function contact(): ReactNode[] {
  const socials = Object.entries(DATA.contact.social).map(([name, s]) => (
    <p key={name}>
      {s.name}: <Link href={s.url}>{s.url}</Link>
    </p>
  ));
  return [
    <span key="email">
      Email:{" "}
      <Link href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</Link>
    </span>,
    ...socials,
  ];
}

function sudo(): ReactNode[] {
  return [
    <span key="sudo" className="text-red-400">
      Permission denied: emmanuel is not in the sudoers file. This incident
      will be reported.
    </span>,
  ];
}

function notFound(cmd: string): ReactNode[] {
  return [
    <span key="notfound">
      command not found: <span className="text-red-400">{cmd}</span> — type
      &apos;<span className="text-yellow-400">help</span>&apos;
    </span>,
  ];
}

export function runCommand(rawInput: string): CommandResult {
  const cmd = rawInput.trim().toLowerCase();

  switch (cmd) {
    case "help":
      return { kind: "output", lines: help() };
    case "about":
      return { kind: "output", lines: about() };
    case "skills":
      return { kind: "output", lines: skills() };
    case "projects":
      return { kind: "output", lines: projects() };
    case "papers":
      return { kind: "output", lines: papers() };
    case "experience":
      return { kind: "output", lines: experience() };
    case "education":
      return { kind: "output", lines: education() };
    case "contact":
      return { kind: "output", lines: contact() };
    case "sudo":
      return { kind: "output", lines: sudo() };
    case "clear":
      return { kind: "clear" };
    case "exit":
    case "home":
      return { kind: "navigate", href: "/" };
    case "":
      return { kind: "output", lines: [] };
    default:
      return { kind: "output", lines: notFound(cmd) };
  }
}
