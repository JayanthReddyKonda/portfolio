"use client";

/**
 * @file SkillsDiagnosticsSection.tsx
 * @description Single Unified Interactive Skills Lab & Live CLI Terminal Section (Section 04).
 *
 * Design:
 * - 100% Contiguous single section with zero transitions between Skills and Terminal.
 * - Interactive 3D WebGL Sticker Peel Deck: PyTorch, FastAPI, Docker, Qdrant, Next.js 16, CUDA.
 * - Integrated Live CLI Terminal with real system commands and LiquidCarve quick actions.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  Zap,
} from "lucide-react";
import { StickerPeel } from "./StickerPeel";
import { STICKER_BADGES } from "./stickerImages";
import { LiquidCarveButton } from "./LiquidCarveButton";
import { TerminalWidget } from "./TerminalWidget";

const STICKERS = [
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI / Deep Learning",
    image: STICKER_BADGES.pytorch,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Async Backend",
    image: STICKER_BADGES.fastapi,
  },
  {
    id: "docker",
    name: "Docker & K8s",
    category: "Cloud & Ops",
    image: STICKER_BADGES.docker,
  },
  {
    id: "qdrant",
    name: "Qdrant Vector DB",
    category: "Vector Search",
    image: STICKER_BADGES.qdrant,
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "React 19 / Turbopack",
    image: STICKER_BADGES.nextjs,
  },
  {
    id: "cuda",
    name: "CUDA & Tensor",
    category: "GPU Parallelism",
    image: STICKER_BADGES.cuda,
  },
];

const PRESET_COMMANDS = [
  { label: "projects", cmd: "projects", icon: <Layers className="size-3.5" /> },
  { label: "skills", cmd: "skills", icon: <Cpu className="size-3.5" /> },
  { label: "education", cmd: "education", icon: <Code2 className="size-3.5" /> },
  { label: "experience", cmd: "experience", icon: <Sparkles className="size-3.5" /> },
  { label: "certifications", cmd: "certifications", icon: <Zap className="size-3.5" /> },
  { label: "contact", cmd: "contact", icon: <TerminalIcon className="size-3.5" /> },
];

export function SkillsDiagnosticsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduceMotion
      ? { duration: 0.2 }
      : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

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
      id="terminal"
      aria-labelledby="skills-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-faint"
          >
            <TerminalIcon className="size-3.5 text-[#00ADB5]" />
            <span>04 // Interactive Skills Lab &amp; Live Terminal</span>
          </motion.div>

          <motion.h2
            id="skills-heading"
            {...reveal(0.08)}
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Interactive Skills Lab &amp;{" "}
            <span className="bg-gradient-to-r from-[#00ADB5] to-[#71C9CE] bg-clip-text text-transparent">
              Live Terminal.
            </span>
          </motion.h2>

          <motion.p
            {...reveal(0.14)}
            className="mt-4 text-pretty font-mono text-sm text-muted/90 sm:text-base"
          >
            Peel interactive 3D WebGL stickers to explore core engineering domains,
            or interact directly with the CLI diagnostics terminal below.
          </motion.p>
        </div>

        {/* Part 1: 3D Sticker Peel Deck */}
        <motion.div {...reveal(0.18)} className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {STICKERS.map((stk) => (
              <div
                key={stk.id}
                onClick={() => runCommand("skills")}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#1c2129]/50 p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#00ADB5]/50 hover:bg-[#1c2129]/80 hover:shadow-[0_0_20px_rgba(0,173,181,0.2)] cursor-pointer"
              >
                {/* 3D WebGL Sticker */}
                <div className="relative my-2 flex items-center justify-center pointer-events-auto">
                  <StickerPeel
                    image={stk.image}
                    imageWidth={130}
                    imageHeight={130}
                    hoverPeel={45}
                    pressPeel={70}
                    backColor="#1c2129"
                  />
                </div>

                {/* Sticker Info */}
                <div className="w-full text-center mt-2">
                  <p className="font-mono text-xs font-bold text-foreground group-hover:text-[#00ADB5] transition-colors">
                    {stk.name}
                  </p>
                  <p className="font-mono text-[10px] text-faint truncate mt-0.5">
                    {stk.category}
                  </p>
                </div>

                <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] text-[#00ADB5]/70 group-hover:text-[#00ADB5] transition-colors">
                  ● Hover to peel
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Part 2: Integrated CLI Terminal with LiquidCarve Quick-Run Bar */}
        <motion.div {...reveal(0.22)}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
                CLI Diagnostics
              </span>
              <span className="font-mono text-xs text-[#00ADB5]">
                ● Node Online
              </span>
            </div>

            {/* Quick Command Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              <span className="hidden sm:inline text-[11px] text-muted/50 mr-1">Quick:</span>
              {PRESET_COMMANDS.map((btn) => (
                <LiquidCarveButton
                  key={btn.cmd}
                  size="sm"
                  variant="ghost"
                  className="text-xs px-2.5 py-1"
                  icon={btn.icon}
                  onClick={() => runCommand(btn.cmd)}
                >
                  {btn.label}
                </LiquidCarveButton>
              ))}
            </div>
          </div>

          <TerminalWidget />
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsDiagnosticsSection;
