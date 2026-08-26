"use client";

/**
 * @file InitialLoader.tsx
 * @description Minimal boot loader — pure typography and a single teal
 * progress hairline. No ornament: the brand wordmark, a 1px line that fills,
 * and a small mono percentage. Fades out cleanly on completion.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during load
    document.body.style.overflow = "hidden";
    document.body.dataset.loaderActive = "true";

    const duration = 1500;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      // Ease-out: fast start, gentle settle — reads as confident, not busy.
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          delete document.body.dataset.loaderActive;
          onComplete?.();
          // Signals scroll-dependent systems that layout is final.
          window.dispatchEvent(new Event("jrk:loader-complete"));
        }, 300);
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#222831] select-none pointer-events-none"
          aria-label="Loading"
          role="status"
        >
          {/* Wordmark */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm uppercase tracking-[0.5em] text-[#EEEEEE]"
          >
            Jayanth&nbsp;Reddy&nbsp;Konda
          </motion.span>

          {/* Single teal progress hairline */}
          <div className="mt-6 h-px w-52 overflow-hidden bg-[#EEEEEE]/10">
            <div
              className="h-full bg-[#00ADB5] transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage — small, quiet, bottom-anchored to the line */}
          <span className="mt-3 font-mono text-[11px] tabular-nums tracking-[0.3em] text-[#EEEEEE]/40">
            {String(progress).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialLoader;
