import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Emmanuel Samuel",
  initials: "ES",
  url: "https://emmanuelsamuel.dev",
  location: "Lagos, Nigeria", // TODO: confirm location
  locationLink: "https://www.google.com/maps/place/lagos",
  description:
    "Software & AI/ML Engineer — LLM infrastructure, agents, and RAG systems.",
  summary:
    "TODO: replace with your real bio. I build LLM infrastructure, autonomous agents, and retrieval-augmented generation (RAG) systems, combining a software engineering background with applied machine learning. I work across the stack, from data pipelines and vector search to production-grade APIs and frontends.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Python", icon: Python },
    { name: "TypeScript", icon: Typescript },
    { name: "Next.js / React", icon: NextjsIconDark },
    { name: "Node.js", icon: Nodejs },
    { name: "PyTorch", icon: Icons.globe },
    { name: "LangChain / LangGraph", icon: Icons.globe },
    { name: "Vercel AI SDK", icon: Icons.globe },
    { name: "RAG / pgvector", icon: Postgresql },
    { name: "AWS", icon: Icons.globe },
    { name: "Docker", icon: Docker },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "React", icon: ReactLight },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "emmasam1995@gmail.com",
    tel: "+123456789", // TODO: add real phone number or remove
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Emmanuel-Samuel",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#", // TODO: add LinkedIn URL
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "#", // TODO: add X/Twitter URL
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "TODO: Company Name",
      href: "#",
      badges: [],
      location: "Remote",
      title: "TODO: replace with your real job title",
      logoUrl: "",
      start: "Jan 2024",
      end: "Present",
      description:
        "TODO: replace with your real work experience. Describe the LLM/agent systems, RAG pipelines, or ML infrastructure you built and shipped.",
    },
    {
      company: "TODO: Company Name",
      href: "#",
      badges: [],
      location: "Remote",
      title: "TODO: replace with your real job title",
      logoUrl: "",
      start: "Jan 2022",
      end: "Dec 2023",
      description:
        "TODO: replace with your real work experience. Describe backend/full-stack work relevant to AI/ML systems.",
    },
  ],
  education: [
    {
      school: "TODO: University / School Name",
      href: "#",
      degree: "TODO: replace with your real degree",
      logoUrl: "",
      start: "2018",
      end: "2022",
    },
    {
      school: "TODO: Certification / Program Name",
      href: "#",
      degree: "TODO: replace with your real certification",
      logoUrl: "",
      start: "2023",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "TODO: Project Name",
      href: "#",
      dates: "Jan 2024 - Present",
      active: true,
      description:
        "TODO: replace with your real project. A RAG-powered application using pgvector and LangChain for document Q&A.",
      technologies: [
        "Next.js",
        "TypeScript",
        "LangChain",
        "PostgreSQL",
        "pgvector",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Emmanuel-Samuel",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "TODO: Project Name",
      href: "#",
      dates: "Jun 2023 - Dec 2023",
      active: true,
      description:
        "TODO: replace with your real project. An autonomous agent framework built with LangGraph and the Vercel AI SDK.",
      technologies: ["Python", "LangGraph", "Vercel AI SDK", "Docker"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Emmanuel-Samuel",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "TODO: Hackathon Name",
      dates: "TODO: dates",
      location: "TODO: location",
      description:
        "TODO: replace with a real hackathon entry, or remove this section if not applicable.",
      image: "",
      links: [],
    },
    {
      title: "TODO: Hackathon Name",
      dates: "TODO: dates",
      location: "TODO: location",
      description:
        "TODO: replace with a real hackathon entry, or remove this section if not applicable.",
      image: "",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "#",
        },
      ],
    },
  ],
  papersAndTalks: [
    {
      title: "TODO: Paper or Talk Title",
      venue: "TODO: Conference / Publication Name",
      date: "2024",
      link: "#",
      type: "paper" as const,
    },
    {
      title: "TODO: Talk Title",
      venue: "TODO: Meetup / Conference Name",
      date: "2024",
      link: "#",
      type: "talk" as const,
    },
  ],
  publicMlProjects: [
    {
      title: "TODO: Open-Source Contribution",
      href: "#",
      dates: "2024",
      description:
        "TODO: replace with a real open-source contribution to an ML/LLM library (e.g. a PR to LangChain, LlamaIndex, or Hugging Face Transformers).",
      technologies: ["Python", "PyTorch", "Open Source"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Emmanuel-Samuel",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "TODO: Fine-Tuning Project",
      href: "#",
      dates: "2024",
      description:
        "TODO: replace with a real fine-tuning project, e.g. fine-tuning an open-weight LLM on a domain-specific dataset with LoRA/PEFT.",
      technologies: ["PyTorch", "PEFT", "Hugging Face"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Emmanuel-Samuel",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
} as const;
