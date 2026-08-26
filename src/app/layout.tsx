import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/core/Navbar";
import { CustomCursor } from "@/components/core/CustomCursor";
import { ButterflyDrift } from "@/components/webgl/ButterflyDrift";

export const metadata: Metadata = {
  title: "Portfolio JRK",
  description:
    "Portfolio of Jayanth Reddy Konda: AI/ML Systems Engineer specializing in FastAPI, Vector RAG (Qdrant), Distributed Microservices, and Biometric Vision.",
  keywords: [
    "Jayanth Reddy Konda",
    "AI/ML Engineer",
    "FastAPI",
    "PostgreSQL",
    "Qdrant",
    "LangChain",
    "Distributed Systems",
    "Portfolio",
  ],
  authors: [{ name: "Jayanth Reddy Konda", url: "https://github.com/JayanthReddyKonda" }],
  openGraph: {
    title: "Jayanth Reddy Konda — AI/ML Systems & Backend Architect",
    description: "Architecting intelligent platforms with FastAPI, Qdrant Vector RAG, and Distributed Real-Time Microservices.",
    url: "https://github.com/JayanthReddyKonda",
    siteName: "Jayanth Reddy Konda Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4c3c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-[#7ba05b] selection:text-[#0d4c3c]">
        <ButterflyDrift
          background="#0d4c3c"
          baseColor="#7ba05b"
          accentColor="#a4c982"
          density={18}
          size={50}
          speed={24}
          flap={36}
          wander={30}
          hover={140}
          reach={25}
          vignette={40}
        />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
