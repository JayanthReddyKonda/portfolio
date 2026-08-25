"use client";

/**
 * @file InitialLoader.tsx
 * @description Dynamic 0-100% Quantum Loader with Cinematic Zoom-In Warp.
 * Features:
 * - High-speed counter (000% -> 100%) with asynchronous system telemetry logs.
 * - Glowing radial SVG progress ring with gradient sweep.
 * - Cinematic zoom-in warp transition upon completion.
 * - Automatic unlock of document scroll upon complete.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

const TELEMETRY_LOGS = [
  "INITIALIZING NEURAL KERNEL...",
  "ALLOCATING VECTOR EMBEDDINGS (QDRANT)...",
  "ESTABLISHING WEBSOCKET PIPELINE (1000+ STREAMS)...",
  "HYDRATING 3D AVATAR RIG & SHADERS...",
  "DISPATCHING HIGH-PERFORMANCE ENGINE...",
  "ALL SYSTEMS OPERATIONAL // READY",
];

export function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during load
    document.body.style.overflow = "hidden";
    document.body.dataset.loaderActive = "true";

    const duration = 1600; // 1.6s quick high-impact sequence
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(ease * 100);
      setCount(currentCount);

      const logStep = Math.min(
        TELEMETRY_LOGS.length - 1,
        Math.floor(progress * TELEMETRY_LOGS.length)
      );
      setLogIndex(logStep);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          delete document.body.dataset.loaderActive;
          onComplete?.();
          // Signals scroll-dependent systems (PixelSectionTransition) that
          // layout is final and measurements are safe.
          window.dispatchEvent(new Event("jrk:loader-complete"));
        }, 250);
      }
    };

    const rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      delete document.body.dataset.loaderActive;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 2,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] text-foreground select-none pointer-events-none"
        >
          {/* Ambient center flare */}
          <div className="absolute size-[480px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute size-[320px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

          {/* Loader Card */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Circular Progress Ring with Center Counter */}
            <div className="relative flex items-center justify-center size-36 mb-8">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="url(#loaderGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * count) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Numeric Percentage */}
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-4xl font-bold tracking-tighter text-foreground">
                  {String(count).padStart(2, "0")}
                  <span className="text-emerald-400 text-2xl font-normal">%</span>
                </span>
              </div>
            </div>

            {/* Brand Header */}
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "4s" }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground font-semibold">
                JRK // AI ARCHITECT
              </span>
            </div>

            {/* Real-Time Telemetry Log */}
            <div className="h-6 flex items-center gap-1.5 font-mono text-[11px] text-muted/80">
              <Terminal className="size-3 text-cyan-400 shrink-0" />
              <span className="truncate">{TELEMETRY_LOGS[logIndex]}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialLoader;

