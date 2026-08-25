"use client";

import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { TerminalWidget } from "@/components/ui/TerminalWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ButterflyDrift } from "@/components/ui/ButterflyDrift";
import { SectionTransition } from "@/components/ui/PixelSectionTransition";
import { RippleTransition } from "@/components/ui/RippleTransition";
import { InitialLoader } from "@/components/ui/InitialLoader";
import { Footer } from "@/components/ui/Footer";
import { SceneMount } from "@/components/three/SceneMount";

export default function Home() {
  return (
    <>
      <InitialLoader
        onComplete={() => {
          if (typeof window !== "undefined") {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              ScrollTrigger.refresh();
            });
          }
        }}
      />
      <RippleTransition />
      <ButterflyDrift
        background="#030303"
        baseColor="#00E5FF"
        accentColor="#10B981"
        density={20}
        size={54}
        speed={28}
        flap={40}
        wander={35}
        hover={160}
        reach={30}
        vignette={40}
      />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10 main-scroll-container">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <section id="terminal" className="relative">
          <div className="px-6 py-24 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
              04 — Interactive CLI Diagnostics
            </span>
            <span className="font-mono text-xs text-emerald-400">
              ● Node Online
            </span>
          </div>
          <TerminalWidget />
          </div>
          <SectionTransition />
        </section>
        {/* Footer inside <main> keeps the terminal → contact flow contiguous. */}
        <Footer />
      </main>
      <SceneMount />
    </>
  );
}
