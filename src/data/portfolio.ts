export const personalInfo = {
  name: "Emmanuel Mayowa Samuel",
  role: "AI/ML Engineer",
  tagline:
    "I build AI that survives production. Agentic systems on AWS Bedrock and Google Vertex AI with MCP tool orchestration and RAG, classical ML for anomaly detection and forecasting, and the full stack around both - from PostgreSQL schema to deployment.",
  focus:
    "Open to remote AI/ML Engineer, Forward Deployed Engineer and Software Engineer roles (US/EU), where I can own systems from schema to production.",
  email: "samuelmayowaemmanuel@gmail.com",
  linkedin: "https://www.linkedin.com/in/emmanuel-samuel-168255143/",
  github: "https://github.com/Emmanuel-Samuel",
  resumeUrl: "/Emmanuel_Samuel_Resume.pdf",
};

export const stats = [
  { value: 7, suffix: "", label: "Product Lines Running Agents" },
  { value: 31, suffix: "", label: "Custom Agent Tools Built" },
  { value: 3, suffix: "", label: "Agent Delivery Channels" },
  { value: 6, suffix: "", label: "Monitoring Systems Integrated" },
];

export const about = {
  summary:
    "I build AI systems that run in production, not prototypes. Much of my work is agentic: LLM systems that use tools, hold state, and have to keep working when a provider returns a 429 at 3am - multi-tenant platforms on AWS Bedrock and Google Vertex AI, with guardrails, retries and per-call cost instrumentation. Plenty of it is not generative at all. I have built AIOps over live telemetry, with anomaly detection, forecasting, change-point detection and root-cause ranking, and ensemble models combining Poisson regression, XGBoost and Elo with Monte Carlo simulation. I own the stack around both, from PostgreSQL schema through FastAPI or NestJS to the Next.js surface and deployment.",
  highlights: [
    "Architected LangGraph agents on AWS Bedrock AgentCore across 7 product lines, loading tool catalogues at runtime over MCP from vendored OpenAPI contracts.",
    "Diagnosed a production tool-routing failure and re-architected a supervisor plus five sub-agent system into a flat single-agent design over a unified ~23-tool catalogue.",
    "Built per-call AI cost metering with OpenTelemetry counters and a PostgreSQL audit log, pricing prompt, output, thinking and image tokens separately against a per-model rate table.",
    "Cut OPEX report preparation from one week to two days at a power plant, and cleared a standing ticket backlog across a 430-bed estate serving 500+ staff.",
  ],
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    company: "ThreadChain",
    role: "AI/ML & Full-Stack Engineer",
    period: "May 2026 - Present",
    type: "work",
    summary:
      "Build the Gemini orchestration behind an AI design-specification generator for fashion brands, producing garment renders, artwork and measurement tables from a questionnaire.",
    bullets: [
      "Generation pipeline across Vertex AI and the Gemini Developer API, selected per environment by a client factory.",
      "Per-call AI cost metering via OpenTelemetry counters and a PostgreSQL audit log, surfaced through billing-summary endpoints.",
      "Centralised retry layer with equal-jitter exponential backoff on 503, 429, quota and network-reset errors, stabilising generation across ~20 Celery tasks.",
      "Stripe credit billing with a 402-triggered paywall intercepted centrally in the API client.",
      "Observability across FastAPI, Celery and SQLAlchemy into Prometheus, Grafana and Jaeger.",
      "Full-stack delivery on a Next.js 15 / React 19 frontend and a FastAPI backend of 63 models and 62 API routers.",
    ],
  },
  {
    company: "Metcore Digital Technologies",
    role: "AI/ML Engineer",
    period: "Sep 2025 - Present",
    type: "work",
    summary:
      "AI/ML engineering across all product lines - telecom AIOps, fintech, construction, education and enterprise knowledge platforms.",
    bullets: [
      "Architected LangGraph agents on AWS Bedrock AgentCore across 7 product lines, with HMAC-signed identity tokens and SigV4 signing enforcing tenant authorisation at the tool-call boundary.",
      "Shipped the same agents across three delivery surfaces: speech-to-speech voice on LiveKit with Amazon Nova Sonic, a per-tenant API-key REST endpoint streaming over SSE, and an embeddable JavaScript widget.",
      "Built an AIOps operator console for a national telecom, integrating six monitoring systems behind a connector SDK, with anomaly detection, forecasting, change-point detection and root-cause ranking.",
      "Enterprise RAG platform on AWS S3 Vectors with Bedrock Titan v2 embeddings, over a 35-table schema with queued web-crawl ingestion.",
      "Bedrock agent exposing 31 custom tools behind a circuit breaker and a custom MCP server.",
    ],
  },
  {
    company: "Legal Action Media",
    role: "AI & Full-Stack Engineer (Contract)",
    period: "Jul 2025 - May 2026",
    type: "work",
    summary:
      "Owned the AI layer across the product suite of a US personal-injury law firm, remote from Lagos.",
    bullets: [
      "LangGraph/LangChain pipelines with PostgreSQL checkpointing for resumable claim-intake and document-processing workflows.",
      "FastAPI service orchestrating OpenAI Agents SDK agents with LiteLLM multi-provider routing and live WebSocket progress streaming.",
      "Full-stack delivery with the platform team on a Next.js 16 claims-management system, integrating Twilio Voice/Video, Nylas, DocuSeal and Stripe.",
    ],
  },
  {
    company: "Egbin Power Plc",
    role: "Industrial Engineering Intern (NYSC)",
    period: "Jul 2024 - Jul 2025",
    type: "work",
    summary:
      "One-year national service placement at one of Nigeria's largest thermal power stations, building internal tooling in Power Apps, Python and TypeScript.",
    bullets: [
      "Cut OPEX report preparation from one week to two days with a desktop ticket-merger application.",
      "Eliminated a backlog of dozens of unattended tickets by replacing manual triage with automated routing across a 430-bed estate serving 500+ staff.",
      "Shipped a budget-management application adopted by every department, administered by finance.",
    ],
  },
  {
    company: "Federal University of Technology, Minna",
    role: "B.Eng. Electrical/Electronics Engineering",
    period: "2018 - 2023",
    type: "education",
    summary: "Second Class Upper. Led the campus Google Developer Student Clubs chapter.",
    bullets: [
      "Google Solution Challenge - Minna Champions (2023), leading an AI-powered waste management platform aligned to SDG 12.",
      "PAYAZA Hackathon 3.0 - 4th place as team lead, building an AI solution for MSME financial inclusion.",
    ],
  },
  {
    company: "Udacity",
    role: "Machine Learning & AI Programming Nanodegrees",
    period: "2023",
    type: "education",
    summary:
      "Machine Learning Fundamentals and AI Programming with Python - deep learning, computer vision and model deployment.",
    bullets: [],
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  role: string;
  timeline?: string;
  complexity: string;
  tech: string[];
  images: string[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: "agentic-ai-platform",
    title: "Multi-Tenant Agentic AI Platform",
    category: "LLM Agents / Platform",
    summary:
      "LangGraph agents on AWS Bedrock AgentCore serving 7 product lines, loading their tools at runtime over the Model Context Protocol.",
    description:
      "An agent platform where each product gets its own agent, but none of them hard-code their tools. Agents discover tool catalogues at runtime over MCP (streamable HTTP), generated from each backend's vendored OpenAPI contract, with nightly contract-drift detection in CI. Tenant authorisation is enforced at the tool-call boundary itself using HMAC-signed per-request identity tokens and AWS SigV4 request signing.",
    impact:
      "Seven independently deployed agents share one tool-loading mechanism, so adding a backend capability does not require redeploying the agent.",
    role: "Architected the agent runtime, the MCP tool-loading layer and the multi-tenant authorisation model.",
    timeline: "2025 - Present",
    complexity:
      "The first design used a supervisor delegating to five sub-agents. In production the model mis-routed across fragmented tool namespaces. I diagnosed it and collapsed the whole thing into a single agent over a unified ~23-tool catalogue, which removed the routing failure entirely.",
    tech: ["Python", "LangGraph", "AWS Bedrock AgentCore", "MCP", "OpenAPI", "Langfuse", "SigV4"],
    images: ["/images/projects/agentic-ai-platform/cover.webp"],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "enterprise-rag-platform",
    title: "Enterprise RAG Platform",
    category: "RAG / Retrieval",
    summary:
      "Multi-tenant retrieval built on AWS S3 Vectors with Bedrock Titan v2 embeddings, one vector index per tenant.",
    description:
      "A retrieval platform where every tenant gets an isolated vector index. Documents and crawled pages are chunked and embedded with Bedrock Titan v2 (1024-dimension, cosine), then written to AWS S3 Vectors rather than a conventional vector database. Ingestion runs asynchronously through BullMQ-queued Crawlee crawls and PDF processing, across a 7-service Turborepo backed by a 35-table Drizzle/PostgreSQL schema.",
    impact:
      "Tenant isolation is enforced at the index level rather than by query filtering, so one tenant's documents can never surface in another's retrieval.",
    role: "Built the retrieval layer, the embedding service and the asynchronous ingestion pipeline.",
    timeline: "2025 - Present",
    complexity:
      "Migrating from a conventional vector store to AWS S3 Vectors while keeping the public API identical, so the cutover needed no downtime and no client changes.",
    tech: ["TypeScript", "AWS S3 Vectors", "Bedrock Titan v2", "Drizzle ORM", "PostgreSQL", "BullMQ", "Crawlee"],
    images: ["/images/projects/enterprise-rag-platform/cover.webp"],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "aiops-operator-console",
    title: "AIOps Operator Console",
    category: "AIOps / Applied ML",
    summary:
      "An operator console for a national telecom that pulls six monitoring systems behind one connector SDK and runs anomaly detection and root-cause ranking over the result.",
    description:
      "Telecom operations teams watch six different monitoring systems - Grafana, StableNet, Azure Monitor, Elastic, Metabase and Wavefront. This console puts them behind a single connector SDK with a common contract, then runs a Python/FastAPI analytics service over the unified telemetry: anomaly detection (isolation forest, random cut forest and seasonal methods), forecasting, change-point detection, log-template mining, correlation and root-cause ranking, over a 64-table schema.",
    impact:
      "Operators triage from one surface instead of six, with candidate root causes ranked rather than hunted manually.",
    role: "Built the monitoring connector SDK and the analytics service behind it.",
    timeline: "2026",
    complexity:
      "Six monitoring vendors with six different query models, authentication schemes and data shapes, normalised into one connector contract without losing the fidelity each system provides.",
    tech: ["Python", "FastAPI", "scikit-learn", "Grafana", "Elastic", "Azure Monitor", "PostgreSQL"],
    images: ["/images/projects/aiops-operator-console/cover.webp"],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "llm-cost-instrumentation",
    title: "Per-Call LLM Cost Instrumentation",
    category: "LLM Infrastructure",
    summary:
      "Cost metering that prices prompt, output, thinking and image tokens separately, per call, against a maintained per-model rate table.",
    description:
      "Most LLM cost tracking multiplies total tokens by one number, which is wrong the moment a model prices image output differently from text, or bills thinking tokens separately. This system instruments every model call with OpenTelemetry counters, prices each token class against a maintained per-model rate table, and persists the result to a PostgreSQL audit log exposed through billing-summary endpoints. It sits alongside a centralised retry layer using equal-jitter exponential backoff on 503, 429, quota-exhaustion and network-reset errors.",
    impact:
      "Per-call, per-model spend is attributable rather than discovered on the monthly invoice.",
    role: "Designed and built the metering, pricing table and retry layer.",
    timeline: "2026",
    complexity:
      "Getting token accounting right across modalities - image output tokens can be priced an order of magnitude above text, so a single blended rate produces badly misleading numbers.",
    tech: ["Python", "FastAPI", "OpenTelemetry", "PostgreSQL", "Google Gemini", "Vertex AI", "Celery"],
    images: ["/images/projects/llm-cost-instrumentation/cover.webp"],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "ensemble-sports-prediction",
    title: "Ensemble Sports Prediction Platform",
    category: "Classical ML",
    summary:
      "A weighted ensemble of Poisson regression, XGBoost and an Elo baseline, with Monte Carlo simulation, for football, F1 and boxing outcomes.",
    description:
      "A Flask ML microservice combining three models - Poisson regression for score lines, an XGBoost classifier for outcomes, and an Elo baseline - in a weighted ensemble (0.35 / 0.45 / 0.20), with Monte Carlo simulation for match outcomes. GPT-4o generates commentary behind a regional compliance filter with rate-limit retries and token-usage tracking, served through tiered Stripe subscriptions on a 5-service Docker stack.",
    impact:
      "Predictions combine three independent signals rather than trusting a single model, with simulation providing outcome distributions instead of point estimates.",
    role: "Built the ML microservice, ensemble weighting and the LLM commentary layer.",
    timeline: "2026",
    complexity:
      "Choosing ensemble weights that hold across three very different sports, where football has frequent low-scoring events and boxing has almost no in-event signal.",
    tech: ["Python", "Flask", "XGBoost", "scikit-learn", "NumPy", "Docker", "OpenAI GPT-4o"],
    images: ["/images/projects/ensemble-sports-prediction/cover.webp"],
    github: "https://github.com/Emmanuel-Samuel",
  },
];

