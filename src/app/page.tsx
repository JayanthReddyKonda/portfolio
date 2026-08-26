"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { InitialLoader } from "@/components/core/InitialLoader";
import { SceneMount } from "@/components/three/SceneMount";

export default function Home() {
  return (
    <>
      <InitialLoader />
      <main className="relative z-10 min-h-screen">
        <HeroSection />
      </main>
      <SceneMount />
    </>
  );
}
