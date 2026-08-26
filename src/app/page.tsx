import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { InitialLoader } from "@/components/core/InitialLoader";
import { SceneMount } from "@/components/three/SceneMount";

export const metadata: Metadata = {
  title: "Overview // Command Deck",
  description:
    "Jayanth Reddy Konda — AI/ML Systems Engineer & Distributed Backend Architect. Explore real-time AI microservices, Qdrant Vector RAG, and interactive 3D WebGL architecture.",
  alternates: {
    canonical: "/",
  },
};

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
