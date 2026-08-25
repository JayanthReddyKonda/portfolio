"use client";

import dynamic from "next/dynamic";

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
