"use client";

/**
 * @file HeroSection.tsx
 * @description Masterpiece Hero Viewport for Jayanth Reddy Konda.
 * Features:
 * - Fluid display typography with responsive clamp sizing.
 * - Live Engine Room status indicator with pulse animation.
 * - Originkit RotatingText & Typewriter kinetic titles.
 * - Originkit LiquidCarveButton on primary action trigger.
 * - Verified social transmission lines (GitHub, LinkedIn, Email).
 * - Non-overlapping layout tailored for the 3D Avatar spotlight on the right.
 */

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Terminal, FileText, FileDown } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { LiquidCarveButton } from "./LiquidCarveButton";
import { SectionTransition } from "./PixelSectionTransition";

/** GitHub SVG icon component */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** LinkedIn SVG icon component */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Direct Email SVG icon component */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/** Verified social profiles */
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/JayanthReddyKonda",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jayanthreddykonda/",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:kondajayanthreddy@gmail.com",
    icon: MailIcon,
  },
] as const;

export function HeroSection() {
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
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col justify-end px-6 pb-16 pt-32 sm:px-10 sm:pb-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Constrain typography to the left half so 3D avatar has dedicated right stage */}
        <div className="max-w-xl lg:max-w-[54%] xl:max-w-[50%]">
          {/* Status Eyebrow Pill */}
          <motion.div
            {...reveal(0.1)}
            className="mb-6 inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00ADB5] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00ADB5]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/90 sm:text-xs sm:tracking-[0.2em]">
              AI/ML SYSTEMS &amp; BACKEND ARCHITECT • HYDERABAD
            </span>
          </motion.div>

          {/* Main Display Name */}
          <motion.h1
            id="hero-heading"
            {...reveal(0.2)}
            className="text-[clamp(2.6rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground"
          >
            Jayanth Reddy Konda.
          </motion.h1>

          {/* Kinetic Subheading with Originkit Typewriter */}
          <motion.div
            {...reveal(0.3)}
            className="mt-6 text-[clamp(1.15rem,2.2vw,1.55rem)] font-medium leading-snug tracking-tight text-foreground/95"
          >
            <span className="text-muted/80">Architecting </span>
            <Typewriter
              texts={[
                "FastAPI & Qdrant RAG Pipelines",
                "Distributed Real-Time Microservices",
                "Biometric Vision Authentication Systems",
                "Sub-200ms Financial Market Streams",
              ]}
              typeSpeed={0.05}
              holdTime={1.8}
              typedColor="#00ADB5"
              cursorColor="#00ADB5"
            />
          </motion.div>

          {/* Summary Narrative */}
          <motion.p
            {...reveal(0.4)}
            className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
          >
            Building AI-driven financial underwriting engines, real-time market anomaly pipelines,
            patient recovery monitoring architectures, and biometric face authentication systems.
          </motion.p>

          {/* Primary Action Buttons & Social Channels */}
          <motion.div
            {...reveal(0.5)}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <LiquidCarveButton
              link="#work"
              label="Explore Projects"
              padding="10px 24px"
              fill="#EEEEEE"
              textColor="#222831"
              blobColor="#00ADB5"
              blobSize={65}
              icon={{
                type: "symbol",
                symbol: "→",
                size: 16,
                color: "#222831",
                side: "right",
              }}
              addIcon={true}
              font={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.05em",
              }}
            />

            <a
              href="#terminal"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <Terminal className="size-4 text-[#00ADB5]" />
              <span>CLI Terminal</span>
            </a>

            <a
              href="/resume.pdf"
              download="Jayanth_Reddy_Konda_Resume.pdf"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#00ADB5]/30 bg-[#00ADB5]/10 px-5 text-sm font-medium text-[#00ADB5] backdrop-blur-md transition-all hover:border-[#00ADB5]/60 hover:bg-[#00ADB5]/20 hover:shadow-[0_0_16px_rgba(0,173,181,0.3)]"
            >
              <FileDown className="size-4" />
              <span>Get Resume</span>
            </a>

            <a
              href="#experience"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-muted backdrop-blur-md transition-colors hover:border-white/20 hover:text-foreground hover:bg-white/10"
            >
              <FileText className="size-4" />
              <span>Experience</span>
            </a>

            <div className="flex items-center gap-2 pl-1">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-foreground active:scale-95"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Scroll Indicator Cue */}
        <motion.div
          {...reveal(0.65)}
          className="mt-16 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint"
        >
          <ArrowDown className="size-3.5 animate-bounce text-[#00ADB5]" />
          <span>Scroll for full system breakdown</span>
        </motion.div>
      </div>

      <SectionTransition />
    </section>
  );
}

export default HeroSection;
