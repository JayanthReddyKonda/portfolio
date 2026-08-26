"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

/**
 * Suppress the noisy `THREE.Clock: This module has been deprecated`
 * warning emitted by drei's internal animation helpers.
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

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const emptySubscribe = () => () => {};

export function SceneMount() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) return null;
  return <Scene />;
}

export default SceneMount;
