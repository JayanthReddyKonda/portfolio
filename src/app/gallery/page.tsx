import type { Metadata } from "next";
import { GallerySection } from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "3D Architecture Gallery Tunnel",
  description:
    "Interactive 3D WebGL corridor tunnel showcasing vector system blueprints, microservices architectures, and distributed streaming topologies.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <GallerySection />
    </main>
  );
}
