import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import { siteConfig, ogLocale } from "@/lib/seo/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  const url = `${siteConfig.siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} — ${siteConfig.author}`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: ogLocale,
      url,
      title: post.title,
      description: post.summary,
      siteName: siteConfig.siteName,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1} className="section-padding relative z-10">
      <article className="container-narrow max-w-3xl">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MdxContent source={post.body} />
      </article>
    </main>
  );
}
