"use client";

/**
 * @file SkillsSection.tsx
 * @description Single Unified Interactive Skills Lab & Live CLI Terminal Section.
 * 
 * Features:
 * - Standardized page entry animation aligned with all other stages.
 * - Interactive 3D WebGL Sticker Peel Deck with Emerald Sophistication palettes.
 * - Integrated Live CLI Terminal with LabelSlideButton quick-run bar.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { StickerPeel } from "@/components/webgl/StickerPeel";
import { STICKERS } from "@/data/skills";
import { LabelSlideButton } from "@/components/core/LabelSlideButton";
import { TerminalWidget } from "@/components/terminal/TerminalWidget";

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

const PRESET_COMMANDS = [
  { label: "projects", cmd: "projects" },
  { label: "skills", cmd: "skills" },
  { label: "education", cmd: "education" },
  { label: "experience", cmd: "experience" },
  { label: "certifications", cmd: "certifications" },
  { label: "contact", cmd: "contact" },
];

export function SkillsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  };

  const runCommand = (command: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("jrk:run-terminal-command", {
          detail: { command },
        })
      );
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <motion.div
            {...reveal}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]"
          >
            <TerminalIcon className="size-3.5 text-[#7ba05b]" />
            <span>Interactive Skills Lab &amp; Live Terminal</span>
          </motion.div>

          <motion.h2
            id="skills-heading"
            {...reveal}
            className="text-balance text-3xl font-bold tracking-tight text-[#f4f1eb] sm:text-4xl lg:text-5xl"
          >
            Interactive Skills Lab &amp;{" "}
            <span className="bg-gradient-to-r from-[#7ba05b] to-[#a4c982] bg-clip-text text-transparent">
              Live Terminal.
            </span>
          </motion.h2>

          <motion.p
            {...reveal}
            className="mt-4 text-pretty font-mono text-sm text-[#f4f1eb]/80 sm:text-base"
          >
            Peel interactive 3D WebGL stickers to explore core engineering domains,
            or interact directly with the CLI diagnostics terminal below.
          </motion.p>
        </div>

        {/* Part 1: 3D Sticker Peel Deck */}
        <motion.div {...reveal} className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {STICKERS.map((stk) => (
              <div
                key={stk.id}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#2d5a4a]/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#7ba05b]/40 hover:bg-[#2d5a4a]/50 hover:shadow-[0_0_20px_rgba(123,160,91,0.2)]"
              >
                {/* 3D WebGL Sticker */}
                <div className="relative my-2 flex items-center justify-center pointer-events-auto">
                  <StickerPeel
                    image={stk.image}
                    imageWidth={130}
                    imageHeight={130}
                    hoverPeel={45}
                    pressPeel={70}
                    backColor="#1b4b3e"
                  />
                </div>

                {/* Sticker Info */}
                <div className="w-full text-center mt-2">
                  <p className="font-mono text-xs font-bold text-[#f4f1eb] group-hover:text-[#7ba05b] transition-colors">
                    {stk.name}
                  </p>
                  <p className="font-mono text-[10px] text-[#f4f1eb]/50 truncate mt-0.5">
                    {stk.category}
                  </p>
                </div>

                <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] text-[#7ba05b]/80 group-hover:text-[#7ba05b] transition-colors">
                  ● Hover to peel
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Part 2: Integrated CLI Terminal with LabelSlideButton Quick Bar */}
        <motion.div {...reveal}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#f4f1eb]/50">
                CLI Diagnostics
              </span>
              <span className="font-mono text-xs text-[#7ba05b]">
                ● Node Online
              </span>
            </div>

            {/* Quick Command Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              <span className="hidden sm:inline text-[11px] text-[#f4f1eb]/50 mr-1">Quick:</span>
              {PRESET_COMMANDS.map((btn) => (
                <LabelSlideButton
                  key={btn.cmd}
                  size="sm"
                  variant="ghost"
                  label={btn.label}
                  addIcon={false}
                  onClick={() => runCommand(btn.cmd)}
                />
              ))}
            </div>
          </div>

          <TerminalWidget />
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
