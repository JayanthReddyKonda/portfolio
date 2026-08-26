/**
 * @file projects.ts
 * @description Verified production-grade architectures and engineering projects.
 */

import type { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    id: "credit-intelligence",
    title: "AI-Powered Corporate Credit Intelligence Platform",
    tagline: "Autonomous Underwriting & CAM Generation Engine",
    category: "Financial AI & Vector RAG",
    description:
      "A containerized corporate underwriting platform orchestrating a 5-service Docker Compose stack with async-to-thread offloading across endpoints for case intake, financial document parsing, and automated credit scoring.",
    metrics: [
      { label: "Architecture", value: "5-Service Docker Stack" },
      { label: "Risk Classification", value: "20+ Dynamic Findings" },
      { label: "Semantic RAG", value: "Gemini 2.0 + Qdrant" },
      { label: "Integrations", value: "MCA, GSTN, eCourts APIs" },
    ],
    tags: ["FastAPI", "React 19", "PostgreSQL", "Qdrant", "LangChain LCEL", "Gemini 2.0 Flash", "Tavily", "pdfplumber", "Docker Compose"],
    highlights: [
      "Engineered credit scoring engine analyzing financial docs via pdfplumber with GST-bank mismatch anomaly detection.",
      "Implemented a RAG research pipeline using Tavily and Qdrant semantic retrieval with Gemini 2.0 Flash embeddings for CAM reports with full evidence lineage.",
      "Built an Analyst Copilot using LangChain LCEL with RunnableParallel for concurrent Gemini inference, integrating MCA, GSTN, and eCourts APIs.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "market-intelligence",
    title: "Real-Time Financial Market Intelligence Platform",
    tagline: "Streaming Anomaly Detection & News Synthesis",
    category: "Distributed Streaming & WebSockets",
    description:
      "A high-throughput streaming intelligence platform detecting anomalous stock movements across 50+ NSE/BSE tickers, processing distributed market data pipelines using rolling Z-score anomaly detection at 60-second intervals.",
    metrics: [
      { label: "Concurrency", value: "1,000+ WebSocket Streams" },
      { label: "Latency", value: "Sub-200ms API Response" },
      { label: "Coverage", value: "50+ NSE/BSE Tickers" },
      { label: "Event Pipeline", value: "500+ Daily Filings Explained" },
    ],
    tags: ["FastAPI", "PostgreSQL", "WebSockets", "spaCy", "Python AsyncIO", "Docker", "NLP", "Pandas"],
    highlights: [
      "Engineered a scalable microservices-based backend using asynchronous FastAPI services and PostgreSQL exposing REST APIs and WebSocket streams.",
      "Implemented a two-stage event analysis pipeline for financial news and filings using spaCy entity filtering and deterministic search.",
      "Synthesizes natural language explanations for 500+ daily market events with automated anomaly alerting.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "patient-recovery",
    title: "AI-Powered Patient Recovery Monitoring System",
    tagline: "Clinical Trend Analytics & Real-Time SOS Escalation",
    category: "Healthcare AI & Event Streaming",
    description:
      "A containerized healthcare platform using asynchronous FastAPI backend and React frontend, enabling doctors to track vital recovery metrics and orchestrate real-time messaging for 1,000+ patients.",
    metrics: [
      { label: "Latency Drop", value: "40% via Redis Caching" },
      { label: "Webhooks", value: "500+ Concurrent Events" },
      { label: "Messaging", value: "Socket.IO for 1,000+ Patients" },
      { label: "Alert Dispatch", value: "WhatsApp & SMTP SOS" },
    ],
    tags: ["FastAPI", "React", "PostgreSQL", "Redis", "Socket.IO", "SQLAlchemy ORM", "JWT", "WhatsApp API"],
    highlights: [
      "Engineered PostgreSQL APIs with SQLAlchemy ORM, integrating Redis-backed rate limiting and AI response caching to reduce latency by 40%.",
      "Asynchronously processes 500+ concurrent webhook events with secure token-based authentication.",
      "Implemented an escalation engine leveraging LLMs to parse symptom logs, synthesize clinical trends, and trigger automated SOS workflows.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
  {
    id: "face-auth",
    title: "Multi-Factor Face Authentication + Secure Notes System",
    tagline: "Biometric Facial Recognition & Encrypted Vault",
    category: "Computer Vision & Cryptographic Security",
    description:
      "An advanced biometric security system combining password verification with live facial recognition using DeepFace and RetinaFace, exposing JWT-secured REST APIs for user authentication and encrypted note storage.",
    metrics: [
      { label: "Encryption", value: "AES-256 Facial Embeddings" },
      { label: "Throughput", value: "1,000 Concurrent Sessions" },
      { label: "Vision Models", value: "DeepFace + RetinaFace" },
      { label: "Security", value: "bcrypt + JWT State Management" },
    ],
    tags: ["Flask", "DeepFace", "RetinaFace", "PostgreSQL", "Docker Compose", "AES-256", "bcrypt", "JWT", "Python"],
    highlights: [
      "Architected a biometric authentication system combining password verification with live facial recognition via DeepFace & RetinaFace.",
      "Designed PostgreSQL system storing AES-256 encrypted facial embeddings and user records with bcrypt password hashing.",
      "Containerized multi-service architecture with Docker Compose and optimized threaded Flask services to support up to 1,000 concurrent sessions.",
    ],
    github: "https://github.com/JayanthReddyKonda",
  },
];

