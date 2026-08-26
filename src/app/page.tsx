"use client";

import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { AboutSection } from "@/components/ui/AboutSection";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { GallerySection } from "@/components/ui/GallerySection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { SkillsDiagnosticsSection } from "@/components/ui/SkillsDiagnosticsSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ButterflyDrift } from "@/components/ui/ButterflyDrift";
import { InitialLoader } from "@/components/ui/InitialLoader";
import { Footer } from "@/components/ui/Footer";
import { SceneMount } from "@/components/three/SceneMount";

export default function Home() {
  return (
    <>
      <InitialLoader />
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
        <SkillsDiagnosticsSection />
        {/* Footer inside <main> keeps the terminal → contact flow contiguous. */}
        <Footer />
      </main>
      <SceneMount />
    </>
  );
}
