"use client";

import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { GallerySection } from "@/components/ui/GallerySection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { TerminalWidget } from "@/components/ui/TerminalWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ButterflyDrift } from "@/components/ui/ButterflyDrift";
import { PixelSectionTransition } from "@/components/ui/PixelSectionTransition";
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
      <PixelSectionTransition />
      <RippleTransition />
      <ButterflyDrift
        background="#1c2129"
        baseColor="#00ADB5"
        accentColor="#00ADB5"
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
        <GallerySection />
        <ExperienceSection />
        <section
          id="terminal"
          data-st-03="20"
          data-st-spread="5"
          className="relative"
        >
          <div className="px-6 py-16 sm:py-20 sm:px-10 lg:px-16 max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
                04 — Interactive CLI Diagnostics
              </span>
              <span className="font-mono text-xs text-[#00ADB5]">
                ● Node Online
              </span>
            </div>
            <TerminalWidget />
          </div>
        </section>
        {/* Footer inside <main> keeps the terminal → contact flow contiguous. */}
        <Footer />
      </main>
      <SceneMount />
    </>
  );
}
