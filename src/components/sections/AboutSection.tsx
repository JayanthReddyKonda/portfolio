"use client";

/**
 * @file AboutSection.tsx
 * @description Profile, Technical Matrix & Originkit Full-Color ASCII Reveal section in Emerald Sophistication theme.
 * 
 * Features:
 * - 100% Bound to `@/data/skills` source of truth.
 * - Interactive full-color ASCII Reveal Canvas with cursor hover blob mask.
 * - Key impact metrics (9.1 CGPA, 1,000+ Concurrent Streams, 500+ Hackathon Devs, 300+ DSA).
 * - Ultra-sleek minimalist glass Bento styling in Emerald Sophistication.
 */

import { motion, useReducedMotion } from "framer-motion";
import { AsciiReveal } from "@/components/webgl/AsciiReveal";
import { SKILLS_TAXONOMY, IMPACT_METRICS } from "@/data/skills";

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function AboutSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]"
          >
            <SparklesIcon className="size-3.5 text-[#7ba05b]" />
            <span>Profile &amp; Technical Foundation</span>
          </motion.div>

          <motion.h2
            id="about-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#f4f1eb]"
          >
            Building intelligent full-stack systems and production-grade AI microservices.
          </motion.h2>
        </div>

        {/* Top Bento Row: ASCII Reveal + Editorial Bio */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: ASCII Face Reveal Component */}
          <motion.div
            {...reveal(0.15)}
            className="group relative lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#2d5a4a]/35 p-6 backdrop-blur-2xl transition-colors hover:border-[#7ba05b]/40 min-h-[460px]"
          >
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#f4f1eb]/50">
                Neural Scan // Hover to Reveal
              </span>
              <div className="size-2 rounded-full bg-[#7ba05b] animate-pulse" />
            </div>

            {/* Ascii Canvas Container with Real Profile Photo */}
            <div className="my-4 relative h-[340px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a352a] flex items-center justify-center">
              <AsciiReveal
                image="/images/ascii_profile.png"
                fit="cover"
                focusY={15}
                columns={110}
                colorMode="image"
                contrast={105}
                revealOptions={{ size: 100, softness: 20 }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#f4f1eb]/70 z-10">
              <span>Jayanth Reddy Konda</span>
              <span className="text-[#7ba05b]">AI &amp; ML Engineer</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Credentials (Clean Minimal Glass Card) */}
          <motion.div
            {...reveal(0.2)}
            className="group relative lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#2d5a4a]/35 p-8 sm:p-10 backdrop-blur-xl transition-colors hover:border-[#7ba05b]/40"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#7ba05b] uppercase tracking-widest">
                <CheckCircleIcon className="size-4" />
                <span>B.Tech in Computer Science (AI &amp; ML) • VNR VJIET</span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-[#f4f1eb]">
                Engineering at the Intersection of AI RAG, Distributed APIs &amp; Real-Time Systems
              </h3>

              <p className="text-base leading-[1.8] text-[#f4f1eb]/80">
                I engineer containerized, end-to-end platforms combining asynchronous Python (FastAPI/Flask),
                PostgreSQL, vector retrieval databases (Qdrant), and modern React frontends. My focus spans
                automated corporate credit intelligence, multi-factor biometric facial authentication, and streaming financial pipelines.
              </p>

              <p className="text-base leading-[1.8] text-[#f4f1eb]/80">
                Certified in Machine Learning by Stanford University &amp; DeepLearning.AI, I have designed RAG copilot workflows
                with LangChain LCEL and Gemini 2.0 Flash, built real-time WebSocket systems handling 1,000+ concurrent connections,
                and solved 300+ DSA algorithmic challenges.
              </p>
            </div>

            {/* Impact Metric Tiles */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 relative z-10">
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold tracking-tight text-[#f4f1eb] sm:text-3xl font-mono">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#f4f1eb]/85">
                    {metric.label}
                  </div>
                  <div className="text-[10px] text-[#f4f1eb]/45 font-mono mt-0.5">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Bento Row: Core Competencies Taxonomy */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS_TAXONOMY.map((skill, idx) => (
            <motion.div
              key={skill.label}
              {...reveal(0.1 + idx * 0.04)}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#2d5a4a]/25 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#7ba05b]/40 hover:bg-[#2d5a4a]/45"
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#f4f1eb] transition-colors group-hover:border-[#7ba05b]/40 group-hover:text-[#7ba05b]">
                <CodeIcon className="size-5" />
              </div>
              <div className="mt-6">
                <h4 className="text-base font-semibold tracking-tight text-[#f4f1eb]">
                  {skill.label}
                </h4>
                <p className="mt-1 font-mono text-xs text-[#f4f1eb]/70">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
