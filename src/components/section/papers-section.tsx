import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function PapersSection() {
  return (
    <section id="papers-and-talks">
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Papers & Talks
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Writing and speaking
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Papers, talks, and write-ups on LLM infrastructure, agents, and
              RAG systems.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {DATA.papersAndTalks.map((item, id) => (
            <BlurFade key={item.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 h-full border border-border rounded-xl p-6 hover:ring-2 hover:ring-muted transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="text-[11px] font-medium capitalize">
                    {item.type}
                  </Badge>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {item.venue} &middot; {item.date}
                </p>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
