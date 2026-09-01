import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/blog";
import { siteConfig, ogLocale } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: `Writing — ${siteConfig.author}`,
  description: "Notes on building LLM infrastructure, autonomous agents, and production AI systems.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/blog`,
  },
  openGraph: {
    type: "website",
    locale: ogLocale,
    url: `${siteConfig.siteUrl}/blog`,
    title: `Writing — ${siteConfig.author}`,
    description: "Notes on building LLM infrastructure, autonomous agents, and production AI systems.",
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing — ${siteConfig.author}`,
    description: "Notes on building LLM infrastructure, autonomous agents, and production AI systems.",
  },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main id="main-content" tabIndex={-1} className="section-padding relative z-10">
      <div className="container-narrow max-w-4xl">
        <div className="mb-16 flex flex-col items-start">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6">
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Writing</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
            Notes on building LLM infrastructure, autonomous agents, and production AI systems.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-card p-6 sm:p-8 transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-3 text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-5">
                  {post.summary}
                </p>
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
