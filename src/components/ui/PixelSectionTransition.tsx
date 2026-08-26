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

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 while the seam is below the viewport; sweeps 0→1 as the boundary
      // travels from the viewport bottom to 15% from the top.
      const p = Math.min(1, Math.max(0, (vh - rect.bottom) / (vh * 0.85)));
      section.style.setProperty("--scroll", p.toFixed(4));

      // Veils only exist while the spiral is mid-flight.
      const active = p > 0.001 && p < 0.999;
      veils.forEach((v) => {
        v.style.visibility = active ? "visible" : "hidden";
      });
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="contents">
      {/* Grey under-veil: trails the dark layer for two-tone depth */}
      <div
        className="st-veil pointer-events-none fixed inset-0 z-[44] invisible"
        style={{
          background: "#393E46",
          animation: "st-spiral 1s linear both paused",
          animationDelay: "calc(var(--scroll, 0) * -0.88s)",
          willChange: "clip-path",
        }}
      />
      {/* Dark main veil */}
      <div
        className="st-veil pointer-events-none fixed inset-0 z-[45] invisible"
        style={{
          background: "#1c2129",
          animation: "st-spiral 1s linear both paused",
          animationDelay: "calc(var(--scroll, 0) * -1s)",
          willChange: "clip-path",
        }}
      />
    </div>
  );
}

export default SectionTransition;
