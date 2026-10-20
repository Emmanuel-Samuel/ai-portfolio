"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, GitMerge, Github, Star } from "lucide-react";
import { maintainedOpenSource, openSourceProjects } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

function formatMergedDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const OpenSourceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const fadeIn = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 };

  return (
    <section id="open-source" className="section-padding relative z-10 scroll-mt-28">
      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={fadeIn}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6">
            Open Source
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Open Source <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
            Bugs I fixed upstream in other people&apos;s tools, and the projects I build and maintain myself.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 max-w-5xl 2xl:max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Contributions</h3>
          {openSourceProjects.map((project) => (
            <motion.div
              key={project.repo}
              initial={fadeIn}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: shouldReduceMotion ? 0 : 0.15, duration: shouldReduceMotion ? 0.2 : 0.6 }}
            >
              <SpotlightCard className="w-full relative bg-background dark:bg-background border-black/10 dark:border-white/10 backdrop-blur-none backdrop-saturate-100">
                <div className="p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">
                        {project.language} · {project.license}
                      </span>
                      <h3 className="text-3xl font-bold tracking-tight leading-tight mb-3">{project.name}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                        <Star className="w-3.5 h-3.5" aria-hidden="true" />
                        {project.stars} stars
                      </span>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors hover:bg-primary/10 px-4 py-2 rounded-lg"
                      >
                        <Github className="w-5 h-5" />
                        {project.repo}
                      </a>
                    </div>
                  </div>

                  <ul className="grid gap-6 md:grid-cols-2">
                    {project.contributions.map((c) => (
                      <li
                        key={c.prNumber}
                        className="flex flex-col rounded-xl glass-subtle border border-white/10 p-6"
                      >
                        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-4">
                          <GitMerge className="w-4 h-4" aria-hidden="true" />
                          Merged {formatMergedDate(c.mergedAt)}
                        </span>
                        <h4 className="text-lg font-semibold tracking-tight mb-4 text-balance">{c.title}</h4>
                        <dl className="space-y-3 text-sm leading-relaxed text-muted-foreground flex-1 mb-6">
                          <div>
                            <dt className="font-mono text-xs uppercase tracking-widest text-foreground/70">Problem</dt>
                            <dd>{c.problem}</dd>
                          </div>
                          <div>
                            <dt className="font-mono text-xs uppercase tracking-widest text-foreground/70">Fix</dt>
                            <dd>{c.fix}</dd>
                          </div>
                        </dl>
                        <div className="flex flex-wrap items-center gap-2 -ml-3">
                          <a
                            href={c.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors hover:bg-primary/10 px-3 py-2 rounded-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                            PR #{c.prNumber}
                          </a>
                          <a
                            href={c.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors hover:bg-primary/10 px-3 py-2 rounded-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Issue #{c.issueNumber}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {project.postPath && (
                    <a
                      href={project.postPath}
                      className="inline-flex mt-8 text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Read the write-up
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
          </div>

          <motion.div
            initial={fadeIn}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: shouldReduceMotion ? 0 : 0.15, duration: shouldReduceMotion ? 0.2 : 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                Projects I maintain
              </h3>
              <p className="text-sm text-muted-foreground">
                <a
                  href={maintainedOpenSource.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {maintainedOpenSource.org}
                </a>{" "}
                · {maintainedOpenSource.role}
              </p>
            </div>
            <ul className="grid gap-6 md:grid-cols-2">
              {maintainedOpenSource.repos.map((repo) => (
                <li key={repo.name} className="flex">
                  <SpotlightCard className="w-full relative bg-background dark:bg-background border-black/10 dark:border-white/10 backdrop-blur-none backdrop-saturate-100">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full flex-col p-6 sm:p-8"
                    >
                      <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">
                        {repo.status} · {repo.language} · {repo.license}
                      </span>
                      <h4 className="text-2xl font-bold tracking-tight mb-3">{repo.name}</h4>
                      <p className="text-base text-muted-foreground leading-relaxed text-pretty flex-1 mb-6">
                        {repo.summary}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Github className="w-5 h-5" aria-hidden="true" />
                        View on GitHub
                      </span>
                    </a>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
