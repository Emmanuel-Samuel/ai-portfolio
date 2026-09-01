import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
}

export interface Post extends PostMeta {
  body: string;
}

// ~200 wpm, rounded up, floor of 1 minute
function readingTimeOf(body: string) {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

function parse(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) return null;

  return {
    slug,
    title: String(data.title),
    summary: String(data.summary ?? ""),
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingTime: readingTimeOf(content),
    body: content,
  };
}

function allPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Drafts are visible in dev so you can preview before publishing.
export function getPosts(): PostMeta[] {
  const visible = allPosts().filter(
    (p) => !p.draft || process.env.NODE_ENV === "development"
  );
  return visible.map(({ body: _body, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return allPosts()
    .filter((p) => !p.draft)
    .map((p) => p.slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
