"use client";

import dynamic from "next/dynamic";

/**
 * Suppress the noisy `THREE.Clock: This module has been deprecated`
 * warning emitted by drei's internal animation helpers. Guarded by a window
 * flag so HMR / double module evaluation never stacks filter wrappers.
 */
if (typeof window !== "undefined") {
  const w = window as typeof window & { __threeClockWarnPatched?: boolean };
  if (!w.__threeClockWarnPatched) {
    w.__threeClockWarnPatched = true;
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock: This module has been deprecated")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };
  }
}

/**
 * Client-only mount gate for the 3D scene.
 *
 * Next.js rule: `ssr: false` is only allowed inside Client Components —
 * this file is the boundary. Three.js never enters the server bundle or
 * the initial hydration cost; it streams in after first paint.
 */
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneMount() {
  return <Scene />;
}

export default SceneMount;
