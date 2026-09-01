"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown, ArrowLeft, Bot, Boxes, Mic, Plug, LayoutGrid, Info } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import BookingEmbed from "@/components/BookingEmbed";
import { services, processSteps, engagements } from "@/data/services";

const SERVICE_ICONS = [Bot, Mic, Plug, LayoutGrid, Boxes];

const WorkWithMeContent = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [engagementsRef, engagementsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <main id="main-content" tabIndex={-1} className="relative z-10">
      {/* Header */}
      <section className="section-padding pb-12">
        <div className="container-narrow max-w-4xl" ref={headerRef}>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full glass-subtle border border-primary/20 text-xs font-mono text-primary mb-6">
              Selective availability
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              Work With <span className="text-gradient">Me</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-foreground/85 mb-4">
              Selectively available for short-term and contract projects.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg">
              I build production AI systems and the software around them. I take on a small
              number of projects alongside full-time work, so availability is limited.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20">
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <SpotlightCard key={service.title} delay={i * 0.08} className="h-full">
                  <div className="p-6 sm:p-7 h-full flex flex-col">
                    <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight mb-2">{service.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pb-20">
        <div className="container-narrow max-w-4xl" ref={processRef}>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">How it works</h2>
            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {processSteps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border/60 bg-background/40 p-6">
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-mono font-bold text-primary">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              Book a discovery call
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Engagements */}
      <section className="pb-20">
        <div className="container-narrow max-w-4xl" ref={engagementsRef}>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={engagementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Systems delivered</h2>
            <div className="mb-8 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <p>Includes contract work and systems delivered in employed roles.</p>
            </div>
            <div className="flex flex-col gap-4">
              {engagements.map((engagement) => (
                <div
                  key={engagement.name}
                  className="rounded-2xl border border-border/60 bg-background/40 p-6"
                >
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold tracking-tight">{engagement.name}</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {engagement.location}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {engagement.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="pb-24 scroll-mt-24">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Book a discovery call
          </h2>
          <BookingEmbed />
        </div>
      </section>
    </main>
  );
};

export default WorkWithMeContent;
