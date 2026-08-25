"use client";

/**
 * @file AboutSection.tsx
 * @description Profile, Technical Matrix & Originkit Full-Color ASCII Reveal section.
 * Features:
 * - Interactive full-color ASCII Reveal Canvas with cursor hover blob mask.
 * - Key impact metrics (9.1 CGPA, 1,000+ Concurrent Streams, 500+ Hackathon Devs, 300+ DSA).
 * - Ultra-sleek minimalist glass Bento styling.
 */

import { motion, useReducedMotion } from "motion/react";
import { Cpu, Flame, Database, Zap, Sparkles, Shield, GitBranch, CheckCircle2 } from "lucide-react";
import { AsciiReveal } from "./AsciiReveal";
import { SectionTransition } from "./PixelSectionTransition";

/** Core competencies taxonomy */
const SKILLS = [
  { label: "AI & Vector RAG", icon: Cpu, desc: "LangChain LCEL, Qdrant, Gemini 2.0 Flash, Tavily" },
  { label: "FastAPI & Microservices", icon: Zap, desc: "Async Python, REST APIs, WebSockets, JWT" },
  { label: "Biometrics & Computer Vision", icon: Flame, desc: "DeepFace, RetinaFace, AES-256 Facial Embeddings" },
  { label: "Real-Time Streaming", icon: Database, desc: "Socket.IO, Redis Caching, Rate Limiting, Event Queues" },
  { label: "Container Orchestration", icon: Shield, desc: "Docker Compose, 5-Service Stacks, Linux, n8n" },
  { label: "Data & ML Pipelines", icon: GitBranch, desc: "PostgreSQL, MySQL, SQLAlchemy ORM, TensorFlow, Scikit-Learn" },
];

/** Verified academic & algorithmic benchmarks */
const IMPACT_METRICS = [
  { value: "9.1", label: "B.Tech CGPA", detail: "VNR VJIET (AI & ML)" },
  { value: "1,000+", label: "Concurrent Streams", detail: "Sub-200ms WebSocket capacity" },
  { value: "500+", label: "Hackathon Devs", detail: "Organized AI Week & Kaggle ML" },
  { value: "300+", label: "DSA Solved", detail: "LeetCode & Codeforces" },
];

export function AboutSection() {
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
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-faint"
          >
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>01 — Profile &amp; Technical Foundation</span>
          </motion.div>

          <motion.h2
            id="about-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Building intelligent full-stack systems and production-grade AI microservices.
          </motion.h2>
        </div>

        {/* Top Bento Row: ASCII Reveal + Editorial Bio */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: ASCII Face Reveal Component */}
          <motion.div
            {...reveal(0.15)}
            className="group relative lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070707]/90 p-6 backdrop-blur-2xl transition-colors hover:border-emerald-400/40 min-h-[460px]"
          >
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Neural Scan // Hover to Reveal
              </span>
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Ascii Canvas Container with Real Profile Photo */}
            <div className="my-4 relative h-[340px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#020202] flex items-center justify-center">
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

            <div className="flex items-center justify-between text-xs font-mono text-muted/70 z-10">
              <span>Jayanth Reddy Konda</span>
              <span className="text-emerald-400">AI &amp; ML Engineer</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Credentials (Clean Minimal Glass Card) */}
          <motion.div
            {...reveal(0.2)}
            className="group relative lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070707]/90 p-8 sm:p-10 backdrop-blur-xl transition-colors hover:border-white/20"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
                <CheckCircle2 className="size-4" />
                <span>B.Tech in Computer Science (AI &amp; ML) • VNR VJIET</span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Engineering at the Intersection of AI RAG, Distributed APIs &amp; Real-Time Systems
              </h3>

              <p className="text-base leading-[1.8] text-muted">
                I engineer containerized, end-to-end platforms combining asynchronous Python (FastAPI/Flask),
                PostgreSQL, vector retrieval databases (Qdrant), and modern React frontends. My focus spans
                automated corporate credit intelligence, multi-factor biometric facial authentication, and streaming financial pipelines.
              </p>

              <p className="text-base leading-[1.8] text-muted">
                Certified in Machine Learning by Stanford University &amp; DeepLearning.AI, I have designed RAG copilot workflows
                with LangChain LCEL and Gemini 2.0 Flash, built real-time WebSocket systems handling 1,000+ concurrent connections,
                and solved 300+ DSA algorithmic challenges.
              </p>
            </div>

            {/* Impact Metric Tiles */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 relative z-10">
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-mono">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-foreground/80">
                    {metric.label}
                  </div>
                  <div className="text-[10px] text-faint font-mono mt-0.5">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Bento Row: Core Competencies Taxonomy */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.label}
                {...reveal(0.1 + idx * 0.04)}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-400">
                  <Icon className="size-5" />
                </div>
                <div className="mt-6">
                  <h4 className="text-base font-semibold tracking-tight text-foreground">
                    {skill.label}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted/80">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <SectionTransition />
    </section>
  );
}

export default AboutSection;
