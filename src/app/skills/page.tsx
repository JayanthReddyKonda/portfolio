import type { Metadata } from "next";
import { SkillsSection } from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "Skills Lab & CLI Diagnostics",
  description:
    "Interactive 3D WebGL sticker peel deck (PyTorch, FastAPI, Docker, Qdrant) and live browser-based developer CLI terminal emulator.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SkillsSection />
    </main>
  );
}
