import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Direct Contact & Transmission",
  description:
    "Connect with Jayanth Reddy Konda for AI/ML engineering, distributed backend architecture, and collaborative research initiatives.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <ContactSection />
    </main>
  );
}
