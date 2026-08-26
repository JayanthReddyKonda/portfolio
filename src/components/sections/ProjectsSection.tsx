"use client";

/**
 * @file ProjectsSection.tsx
 * @description Production AI & Distributed Systems Architecture Stage in Emerald Sophistication.
 * 
 * Features:
 * - 100% Data-Driven from `@/data/projects` source of truth.
 * - Strict type-safety via `@/types/project`.
 * - Originkit `LabelSlideButton` actions.
 * - Glass bento cards with responsive metadata and benchmark grids.
 */

import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { LabelSlideButton } from "@/components/core/LabelSlideButton";

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ProjectsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]"
          >
            <ActivityIcon className="size-3.5 text-[#7ba05b]" />
            <span>Featured Systems &amp; Engineering Projects</span>
          </motion.div>

          <motion.h2
            id="work-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#f4f1eb]"
          >
            Production-grade systems bridging AI intelligence and scalable infrastructure.
          </motion.h2>
        </div>

        {/* Project Bento Stack */}
        <div className="mt-16 space-y-12">
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.id}
              {...reveal(0.15 + idx * 0.08)}
              className="group relative rounded-3xl border border-white/10 bg-[#2d5a4a]/35 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-[#7ba05b]/40 hover:bg-[#2d5a4a]/50"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                {/* Left: Project Architecture Story & Highlights */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#7ba05b]">
                      <svg className="size-4 text-[#7ba05b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#f4f1eb] sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[#f4f1eb]/60">
                      — {project.tagline}
                    </p>
                  </div>

                  <p className="text-base leading-relaxed text-[#f4f1eb]/85">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Lineage */}
                  <div className="space-y-2.5 pt-2">
                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-sm text-[#f4f1eb]/80">
                        <CheckIcon className="size-4 text-[#7ba05b] mt-1 shrink-0" />
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Technical Specs, Metrics Grid & Action */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 rounded-2xl border border-white/5 bg-[#0d4c3c]/50 p-6">
                  {/* Benchmarks Grid */}
                  <div className="space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#7ba05b]">
                      Specs &amp; Benchmarks
                    </span>

                    <div className="divide-y divide-white/5 space-y-3 pt-2">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between pt-3 text-sm">
                          <span className="text-[#f4f1eb]/60 font-mono text-xs">{metric.label}</span>
                          <span className="font-bold text-[#f4f1eb]">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg border border-white/10 bg-[#2d5a4a]/40 px-2.5 py-1 font-mono text-[11px] text-[#f4f1eb]/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Label Slide Action Button */}
                  <div className="pt-4">
                    <LabelSlideButton
                      label="View Repository"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;