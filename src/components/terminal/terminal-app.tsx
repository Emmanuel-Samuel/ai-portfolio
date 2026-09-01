"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { runCommand, welcome, PINNED_COMMANDS } from "@/components/terminal/commands";

const PROMPT = "emmanuel@portfolio:~$";
const LINE_DELAY_MS = 90;

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

export default function TerminalApp() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([bannerEntry()]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

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

  const submitCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      const result = runCommand(command);

      if (result.kind === "clear") {
        setEntries([]);
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
    [router, startTyping],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          <span className="text-[#29D6B9] shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent outline-none border-none text-zinc-100 caret-transparent"
          />
          <span className="w-2 h-4 bg-[#29D6B9] animate-pulse" aria-hidden />
        </div>
      </div>
    </div>
  );
}
