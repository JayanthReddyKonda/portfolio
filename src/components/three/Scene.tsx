"use client";

/**
 * @file Scene.tsx
 * @description Ultra-Fast 3D WebGL Canvas and Avatar Staging Rig.
 * Features:
 * - Dynamic viewport-based scale and clamped positioning
 * - Three-point studio lighting & ambient environment reflections
 * - Smooth scroll-driven dissolve (pauses Three.js rendering when scrolled past hero)
 * - Lightweight zero-CPU hardware-accelerated ambient cyber grid
 */

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentSetup } from "./EnvironmentSetup";
import { Character } from "./Character";
import { CameraController } from "./CameraController";

/** Model height constant derived from GLB bounding box metrics */
const MODEL_HEIGHT = 1.806;

/**
 * AvatarRig positions and scales the 3D character precisely across responsive viewports.
 * Clamps horizontal positioning to avoid pushing the model onto screen edges on ultrawide displays.
 */
function AvatarRig() {
  const viewport = useThree((state) => state.viewport);
  const isNarrow = viewport.aspect < 1;

  if (isNarrow) {
    // Mobile / Portrait view: centered, lowered below hero typography
    const depthFactor = 10 / 7;
    const planeHeight = viewport.height * depthFactor;
    const scale = (planeHeight * 0.36) / MODEL_HEIGHT;
    const feetY = 0.4 - planeHeight / 2 - planeHeight * 0.30;
    return (
      <group position={[0, feetY, -3]}>
        <Character rotation-y={0.05} scale={scale} />
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.55 * scale, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.6} />
        </mesh>
      </group>
    );
  }

  // Desktop view: clamped to the right third of the hero frame
  const scale = (viewport.height * 0.72) / MODEL_HEIGHT;
  const feetY = 0.4 - viewport.height / 2 + viewport.height * 0.08;
  const posX = Math.min(viewport.width * 0.20, 2.1);

  return (
    <group position={[posX, feetY, 0]}>
      <Character rotation-y={-0.18} scale={scale} />
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.65, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Scene Layer:
 * Mounts behind DOM content at -z-10.
 * Orchestrates ambient background grid and the 3D WebGL hero canvas.
 */
export default function Scene() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  // Phones get a tighter DPR budget: same look, half the fragment work.
  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth < 768;
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!canvasContainerRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.85;
      const opacity = Math.max(0, Math.min(1, 1 - scrollY / heroHeight));
      canvasContainerRef.current.style.opacity = opacity.toFixed(3);
      canvasContainerRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";

      // Gate the render loop instead of unmounting: destroying the Canvas
      // would tear down and recreate the WebGL context on every hero exit.
      const visible = scrollY < window.innerHeight * 1.2;
      setIsHeroVisible((prev) => (prev === visible ? prev : visible));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
    >
      {/* 3D WebGL Canvas Layer (Active only while hero is visible) */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 size-full transition-opacity duration-300 ease-out"
      >
        {/*
          Canvas stays mounted for the whole session; frameloop="never" halts
          the RAF loop once the hero is out of view (zero GPU/CPU draw calls)
          without the cost of destroying/recreating the WebGL context.
        */}
        <Canvas
          dpr={[1, isSmallScreen ? 1.2 : 1.5]}
          camera={{ position: [0, 0.4, 7], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          shadows={false}
          frameloop={isHeroVisible ? "always" : "never"}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
          eventPrefix="client"
        >
          <Suspense fallback={null}>
            <EnvironmentSetup />
            <AvatarRig />
            <CameraController />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export { Scene };
