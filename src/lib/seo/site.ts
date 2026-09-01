import { about, personalInfo } from "@/data/portfolio";

const siteUrl = "https://emmanuelsamuel.dev";
export const ogLocale = "en_US";

export const siteConfig = {
  siteUrl,
  homeUrl: `${siteUrl}/`,
  resumeUrl: `${siteUrl}${personalInfo.resumeUrl}`,
  updatedAt: "2026-05-14T00:00:00.000Z",
  siteName: "Emmanuel Samuel Portfolio",
  title: `${personalInfo.name} — AI/ML Engineer`,
  description: personalInfo.tagline,
  author: personalInfo.name,
  creator: personalInfo.name,
  email: personalInfo.email,
  github: personalInfo.github,
  linkedin: personalInfo.linkedin,
  locale: "en-US",
  ogLocale,
  ogImage: "/og-image.svg",
  keywords: [
    "Emmanuel Samuel",
    "Software Engineer",
    "AI Engineer",
    "ML Engineer",
    "LLM Infrastructure",
    "Agentic AI",
    "Autonomous Agents",
    "RAG",
    "Retrieval-Augmented Generation",
    "LangChain",
    "LangGraph",
    "Vercel AI SDK",
    "pgvector",
    "PyTorch",
    "TypeScript",
    "Node.js",
    "Python",
    "Next.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "AI Infrastructure",
    "Full-Stack Development",
  ],
  geo: {
    region: "NG-LA",
    placename: "Lagos, Nigeria",
    latitude: 6.5244,
    longitude: 3.3792,
    position: "6.5244;3.3792",
    icbm: "6.5244, 3.3792",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  aboutSummary: about.summary,
} as const;

export const canonicalPages = [siteConfig.homeUrl] as const;
