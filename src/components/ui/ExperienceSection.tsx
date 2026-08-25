"use client";

/**
 * @file ExperienceSection.tsx
 * @description Ultra-Clean Experience, Academic Education & Leadership Section.
 * Features:
 * - Work experience at IBM SkillsBuild as AI/ML Virtual Trainee.
 * - Academic education at VNR VJIET (B.Tech CSE AI & ML, 9.1 CGPA), Narayana JC (93%), Gitanjali High School (97.2%).
 * - Technical volunteering at Krithomedh AI/ML Club (AI Week '26, Kaggle ML Challenge).
 * - Algorithmic problem solving record (300+ DSA on LeetCode/Codeforces).
 * - Machine Learning Specialization by Stanford University & DeepLearning.AI.
 */

import { motion, useReducedMotion } from "motion/react";
import { Briefcase, GraduationCap, Award, CheckCircle2, Users } from "lucide-react";

export function ExperienceSection() {
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
      id="experience"
      data-st-03="20"
      aria-labelledby="experience-heading"
      className="relative min-h-screen px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-faint"
          >
            <Briefcase className="size-3.5 text-emerald-400" />
            <span>03 — Experience, Education &amp; Leadership</span>
          </motion.div>

          <motion.h2
            id="experience-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Track record of continuous engineering, algorithmic rigor, and community leadership.
          </motion.h2>
        </div>

        {/* 2-Column Grid: Industry Experience vs Academic Credentials */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Work Experience & Community Leadership */}
          <motion.div {...reveal(0.15)} className="lg:col-span-6 space-y-6">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
              <Briefcase className="size-4" />
              <span>Industry Training &amp; Experience</span>
            </h3>

            {/* IBM SkillsBuild Experience Card */}
            <div className="group relative rounded-3xl border border-white/10 bg-[#070707]/90 p-8 backdrop-blur-xl transition-colors hover:border-white/20">
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h4 className="text-xl font-bold text-foreground">
                      Artificial Intelligence &amp; Machine Learning Virtual Trainee
                    </h4>
                    <p className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                      IBM SkillsBuild
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-muted">
                    Sep 2025 – Oct 2025
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>
                      Designed an AI-powered study assistant enabling interactive question answering and automated concept explanations using LLM APIs, implementing modular Python services to support concurrent study workflows.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>
                      Engineered API-driven pipelines integrating external LLM services for summarization, concept retrieval, prompt orchestration, request routing, and response parsing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Leadership & Activities Card */}
            <div className="rounded-3xl border border-white/10 bg-[#070707]/80 p-8 backdrop-blur-xl space-y-6">
              <h4 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <Users className="size-5 text-emerald-400" />
                <span>Leadership &amp; Technical Volunteering</span>
              </h4>

              <div className="space-y-4">
                <div className="border-l-2 border-emerald-400/40 pl-4 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    Technical Volunteer — Krithomedh AI/ML Club
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    Organized <strong className="text-white">AI Week &apos;26</strong>; authored the official Machine Learning Challenge problem deployed on Kaggle, and designed problem statements for the <strong className="text-white">Vibe Coding Hackathon</strong>, engaging 500+ student developers.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400/40 pl-4 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    Competitive Programming &amp; Problem Solving
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    Solved <strong className="text-emerald-400 font-mono font-bold">300+ Data Structures and Algorithms</strong> problems across Codeforces and LeetCode with strong algorithmic optimization in C++ and Python.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Academic Degrees, Stanford Certification & Languages */}
          <motion.div {...reveal(0.2)} className="lg:col-span-6 space-y-6">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
              <GraduationCap className="size-4" />
              <span>Academic Education &amp; Credentials</span>
            </h3>

            {/* Degrees Breakdown Card */}
            <div className="group relative rounded-3xl border border-white/10 bg-[#070707]/90 p-8 backdrop-blur-xl space-y-6 transition-colors hover:border-white/20">
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        VNR Vignana Jyothi Institute of Engineering and Technology
                      </h4>
                      <p className="text-sm text-muted">
                        B.Tech, Computer Science and Engineering (AI &amp; ML) • Hyderabad, Telangana
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1">
                      CGPA: 9.1 / 10.0
                    </span>
                  </div>
                  <p className="text-xs font-mono text-faint">Sep 2024 – Present</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">
                        Narayana Junior College
                      </h5>
                      <p className="text-xs text-muted">
                        Intermediate (Class XII) • Vijayawada, Andhra Pradesh
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium text-foreground/80">
                      93% (2022 – 2024)
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">
                        Gitanjali (EM) High School
                      </h5>
                      <p className="text-xs text-muted">
                        Matriculation (Class X) • Podili, Andhra Pradesh
                      </p>
                    </div>
                    <span className="font-mono text-xs font-medium text-foreground/80">
                      97.2% (2021 – 2022)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stanford University ML Specialization Card */}
            <div className="rounded-3xl border border-white/10 bg-[#070707]/80 p-8 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-400 shrink-0">
                  <Award className="size-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">
                    Machine Learning Specialization
                  </h4>
                  <p className="text-xs font-mono text-emerald-400">
                    Stanford University &amp; DeepLearning.AI
                  </p>
                  <p className="text-xs text-muted leading-relaxed pt-1">
                    Instructed by Andrew Ng via Coursera — Covering Supervised Learning, Advanced Learning Algorithms, Neural Networks, Decision Trees, and Unsupervised Learning / Recommender Systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Multilingual Fluency */}
            <div className="rounded-3xl border border-white/10 bg-[#070707]/80 p-6 backdrop-blur-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Languages Spoken
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-foreground/90">
                  English (Professional / Fluent)
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-foreground/90">
                  Telugu (Native)
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-foreground/90">
                  Hindi (Conversational)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
