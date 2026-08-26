/**
 * @file skills.ts
 * @description Technical competency matrix, 3D sticker badges, and academic metrics.
 */

import type { SkillItem, StickerBadge, ImpactMetric } from "@/types/skills";
import { STICKER_BADGES } from "./stickerImages";

export const SKILLS_TAXONOMY: SkillItem[] = [
  { label: "AI & Vector RAG", desc: "LangChain LCEL, Qdrant, Gemini 2.0 Flash, Tavily" },
  { label: "FastAPI & Microservices", desc: "Async Python, REST APIs, WebSockets, JWT" },
  { label: "Biometrics & Computer Vision", desc: "DeepFace, RetinaFace, AES-256 Facial Embeddings" },
  { label: "Real-Time Streaming", desc: "Socket.IO, Redis Caching, Rate Limiting, Event Queues" },
  { label: "Container Orchestration", desc: "Docker Compose, 5-Service Stacks, Linux, n8n" },
  { label: "Data & ML Pipelines", desc: "PostgreSQL, MySQL, SQLAlchemy ORM, TensorFlow, Scikit-Learn" },
];

export const STICKERS: StickerBadge[] = [
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI / Deep Learning",
    image: STICKER_BADGES.pytorch,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Async Backend",
    image: STICKER_BADGES.fastapi,
  },
  {
    id: "docker",
    name: "Docker & K8s",
    category: "Cloud & Ops",
    image: STICKER_BADGES.docker,
  },
  {
    id: "qdrant",
    name: "Qdrant Vector DB",
    category: "Vector Search",
    image: STICKER_BADGES.qdrant,
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "React 19 / Turbopack",
    image: STICKER_BADGES.nextjs,
  },
  {
    id: "cuda",
    name: "CUDA & Tensor",
    category: "GPU Parallelism",
    image: STICKER_BADGES.cuda,
  },
];

export const IMPACT_METRICS: ImpactMetric[] = [
  { value: "9.1", label: "B.Tech CGPA", detail: "VNR VJIET (AI & ML)" },
  { value: "1,000+", label: "Concurrent Streams", detail: "Sub-200ms WebSocket capacity" },
  { value: "500+", label: "Hackathon Devs", detail: "Organized AI Week & Kaggle ML" },
  { value: "300+", label: "DSA Solved", detail: "LeetCode & Codeforces" },
];

