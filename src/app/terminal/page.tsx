import type { Metadata } from "next";
import TerminalApp from "@/components/terminal/terminal-app";

export const metadata: Metadata = {
  title: "Terminal",
  description: "An interactive terminal easter egg — type 'help' to start.",
};

export default function TerminalPage() {
  return <TerminalApp />;
}
