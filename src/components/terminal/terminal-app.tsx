"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  runCommand,
  welcome,
  formatMarkdown,
  PINNED_COMMANDS,
} from "@/components/terminal/commands";

const PROMPT = "emmanuel@portfolio:~$";
const LINE_DELAY_MS = 90;
const MAX_HISTORY = 12;

type ChatMessage = { content: string; sender: "user" | "ai" };

type HistoryEntry = {
  id: number;
  command: string | null; // null for the welcome banner (no prompt shown)
  lines: ReactNode[];
  revealed: number;
};

let nextId = 1;

function bannerEntry(): HistoryEntry {
  return {
    id: 0,
    command: null,
    lines: welcome(),
    revealed: 0,
  };
}

// Static assets (e.g. the resume PDF) aren't app routes, so they need a
// real navigation instead of the client-side router.
function isFileHref(href: string) {
  return /\.[a-z0-9]+$/i.test(href);
}

// Small animated "thinking..." line so a 10-15s API round trip never looks hung.
function ThinkingIndicator() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 400);
    return () => clearInterval(id);
  }, []);
  return <span className="text-zinc-400">{`thinking${".".repeat(dots)}`}</span>;
}

export default function TerminalApp() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([bannerEntry()]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastQueryRef = useRef<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingEntryIdRef = useRef<number | null>(null);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const stopTyping = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const skipTyping = useCallback(() => {
    const typingId = typingEntryIdRef.current;
    if (typingId === null) return;
    stopTyping();
    setEntries((prev) =>
      prev.map((e) => (e.id === typingId ? { ...e, revealed: e.lines.length } : e)),
    );
    typingEntryIdRef.current = null;
  }, [stopTyping]);

  const startTyping = useCallback(
    (id: number, totalLines: number) => {
      stopTyping();
      typingEntryIdRef.current = id;
      if (totalLines === 0) {
        typingEntryIdRef.current = null;
        return;
      }
      typingIntervalRef.current = setInterval(() => {
        setEntries((prev) =>
          prev.map((e) => {
            if (e.id !== id) return e;
            const revealed = Math.min(e.revealed + 1, e.lines.length);
            if (revealed >= e.lines.length) {
              stopTyping();
              typingEntryIdRef.current = null;
            }
            return { ...e, revealed };
          }),
        );
      }, LINE_DELAY_MS);
    },
    [stopTyping],
  );

  // Start typing the initial welcome banner on mount.
  useEffect(() => {
    startTyping(0, bannerEntry().lines.length);
    return () => stopTyping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAiQuery = useCallback(
    async (query: string, echoCommand: string) => {
      const id = nextId++;
      lastQueryRef.current = query;
      setIsLoading(true);
      setEntries((prev) => [
        ...prev,
        { id, command: echoCommand, lines: [<ThinkingIndicator key="thinking" />], revealed: 1 },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query, conversationHistory: aiHistory }),
        });
        const data = await res.json();

        if (!res.ok) {
          const errorLines: ReactNode[] = [
            <span key="err" className="text-rose-400">
              {data?.error ?? "Something went wrong."}
            </span>,
          ];
          if (data?.retryable) {
            errorLines.push(
              <span key="retry-hint" className="text-zinc-400">
                Type <span className="text-zinc-100">retry</span> to try again.
              </span>,
            );
          }
          setEntries((prev) =>
            prev.map((e) => (e.id === id ? { ...e, lines: errorLines, revealed: errorLines.length } : e)),
          );
          return;
        }

        const answer = typeof data?.response === "string" ? data.response : "";
        const answerLines = formatMarkdown(answer);
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, lines: answerLines, revealed: answerLines.length } : e)),
        );
        setAiHistory((prev) =>
          [...prev, { content: query, sender: "user" as const }, { content: answer, sender: "ai" as const }].slice(
            -MAX_HISTORY,
          ),
        );
      } catch {
        const failLines: ReactNode[] = [
          <span key="neterr" className="text-rose-400">
            Network error — couldn&apos;t reach the assistant.
          </span>,
          <span key="neterr-retry" className="text-zinc-400">
            Type <span className="text-zinc-100">retry</span> to try again.
          </span>,
        ];
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, lines: failLines, revealed: failLines.length } : e)),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [aiHistory],
  );

  const submitCommand = useCallback(
    (raw: string) => {
      if (isLoading) return;
      const command = raw.trim();

      if (command.toLowerCase() === "retry") {
        if (!lastQueryRef.current) {
          const id = nextId++;
          const lines: ReactNode[] = [
            <span key="noretry" className="text-zinc-400">
              No previous question to retry.
            </span>,
          ];
          setEntries((prev) => [...prev, { id, command, lines, revealed: lines.length }]);
          return;
        }
        void handleAiQuery(lastQueryRef.current, command);
        return;
      }

      const result = runCommand(command, (suggestion) => submitCommand(suggestion));

      if (result.kind === "ai") {
        void handleAiQuery(result.query, command);
        return;
      }
      if (result.kind === "clear") {
        setEntries([]);
        setAiHistory([]);
        return;
      }
      if (result.kind === "navigate") {
        if (isFileHref(result.href)) {
          window.open(result.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(result.href);
        }
        return;
      }

      const id = nextId++;
      setEntries((prev) => [
        ...prev,
        { id, command, lines: result.lines, revealed: 0 },
      ]);
      startTyping(id, result.lines.length);
    },
    [router, startTyping, isLoading, handleAiQuery],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading) return;
    if (e.key === "Enter") {
      if (typingEntryIdRef.current !== null) {
        skipTyping();
        return;
      }
      if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== input) {
        if (input.trim() !== "") setCmdHistory((h) => [...h, input]);
      }
      setHistoryIndex(null);
      submitCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex =
        historyIndex === null ? cmdHistory.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  const handleContainerClick = () => {
    if (typingEntryIdRef.current !== null) {
      skipTyping();
    }
    focusInput();
  };

  return (
    <div
      className="h-dvh w-full bg-[#0B0F0E] text-zinc-100 font-mono text-sm sm:text-base p-4 overflow-hidden flex flex-col"
      onClick={handleContainerClick}
    >
      <div
        className="flex flex-wrap items-center gap-x-0 gap-y-1 pb-3 mb-2 border-b border-zinc-800 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {PINNED_COMMANDS.map((cmd, i) => (
          <span key={cmd} className="flex items-center">
            <button
              type="button"
              onClick={() => {
                submitCommand(cmd);
                focusInput();
              }}
              className="text-[#29D6B9] hover:text-[#29D6B9]/80 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29D6B9] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F0E]"
            >
              {cmd}
            </button>
            {i < PINNED_COMMANDS.length - 1 && <span className="text-zinc-600">&nbsp;|&nbsp;</span>}
          </span>
        ))}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1">
        {entries.map((entry) => (
          <div key={entry.id} className="mb-2">
            {entry.command !== null && (
              <div>
                <span className="text-[#29D6B9]">{PROMPT}</span>{" "}
                <span>{entry.command}</span>
              </div>
            )}
            {entry.lines.slice(0, entry.revealed).map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {line}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className={`shrink-0 ${isLoading ? "text-zinc-600" : "text-[#29D6B9]"}`}>{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
            aria-busy={isLoading}
            placeholder={isLoading ? "waiting for response…" : undefined}
            className={`flex-1 min-w-0 bg-transparent outline-none border-none caret-transparent placeholder:text-zinc-600 ${
              isLoading ? "text-zinc-600" : "text-zinc-100"
            }`}
          />
          <span
            className={`w-2 h-4 animate-pulse ${isLoading ? "bg-zinc-600" : "bg-[#29D6B9]"}`}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