export const skillCategories = [
  {
    title: "GenAI & LLM Infrastructure",
    description:
      "The agent, orchestration and model stack I use to build LLM-backed products that survive production.",
    skills: [
      "LangGraph",
      "LangChain",
      "OpenAI Agents SDK",
      "Model Context Protocol (MCP)",
      "AWS Bedrock",
      "Google Vertex AI",
      "RAG",
      "Amazon Nova Sonic",
      "LiveKit",
      "Langfuse",
    ],
  },
  {
    title: "Machine Learning",
    description:
      "Classical ML and deep learning, from ensembles and anomaly detection through to computer vision.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "OpenCV",
      "pandas",
      "NumPy",
      "Anomaly Detection",
      "Time Series Forecasting",
      "Amazon SageMaker",
    ],
  },
  {
    title: "Languages & Backend",
    description:
      "The languages and services I use to build systems end to end.",
    skills: ["Python", "TypeScript", "FastAPI", "NestJS", "Hono", "Node.js", "Bun", "Celery", "BullMQ"],
  },
  {
    title: "Data & Infrastructure",
    description:
      "The storage, retrieval and deployment tooling behind the systems I ship.",
    skills: [
      "PostgreSQL",
      "pgvector",
      "AWS S3 Vectors",
      "Prisma",
      "Drizzle ORM",
      "Redis",
      "Docker",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
    ],
  },
];

