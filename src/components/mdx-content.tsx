import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-12 mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground first:mt-0" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-xl sm:text-2xl font-semibold tracking-tight text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 text-base leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }} {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-muted-foreground marker:text-primary" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2 text-muted-foreground marker:text-primary" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-sm text-primary [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:px-0 [pre_&]:py-0 [pre_&]:text-foreground"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 overflow-x-auto rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed shadow-accent-card"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mb-5 border-l-2 border-primary/50 pl-5 italic text-foreground/85"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
        },
      }}
    />
  );
}
