import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayanth Reddy Konda — AI/ML Systems & Backend Architect",
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
  themeColor: "#222831",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-[#00ADB5] selection:text-black">
        {children}
      </body>
    </html>
  );
}
