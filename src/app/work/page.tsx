import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Production Systems & Architecture",
  description:
    "Verified production case studies: Corporate Credit Underwriting Platform, High-Throughput Market Anomaly Engine, Patient Monitoring Architecture, and Biometric Vision.",
  alternates: {
    canonical: "/work",
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <ProjectsSection />
    </main>
  );
}
