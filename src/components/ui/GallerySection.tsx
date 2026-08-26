"use client";

/**
 * @file GallerySection.tsx
 * @description Interactive 3D WebGL Architecture Gallery Section using GalleryTunnel.
 */

import { motion, useReducedMotion } from "motion/react";
import { Eye, Sparkles } from "lucide-react";
import { GalleryTunnel } from "./GalleryTunnel";

export function GallerySection() {
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
      data-st-03="20"
      aria-labelledby="gallery-heading"
      className="relative min-h-svh px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            {...reveal(0)}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-faint"
          >
            <Eye className="size-3.5 text-[#00ADB5]" />
            <span>03 — Interactive 3D Architecture Gallery</span>
          </motion.div>

          <motion.h2
            id="gallery-heading"
            {...reveal(0.1)}
            className="text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            Infinite WebGL Tunnel &amp; Visual Corridor.
          </motion.h2>

          <motion.p
            {...reveal(0.15)}
            className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
          >
            Hold &amp; press to accelerate camera velocity through the 3D neural pipeline.
          </motion.p>
        </div>

        {/* 3D Gallery Tunnel Viewport */}
        <motion.div
          {...reveal(0.2)}
          className="mt-12 relative h-[480px] sm:h-[540px] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#1c2129]/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-colors hover:border-[#00ADB5]/40"
        >
          <GalleryTunnel
            grid={5}
            speed={75}
            boost={130}
            fade={95}
            lineColor="#00ADB5"
            lineOpacity={35}
            background="#1c2129"
            label={true}
            labelText="Press to Accelerate ⚡"
            labelFill="#00ADB5"
            labelColor="#222831"
          />

          {/* HUD Overlay Details */}
          <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-2 font-mono text-xs text-[#00ADB5] uppercase tracking-widest z-10">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>WebGL 3D Engine // Realtime Warp</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GallerySection;

