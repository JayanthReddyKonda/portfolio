"use client";

/**
 * @file ExperienceSection.tsx
 * @description Ultra-Clean Experience, Academic Education & Leadership Section in Emerald Sophistication.
 * 
 * Features:
 * - 100% Bound to `@/data/experience` source of truth.
 * - Work experience at IBM SkillsBuild as AI/ML Virtual Trainee.
 * - Academic education at VNR VJIET (B.Tech CSE AI & ML, 9.1 CGPA), Narayana JC (93%), Gitanjali High School (97.2%).
 * - Technical volunteering at Krithomedh AI/ML Club (AI Week '26, Kaggle ML Challenge).
 * - Algorithmic problem solving record (300+ DSA on LeetCode/Codeforces).
 * - Machine Learning Specialization by Stanford University & DeepLearning.AI.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  WORK_EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  LEADERSHIP_ACTIVITIES,
  LANGUAGES,
} from "@/data/experience";

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
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

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

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
      aria-labelledby="experience-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]"
          >
            <BriefcaseIcon className="size-3.5 text-[#7ba05b]" />
            <span>Experience, Education &amp; Leadership</span>
          </motion.div>

          <motion.h2
            id="experience-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#f4f1eb]"
          >
            Track record of continuous engineering, algorithmic rigor, and community leadership.
          </motion.h2>
        </div>

        {/* 2-Column Grid: Industry Experience vs Academic Credentials */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Work Experience & Community Leadership */}
          <motion.div {...reveal(0.15)} className="lg:col-span-6 space-y-6">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#7ba05b]">
              <BriefcaseIcon className="size-4" />
              <span>Industry Training &amp; Experience</span>
            </h3>

            {/* Work Experience Cards */}
            {WORK_EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-[#2d5a4a]/35 p-8 backdrop-blur-xl transition-colors hover:border-[#7ba05b]/40"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h4 className="text-xl font-bold text-[#f4f1eb]">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-semibold text-[#7ba05b] font-mono mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-[#0d4c3c]/60 px-3 py-1 font-mono text-xs text-[#f4f1eb]/70">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#f4f1eb]/80">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircleIcon className="size-4 text-[#7ba05b] mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Leadership & Activities Card */}
            <div className="rounded-3xl border border-white/10 bg-[#2d5a4a]/30 p-8 backdrop-blur-xl space-y-6">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#f4f1eb]">
                <UsersIcon className="size-5 text-[#7ba05b]" />
                <span>Leadership &amp; Technical Volunteering</span>
              </h4>

              <div className="space-y-4">
                {LEADERSHIP_ACTIVITIES.map((act, i) => (
                  <div key={i} className="border-l-2 border-[#7ba05b]/40 pl-4 space-y-1.5">
                    <p className="text-sm font-semibold text-[#f4f1eb]">
                      {act.role} — {act.organization}
                    </p>
                    <p className="text-xs text-[#f4f1eb]/75 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Academic Degrees, Stanford Certification & Languages */}
          <motion.div {...reveal(0.2)} className="lg:col-span-6 space-y-6">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#7ba05b]">
              <GraduationCapIcon className="size-4" />
              <span>Academic Education &amp; Credentials</span>
            </h3>

            {/* Degrees Breakdown Card */}
            <div className="group relative rounded-3xl border border-white/10 bg-[#2d5a4a]/35 p-8 backdrop-blur-xl space-y-6 transition-colors hover:border-[#7ba05b]/40">
              <div className="relative z-10 space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className={`${idx > 0 ? "border-t border-white/5 pt-4" : ""} space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h4 className="text-base font-bold text-[#f4f1eb]">
                          {edu.institution}
                        </h4>
                        <p className="text-xs text-[#f4f1eb]/70 mt-0.5">
                          {edu.degree}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-xs font-bold rounded-full px-3 py-1 ${
                          idx === 0
                            ? "bg-[#7ba05b] text-[#0d4c3c]"
                            : "border border-white/10 bg-white/5 text-[#f4f1eb]/80"
                        }`}
                      >
                        {edu.grade}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#f4f1eb]/40">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-[#2d5a4a]/30 p-8 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-[#7ba05b]/30 bg-[#7ba05b]/10 text-[#7ba05b] shrink-0">
                    <AwardIcon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#f4f1eb]">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-mono text-[#7ba05b]">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-[#f4f1eb]/75 leading-relaxed pt-1">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Multilingual Fluency */}
            <div className="rounded-3xl border border-white/10 bg-[#2d5a4a]/30 p-6 backdrop-blur-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#f4f1eb]/50">
                Languages Spoken
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {LANGUAGES.map((lang, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/10 bg-[#0d4c3c]/60 px-3 py-1 font-mono text-xs text-[#f4f1eb]/90"
                  >
                    {lang.language} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
