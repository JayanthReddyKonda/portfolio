import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About & Technical Matrix",
  description:
    "Explore the technical foundation, impact metrics (9.1 CGPA, 1000+ streams), and neural ASCII scan of Jayanth Reddy Konda — AI/ML Engineer.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <AboutSection />
    </main>
  );
}
