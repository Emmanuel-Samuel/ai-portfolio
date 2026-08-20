export const personalInfo = {
  name: "Emmanuel Samuel",
  role: "Software & AI/ML Engineer",
  tagline: "I build LLM infrastructure, autonomous agents, and retrieval-augmented generation (RAG) systems, combining a software engineering background with applied machine learning.",
  focus: "Open to Software Engineering, AI/ML Engineering, and LLM infrastructure roles where I can own systems from data pipelines to production APIs.",
  email: "emmasam1995@gmail.com",
  linkedin: "#", // TODO: add LinkedIn URL
  github: "https://github.com/Emmanuel-Samuel",
  resumeUrl: "/Emmanuel_Samuel_Resume.pdf", // TODO: upload your resume PDF to public/ with this filename
};

export const stats = [
  { value: 2, suffix: "+", label: "Years Building AI Systems" },
  { value: 4, suffix: "", label: "Featured Projects" },
  { value: 2, suffix: "", label: "Papers & Talks" },
  { value: 100, suffix: "%", label: "Open to New Roles" },
];

export const about = {
  summary: "TODO: replace with your real bio. I build LLM infrastructure, autonomous agents, and retrieval-augmented generation (RAG) systems, combining a software engineering background with applied machine learning. I work across the stack, from data pipelines and vector search to production-grade APIs and frontends.",
  highlights: [
    "TODO: replace with a real achievement, e.g. shipped a RAG system that improved retrieval accuracy by a measurable amount.",
    "TODO: replace with a real achievement about an LLM agent, automation, or pipeline you built and shipped.",
    "TODO: replace with a measurable outcome from a past role, internship, or personal project.",
    "TODO: replace with a real contribution to an open-source ML/LLM project or community.",
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
    company: "TODO: Company Name",
    role: "TODO: replace with your real job title",
    period: "Jan 2024 - Present",
    type: "work",
    summary: "TODO: replace with your real work experience. Describe the LLM/agent systems, RAG pipelines, or ML infrastructure you built and shipped.",
    bullets: [],
  },
  {
    company: "TODO: Company Name",
    role: "TODO: replace with your real job title",
    period: "Jan 2022 - Dec 2023",
    type: "work",
    summary: "TODO: replace with your real work experience. Describe backend/full-stack work relevant to AI/ML systems.",
    bullets: [],
  },
  {
    company: "TODO: University / School Name",
    role: "TODO: replace with your real degree",
    period: "2018 - 2022",
    type: "education",
    summary: "TODO: add coursework, focus areas, or honors relevant to software and AI/ML engineering.",
    bullets: [],
  },
  {
    company: "TODO: Certification / Program Name",
    role: "TODO: replace with your real certification",
    period: "2023",
    type: "education",
    summary: "TODO: add what the certification or program covered.",
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
    slug: "todo-rag-project",
    title: "TODO: Project Name",
    category: "RAG / LLM Application",
    summary: "TODO: replace with your real project. A RAG-powered application using pgvector and LangChain for document Q&A.",
    description: "TODO: replace with your real project. A RAG-powered application using pgvector and LangChain for document Q&A.",
    impact: "TODO: replace with a measurable outcome, e.g. retrieval accuracy, latency, or user adoption.",
    role: "TODO: describe your role building this project",
    timeline: "Jan 2024 - Present",
    complexity: "TODO: describe the hardest technical problem you solved",
    tech: ["Next.js", "TypeScript", "LangChain", "PostgreSQL", "pgvector"],
    images: [],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "todo-agent-framework",
    title: "TODO: Project Name",
    category: "Agent Framework",
    summary: "TODO: replace with your real project. An autonomous agent framework built with LangGraph and the Vercel AI SDK.",
    description: "TODO: replace with your real project. An autonomous agent framework built with LangGraph and the Vercel AI SDK.",
    impact: "TODO: replace with a measurable outcome, e.g. tasks automated or time saved.",
    role: "TODO: describe your role building this project",
    timeline: "Jun 2023 - Dec 2023",
    complexity: "TODO: describe the hardest technical problem you solved",
    tech: ["Python", "LangGraph", "Vercel AI SDK", "Docker"],
    images: [],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "todo-oss-contribution",
    title: "TODO: Open-Source Contribution",
    category: "Open Source",
    summary: "TODO: replace with a real open-source contribution to an ML/LLM library.",
    description: "TODO: replace with a real open-source contribution to an ML/LLM library (e.g. a PR to LangChain, LlamaIndex, or Hugging Face Transformers).",
    impact: "TODO: replace with a measurable outcome, e.g. the PR merged, issue resolved, or downloads affected.",
    role: "TODO: describe your role in this contribution",
    timeline: "2024",
    complexity: "TODO: describe the hardest technical problem you solved",
    tech: ["Python", "PyTorch", "Open Source"],
    images: [],
    github: "https://github.com/Emmanuel-Samuel",
  },
  {
    slug: "todo-fine-tuning-project",
    title: "TODO: Fine-Tuning Project",
    category: "Fine-Tuning / ML",
    summary: "TODO: replace with a real fine-tuning project on a domain-specific dataset.",
    description: "TODO: replace with a real fine-tuning project, e.g. fine-tuning an open-weight LLM on a domain-specific dataset with LoRA/PEFT.",
    impact: "TODO: replace with a measurable outcome, e.g. eval score improvement or inference cost reduction.",
    role: "TODO: describe your role in this project",
    timeline: "2024",
    complexity: "TODO: describe the hardest technical problem you solved",
    tech: ["PyTorch", "PEFT", "Hugging Face"],
    images: [],
    github: "https://github.com/Emmanuel-Samuel",
  },
];

export const skillCategories = [
  {
    title: "Languages & Frameworks",
    description: "The core languages and frameworks I use to build applications and services end to end.",
    skills: ["Python", "TypeScript", "Next.js / React", "Node.js"],
  },
  {
    title: "AI/ML & LLM Infrastructure",
    description: "The AI, orchestration, and model stack I use to build agents and LLM-backed products.",
    skills: ["PyTorch", "LangChain", "LangGraph", "Vercel AI SDK", "RAG", "Claude", "OpenAI"],
  },
  {
    title: "Data & Infrastructure",
    description: "The storage, retrieval, and deployment tooling I use to ship reliable AI systems.",
    skills: ["PostgreSQL", "pgvector", "AWS", "Docker"],
  },
];

export interface PaperOrTalk {
  title: string;
  venue: string;
  date: string;
  link: string;
  type: "paper" | "talk";
}

export const papersAndTalks: PaperOrTalk[] = [
  {
    title: "TODO: Paper or Talk Title",
    venue: "TODO: Conference / Publication Name",
    date: "2024",
    link: "#",
    type: "paper",
  },
  {
    title: "TODO: Talk Title",
    venue: "TODO: Meetup / Conference Name",
    date: "2024",
    link: "#",
    type: "talk",
  },
];

export const chatSuggestions = [
  "Which project best shows your RAG experience?",
  "What LLM infrastructure have you built?",
  "How do you approach agent reliability?",
  "What's your background in ML?",
  "How can I get in touch?",
];
