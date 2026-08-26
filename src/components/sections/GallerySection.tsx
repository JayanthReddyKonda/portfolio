"use client";

/**
 * @file GallerySection.tsx
 * @description Interactive 3D WebGL Architecture Gallery Section in Emerald Sophistication theme.
 * 
 * Features:
 * - Dual Mode: 3D Cylindrical Ring Carousel (`RoundCarousel`) & 3D Infinite Corridor (`GalleryTunnel`).
 * - Local high-definition vector blueprints with zero network dependencies.
 * - Interactive acceleration boost, drag momentum, and smooth mode toggling.
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GalleryTunnel } from "@/components/webgl/GalleryTunnel";
import { RoundCarousel } from "@/components/webgl/RoundCarousel";

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function GallerySection() {
  const [viewMode, setViewMode] = useState<"carousel" | "tunnel">("carousel");
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
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header & Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <motion.div
              {...reveal(0)}
              className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]"
            >
              <SparklesIcon className="size-3.5 text-[#7ba05b]" />
              <span>Interactive 3D Visual Corridor</span>
            </motion.div>

            <motion.h2
              id="gallery-heading"
              {...reveal(0.1)}
              className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#f4f1eb]"
            >
              3D Architecture Gallery
            </motion.h2>

            <motion.p
              {...reveal(0.15)}
              className="mt-4 text-base leading-relaxed text-[#f4f1eb]/80 sm:text-lg"
            >
              Explore real-time 3D interactive blueprints of AI pipelines, distributed WebSocket clusters, and cryptographic security vaults. Drag to spin or hold to accelerate.
            </motion.p>
          </div>

          {/* Mode Switcher */}
          <motion.div {...reveal(0.2)} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#2d5a4a]/40 p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-[#7ba05b] text-[#0d4c3c] font-bold shadow-[0_0_15px_rgba(123,160,91,0.5)]"
                  : "text-[#f4f1eb]/70 hover:text-[#f4f1eb]"
              }`}
            >
              <LayersIcon className="size-3.5" />
              <span>3D Cylinder Ring</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("tunnel")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "tunnel"
                  ? "bg-[#7ba05b] text-[#0d4c3c] font-bold shadow-[0_0_15px_rgba(123,160,91,0.5)]"
                  : "text-[#f4f1eb]/70 hover:text-[#f4f1eb]"
              }`}
            >
              <EyeIcon className="size-3.5" />
              <span>Infinite Corridor</span>
            </button>
          </motion.div>
        </div>

        {/* 3D Viewport Area */}
        <motion.div
          {...reveal(0.25)}
          className="mt-12 relative h-[520px] sm:h-[580px] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#2d5a4a]/25 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-colors hover:border-[#7ba05b]/40"
        >
          {viewMode === "carousel" ? (
            <RoundCarousel />
          ) : (
            <GalleryTunnel />
          )}

          {/* Viewport Meta Indicator */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2 font-mono text-xs text-[#f4f1eb]/60 z-10 pointer-events-none">
            <EyeIcon className="size-3.5 text-[#7ba05b]" />
            <span>
              {viewMode === "carousel"
                ? "3D Cylindrical Ring • Drag to Rotate & Flick"
                : "3D WebGL Image Corridor • Drag & Hold to Accelerate"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GallerySection;
