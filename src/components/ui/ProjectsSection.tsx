"use client";

/**
 * @file ProjectsSection.tsx
 * @description Ultra-Clean, Ultra-Fast Production AI & Distributed Systems Showcase.
 * Features:
 * - 4 Verified Production Architectures with high-definition specs, benchmarks, and architecture highlights.
 * - Hardware-accelerated GPU transitions with zero overhead.
 */

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Activity, ShieldCheck, TrendingUp, HeartPulse, Lock, CheckCircle2 } from "lucide-react";
import { LiquidCarveButton } from "./LiquidCarveButton";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** 4 Verified Production Architectures */
const REAL_PROJECTS = [
  {
    id: "credit-intelligence",
    title: "AI-Powered Corporate Credit Intelligence Platform",
    tagline: "Autonomous Underwriting & CAM Generation Engine",
    category: "01 // Financial AI & Vector RAG",
    description:
      "A containerized corporate underwriting platform orchestrating a 5-service Docker Compose stack with async-to-thread offloading across endpoints for case intake, financial document parsing, and automated credit scoring.",
    metrics: [
      { label: "Architecture", value: "5-Service Docker Stack" },
      { label: "Risk Classification", value: "20+ Dynamic Findings" },
      { label: "Semantic RAG", value: "Gemini 2.0 + Qdrant" },
      { label: "Integrations", value: "MCA, GSTN, eCourts APIs" },
    ],
    tags: ["FastAPI", "React 19", "PostgreSQL", "Qdrant", "LangChain LCEL", "Gemini 2.0 Flash", "Tavily", "pdfplumber", "Docker Compose"],
    icon: ShieldCheck,
    highlights: [
      "Engineered credit scoring engine analyzing financial docs via pdfplumber with GST-bank mismatch anomaly detection.",
      "Implemented a RAG research pipeline using Tavily and Qdrant semantic retrieval with Gemini 2.0 Flash embeddings for CAM reports with full evidence lineage.",
      "Built an Analyst Copilot using LangChain LCEL with RunnableParallel for concurrent Gemini inference, integrating MCA, GSTN, and eCourts APIs.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "market-intelligence",
    title: "Real-Time Financial Market Intelligence Platform",
    tagline: "Streaming Anomaly Detection & News Synthesis",
    category: "02 // Distributed Streaming & WebSockets",
    description:
      "A high-throughput streaming intelligence platform detecting anomalous stock movements across 50+ NSE/BSE tickers, processing distributed market data pipelines using rolling Z-score anomaly detection at 60-second intervals.",
    metrics: [
      { label: "Concurrency", value: "1,000+ WebSocket Streams" },
      { label: "Latency", value: "Sub-200ms API Response" },
      { label: "Coverage", value: "50+ NSE/BSE Tickers" },
      { label: "Event Pipeline", value: "500+ Daily Filings Explained" },
    ],
    tags: ["FastAPI", "PostgreSQL", "WebSockets", "spaCy", "Python AsyncIO", "Docker", "NLP", "Pandas"],
    icon: TrendingUp,
    highlights: [
      "Engineered a scalable microservices-based backend using asynchronous FastAPI services and PostgreSQL exposing REST APIs and WebSocket streams.",
      "Implemented a two-stage event analysis pipeline for financial news and filings using spaCy entity filtering and deterministic search.",
      "Synthesizes natural language explanations for 500+ daily market events with automated anomaly alerting.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "patient-recovery",
    title: "AI-Powered Patient Recovery Monitoring System",
    tagline: "Clinical Trend Analytics & Real-Time SOS Escalation",
    category: "03 // Healthcare AI & Event Streaming",
    description:
      "A containerized healthcare platform using asynchronous FastAPI backend and React frontend, enabling doctors to track vital recovery metrics and orchestrate real-time messaging for 1,000+ patients.",
    metrics: [
      { label: "Latency Drop", value: "40% via Redis Caching" },
      { label: "Webhooks", value: "500+ Concurrent Events" },
      { label: "Messaging", value: "Socket.IO for 1,000+ Patients" },
      { label: "Alert Dispatch", value: "WhatsApp & SMTP SOS" },
    ],
    tags: ["FastAPI", "React", "PostgreSQL", "Redis", "Socket.IO", "SQLAlchemy ORM", "JWT", "WhatsApp API"],
    icon: HeartPulse,
    highlights: [
      "Engineered PostgreSQL APIs with SQLAlchemy ORM, integrating Redis-backed rate limiting and AI response caching to reduce latency by 40%.",
      "Asynchronously processes 500+ concurrent webhook events with secure token-based authentication.",
      "Implemented an escalation engine leveraging LLMs to parse symptom logs, synthesize clinical trends, and trigger automated SOS workflows.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "face-auth",
    title: "Multi-Factor Face Authentication + Secure Notes System",
    tagline: "Biometric Facial Recognition & Encrypted Vault",
    category: "04 // Computer Vision & Cryptographic Security",
    description:
      "An advanced biometric security system combining password verification with live facial recognition using DeepFace and RetinaFace, exposing JWT-secured REST APIs for user authentication and encrypted note storage.",
    metrics: [
      { label: "Encryption", value: "AES-256 Facial Embeddings" },
      { label: "Throughput", value: "1,000 Concurrent Sessions" },
      { label: "Vision Models", value: "DeepFace + RetinaFace" },
      { label: "Security", value: "bcrypt + JWT State Management" },
    ],
    tags: ["Flask", "DeepFace", "RetinaFace", "PostgreSQL", "Docker Compose", "AES-256", "bcrypt", "JWT", "Python"],
    icon: Lock,
    highlights: [
      "Architected a biometric authentication system combining password verification with live facial recognition via DeepFace & RetinaFace.",
      "Designed PostgreSQL system storing AES-256 encrypted facial embeddings and user records with bcrypt password hashing.",
      "Containerized multi-service architecture with Docker Compose and optimized threaded Flask services to support up to 1,000 concurrent sessions.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
] as const;

export function ProjectsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-faint"
          >
            <Activity className="size-3.5 text-[#00ADB5]" />
            <span>02 — Featured Systems &amp; Engineering Projects</span>
          </motion.div>

          <motion.h2
            id="projects-heading"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Production-grade systems bridging AI intelligence and scalable infrastructure.
          </motion.h2>
        </div>

        {/* Clean Project Cards Stream */}
        <div className="mt-16 space-y-10">
          {REAL_PROJECTS.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#1c2129]/90 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-[#00ADB5]/30 hover:bg-[#090909] overflow-hidden"
              >
                {/* Card Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start relative z-10">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4 text-[#00ADB5]" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00ADB5]">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {project.title}
                      </h3>
                      <span className="text-sm font-medium text-muted/80">
                        — {project.tagline}
                      </span>
                    </div>

                    <p className="text-base leading-relaxed text-muted sm:text-lg pt-1">
                      {project.description}
                    </p>

                    {/* Engineering Highlights */}
                    <div className="mt-4 space-y-2 pt-2">
                      <ul className="space-y-2 text-sm text-muted/90">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="size-4 text-[#00ADB5] mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Benchmarks & Action Links */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
                    <div className="space-y-3">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                        Specs &amp; Benchmarks
                      </span>
                      <div className="space-y-2.5">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-xs text-muted font-mono">{m.label}</span>
                            <span className="text-xs font-bold text-foreground font-mono">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <LiquidCarveButton
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="sm"
                          icon={<GithubIcon className="size-3.5" />}
                          iconPosition="left"
                        >
                          View Repository
                        </LiquidCarveButton>
                        <LiquidCarveButton
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="ghost"
                          size="sm"
                          icon={<ExternalLink className="size-3.5" />}
                        >
                          Architecture Specs
                        </LiquidCarveButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;