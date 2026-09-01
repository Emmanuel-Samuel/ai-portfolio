export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "AI Agents & LLM Systems",
    description:
      "Agentic workflows with tool orchestration over MCP, retrieval-augmented generation, and the guardrails, retries and circuit breakers that keep them running in production.",
  },
  {
    title: "Voice Agents",
    description:
      "Speech-to-speech voice assistants built on LiveKit with Amazon Nova Sonic, wired into real backend tools rather than scripted flows.",
  },
  {
    title: "AI Inside an Existing Product",
    description:
      "Adding chat, search, automation or agents to software you already have, without rebuilding it.",
  },
  {
    title: "AIOps & Data Pipelines",
    description:
      "Pulling monitoring systems behind one interface, with anomaly detection, forecasting, change-point detection and root-cause ranking.",
  },
  {
    title: "Full-Stack Product Build",
    description:
      "End to end: PostgreSQL schema, FastAPI or NestJS service, Next.js frontend, deployment and observability.",
  },
];

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery call",
    description:
      "30 minutes to understand the problem, the constraints and whether I'm the right person.",
  },
  {
    step: 2,
    title: "Scope & plan",
    description:
      "A written plan: what gets built, in what order, and what \"done\" looks like.",
  },
  {
    step: 3,
    title: "Build & hand over",
    description:
      "Working software, documented, with the context you need to run it.",
  },
];

export interface Engagement {
  name: string;
  location: string;
  description: string;
}

// Mix of contract work and systems delivered while employed — see disclaimer rendered above this list.
export const engagements: Engagement[] = [
  {
    name: "Legal Action Media",
    location: "United States, contract",
    description:
      "Owned the AI layer across a US personal-injury law firm's product suite: LangGraph/LangChain pipelines with PostgreSQL checkpointing for resumable claim-intake and document processing, plus a FastAPI service orchestrating OpenAI Agents SDK agents with LiteLLM multi-provider routing.",
  },
  {
    name: "National telecom — AIOps console",
    location: "anonymised",
    description:
      "Six monitoring systems behind one connector SDK, with anomaly detection (isolation forest, random cut forest, seasonal), forecasting, change-point detection and root-cause ranking.",
  },
  {
    name: "Enterprise RAG platform",
    location: "anonymised",
    description:
      "Multi-tenant retrieval on AWS S3 Vectors with Bedrock Titan v2 embeddings, one isolated vector index per tenant, over a 35-table schema.",
  },
  {
    name: "Fashion-tech AI generation",
    location: "anonymised",
    description:
      "Google Gemini orchestration producing garment renders and structured specification tables, with per-call cost metering and a centralised retry layer.",
  },
];