export interface PaperOrTalk {
  title: string;
  venue: string;
  date: string;
  link: string;
  type: "paper" | "talk";
}

// Intentionally empty - nothing published yet. Add real entries here rather than
// placeholders; an empty section reads better than an invented one.
export const papersAndTalks: PaperOrTalk[] = [];

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export const certifications: Certification[] = [
  { title: "Machine Learning Fundamentals Nanodegree", issuer: "Udacity", year: "2023" },
  { title: "AI Programming with Python Nanodegree", issuer: "Udacity", year: "2023" },
  { title: "Introduction to Python", issuer: "DataCamp", year: "2023" },
];

export interface Leadership {
  role: string;
  org: string;
  period: string;
  detail: string;
}

export const leadership: Leadership[] = [
  {
    role: "Lead",
    org: "Google Developer Student Clubs, FUT Minna",
    period: "2022 - 2023",
    detail:
      "Led the campus chapter, and led the team that placed Minna Champions in the 2023 Google Solution Challenge with an AI-powered waste management platform aligned to SDG 12.",
  },
  {
    role: "Team Lead",
    org: "PAYAZA Hackathon 3.0",
    period: "Nov 2024",
    detail:
      "Finished fourth, leading a cross-functional team building an AI solution for MSME financial inclusion, and owning the architecture and development lifecycle.",
  },
  {
    role: "Software Developer, Team Lead",
    org: "Ingressive for Good, FUT Minna",
    period: "Sep 2022 - Feb 2023",
    detail:
      "Led technical bootcamps in Python and web development for 200+ undergraduates, curating curriculum and resolving technical escalations.",
  },
];

export const chatSuggestions = [
  "How do you keep LLM agents reliable in production?",
  "Tell me about the agent architecture you had to rebuild.",
  "How do you track what an AI feature actually costs?",
  "What AIOps work have you done?",
  "How can I get in touch?",
];
