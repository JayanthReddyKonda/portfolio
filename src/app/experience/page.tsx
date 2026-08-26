import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience, Academics & Leadership",
  description:
    "IBM SkillsBuild AI/ML Trainee experience, VNR VJIET B.Tech Computer Science AI & ML (9.1 CGPA), Stanford Machine Learning Specialization, and Krithomedh AI Club leadership.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 min-h-screen">
      <ExperienceSection />
    </main>
  );
}
