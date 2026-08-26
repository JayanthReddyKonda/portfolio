import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/core/Navbar";
import { CustomCursor } from "@/components/core/CustomCursor";
import { ButterflyDrift } from "@/components/webgl/ButterflyDrift";

const SITE_URL = "https://jayanthreddykonda.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jayanth Reddy Konda — AI/ML Systems & Distributed Backend Architect",
    template: "%s | Jayanth Reddy Konda",
  },
  description:
    "Production portfolio of Jayanth Reddy Konda. AI/ML Systems Engineer & Distributed Backend Architect specializing in FastAPI, Qdrant Vector RAG, real-time WebSockets, PyTorch, and cloud microservices.",
  keywords: [
    "Jayanth Reddy Konda",
    "JRK",
    "AI/ML Engineer",
    "Backend Architect",
    "FastAPI",
    "Qdrant Vector Database",
    "Vector RAG",
    "LangChain LCEL",
    "PyTorch",
    "PostgreSQL",
    "Docker",
    "Distributed Systems",
    "Machine Learning",
    "Hyderabad Engineer",
    "VNR VJIET",
  ],
  authors: [{ name: "Jayanth Reddy Konda", url: "https://github.com/JayanthReddyKonda" }],
  creator: "Jayanth Reddy Konda",
  publisher: "Jayanth Reddy Konda",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jayanth Reddy Konda — AI/ML Systems & Distributed Backend Architect",
    description:
      "Architecting intelligent platforms with FastAPI, Qdrant Vector RAG, PyTorch deep learning, and real-time distributed microservices.",
    url: SITE_URL,
    siteName: "Jayanth Reddy Konda Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/ascii_profile.png",
        width: 1200,
        height: 630,
        alt: "Jayanth Reddy Konda — AI/ML Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayanth Reddy Konda — AI/ML Systems & Distributed Backend Architect",
    description:
      "Architecting intelligent platforms with FastAPI, Qdrant Vector RAG, and distributed microservices.",
    creator: "@JayanthReddyKonda",
    images: ["/images/ascii_profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0d4c3c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const JSON_LD_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jayanth Reddy Konda",
      alternateName: ["JRK", "Jayanth Konda"],
      jobTitle: "AI/ML Systems Engineer & Distributed Backend Architect",
      description:
        "AI/ML Systems Engineer specializing in FastAPI, Vector RAG pipelines, distributed microservices, and biometric systems.",
      url: SITE_URL,
      image: `${SITE_URL}/images/ascii_profile.png`,
      sameAs: [
        "https://github.com/JayanthReddyKonda",
        "https://www.linkedin.com/in/jayanthreddykonda/",
        "mailto:kondajayanthreddy@gmail.com",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "VNR Vignana Jyothi Institute of Engineering and Technology",
        url: "https://vnrvjiet.ac.in",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "FastAPI",
        "Qdrant Vector Database",
        "Retrieval-Augmented Generation (RAG)",
        "PyTorch",
        "PostgreSQL",
        "Docker & Kubernetes",
        "Distributed Systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Jayanth Reddy Konda Portfolio",
      description: "Interactive portfolio of Jayanth Reddy Konda — AI/ML Engineer & Backend Architect.",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
        />
      </head>
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
