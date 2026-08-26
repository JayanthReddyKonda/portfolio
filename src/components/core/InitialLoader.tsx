"use client";

/**
 * @file InitialLoader.tsx
 * @description Minimal boot loader — pure typography and a single teal progress hairline.
 * Features:
 * - Session-isolated: loads ONCE on first site entry, skipped on subsequent page switches to Overview.
 * - Smooth cubic ease-out with automatic clean unmount.
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "jrk_portfolio_initial_loaded";

const emptySubscribe = () => () => { };

function getSessionIsLoaded() {
  if (typeof window === "undefined") return true;
  return Boolean(sessionStorage.getItem(SESSION_KEY));
}

function getSessionIsLoadedServer() {
  return true;
}

export function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const isAlreadyLoaded = useSyncExternalStore(
    emptySubscribe,
    getSessionIsLoaded,
    getSessionIsLoadedServer
  );

  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isAlreadyLoaded) {
      onComplete?.();
      window.dispatchEvent(new Event("jrk:loader-complete"));
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem(SESSION_KEY, "true");
          onComplete?.();
          window.dispatchEvent(new Event("jrk:loader-complete"));
        }, 150);
      }
    };

    const rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [isAlreadyLoaded, onComplete]);

  if (isAlreadyLoaded || isFinished) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0d4c3c] select-none"
        >
          {/* Identity Wordmark */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7ba05b]">
              INITIALIZING SYSTEM
            </span>
            <span className="text-xl font-bold tracking-tight text-[#f4f1eb] sm:text-2xl">
              Jayanth Reddy Konda
            </span>
          </div>

          {/* Minimal 1px Progress Track */}
          <div className="mt-8 h-[1px] w-48 overflow-hidden bg-white/10 sm:w-64">
            <div
              className="h-full bg-[#7ba05b] transition-all duration-75 ease-out shadow-[0_0_8px_#7ba05b]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <span className="mt-3 font-mono text-[11px] tabular-nums tracking-[0.3em] text-[#f4f1eb]/40">
            {String(progress).padStart(3, "0")}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialLoader;
