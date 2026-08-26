"use client";

/**
 * @file PixelSectionTransition.tsx
 * @description "Spiral Veil" — pure-CSS clip-path section transition (v6).
 *
 * Technique (scroll-variable keyframes, zero per-frame JS animation):
 * - Each section mounts a fixed two-tone veil (dark #1c2129 over grey #393E46).
 * - A rAF-throttled scroll listener writes ONE custom property (`--scroll`,
 *   0→1 seam progress) on the parent section.
 * - The veils run a CSS `@keyframes st-spiral` animation with
 *   `animation-play-state: paused` and `animation-delay: calc(var(--scroll) * -1s)`
 *   — the scroll position literally scrubs the keyframes. The grey layer runs
 *   slightly offset, so the collapse reads as a two-tone rotating spiral that
 *   tightens into the centre and reveals the next section.
 *
 * No GSAP, no per-cell writes, fully reversible, StrictMode-proof.
 * prefers-reduced-motion: renders nothing.
 */

import { useEffect, useRef } from "react";

export function SectionTransition() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = root.current?.parentElement;
    const veils = root.current?.querySelectorAll<HTMLElement>(".st-veil");
    if (!section || !veils || veils.length === 0) return;

    // Exponential inertia: the rendered progress glides toward the scroll
    // target instead of snapping to it — this is what makes the wipe feel
    // weighted and premium rather than mechanically tied to the wheel.
    const SMOOTHING = 0.085; // 0..1 — lower = heavier, silkier
    const EPSILON = 0.0005;

    let target = 0;
    let current = 0;
    let initialised = false;
    let raf = 0;
    let running = false;

    const apply = (v: number) => {
      section.style.setProperty("--scroll", v.toFixed(4));
      const active = v > 0.001 && v < 0.999;
      veils.forEach((veil) => {
        veil.style.visibility = active ? "visible" : "hidden";
      });
    };

    const tick = () => {
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < EPSILON) {
        current = target;
        apply(current);
        running = false;
        return;
      }
      apply(current);
      raf = requestAnimationFrame(tick);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 while the seam is below the viewport; sweeps 0→1 as the boundary
      // travels from the viewport bottom to 15% from the top.
      target = Math.min(1, Math.max(0, (vh - rect.bottom) / (vh * 0.85)));
      if (!initialised) {
        // First measurement snaps (no sweep-in from zero on page load).
        current = target;
        initialised = true;
        apply(current);
        return;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const requestUpdate = () => requestAnimationFrame(update);

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="contents">
      {/* Grey under-veil: circular iris closes behind the rotating square */}
      <div
        className="st-veil pointer-events-none fixed inset-0 z-[43] invisible"
        style={{
          background: "#393E46",
          animation: "st-iris 1s linear both paused",
          animationDelay: "calc(var(--scroll, 0) * -0.92s)",
          willChange: "clip-path",
        }}
      />
      {/* Teal rim: translucent layer trailing the dark square by a hair —
          reads as a glowing edge sweeping across the collapse */}
      <div
        className="st-veil pointer-events-none fixed inset-0 z-[44] invisible"
        style={{
          background: "rgba(0, 173, 181, 0.45)",
          animation: "st-rotate 1s linear both paused",
          animationDelay: "calc(var(--scroll, 0) * -0.97s)",
          willChange: "clip-path",
        }}
      />
      {/* Dark main veil: rotating square collapse into the centre */}
      <div
        className="st-veil pointer-events-none fixed inset-0 z-[45] invisible"
        style={{
          background: "#1c2129",
          animation: "st-rotate 1s linear both paused",
          animationDelay: "calc(var(--scroll, 0) * -1s)",
          willChange: "clip-path",
        }}
      />
    </div>
  );
}

export default SectionTransition;
