# Jayanth Reddy Konda — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?logo=greensock)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An award-winning, state-of-the-art interactive portfolio for **Jayanth Reddy Konda** — AI/ML Systems Engineer & Backend Architect. Features an interactive 3D avatar rig, GSAP pixelated grid transitions, Originkit butterfly shader swarm, real-time ASCII face reveal canvas, interactive CLI diagnostics terminal, and deep architectural case studies.

---

## Live Profile & Channels
- **GitHub**: [github.com/JayanthReddyKonda](https://github.com/JayanthReddyKonda)
- **LinkedIn**: [linkedin.com/in/jayanthreddykonda](https://www.linkedin.com/in/jayanthreddykonda/)
- **Email**: [kondajayanthreddy@gmail.com](mailto:kondajayanthreddy@gmail.com)
- **Location**: Hyderabad, Telangana, India

---

## Key Features & Architecture

### 1. 3D WebGL Avatar Engine (`src/components/three/`)
- **Real-Time Skeletal Cursor Parallax**: Tracks pointer movement to rotate neck (`mixamorigNeck`) and head (`mixamorigHead`) bones with exponential decay smoothing (`LOOK_DAMPING = 4.5`).
- **Animation Crossfading**: Dedicated Three.js `AnimationMixer` orchestrating smooth animation clips with React 19 compiler immutability compliance.
- **Dynamic Framing & Scroll Dissolve**: Viewport-clamped positioning (`Math.min(viewport.width * 0.20, 2.1)`) that dissolves smoothly into deep content sections without obscuring text.

### 2. "Spiral Veil" CSS Section Transitions (`src/components/ui/PixelSectionTransition.tsx`)
- Crossing any section boundary scrubs a two-tone clip-path collapse (a rotating dark square over a closing grey iris) — driven purely by a CSS custom property and paused keyframes, no JS animation loop, fully reversible, reduced-motion aware.

### 2b. Touch-Reveal ASCII Portrait (`src/components/ui/AsciiReveal.tsx`)
- The ASCII face reveal responds to both hover **and** touch: pressing and dragging a finger drives the multi-blob reveal (`pointerdown` capture + `touch-action: none`), and lifting off triggers a graceful 450ms dissolve back to the ASCII matrix instead of a hard snap.

### 3. Originkit Butterfly Drift Background (`src/components/ui/ButterflyDrift.tsx`)
- **GPU Procedural Swarm**: Pure WebGL shader-based butterfly flock drifting organically behind all sections.
- **Interactive Cursor Physics**: Wing flap frequency, cruise speed, and repel thrust respond dynamically to pointer velocity.

### 4. Shockwave Ripple Navigation Teleporter (`src/components/ui/RippleTransition.tsx`)
- Intercepts anchor navigation (`#about`, `#work`, `#experience`, `#terminal`, `#contact`) and creates expanding radial shockwaves from click coordinates with smooth glide transitions.

### 5. Originkit ASCII Face Reveal Engine (`src/components/ui/AsciiReveal.tsx`)
- High-density ASCII matrix sampling source pixels in real-time.
- Multi-blob spring physics cursor tracking that organically dissolves matrix characters to reveal high-definition portraits with gaussian softness blending.

### 6. Interactive Developer CLI Terminal (`src/components/ui/TerminalWidget.tsx`)
- Live terminal session (`jayanth@engine-room:~`) supporting tab history, arrow navigation, and rich formatted outputs for:
  - `projects` — Deep-dive summary of 4 production systems
  - `skills` — Languages, Backend, Vector DBs, ML & Infra
  - `education` — VNR VJIET (CGPA: 9.1 / 10.0), Intermediate (93%), Matriculation (97.2%)
  - `experience` — IBM SkillsBuild AI/ML Trainee & Krithomedh Club
  - `certifications` — Stanford University & DeepLearning.AI ML Specialization
  - `contact` — Direct transmission channels
  - `help` / `clear` — Diagnostic utilities

### 7. Production AI & Distributed Systems Showcase (`src/components/ui/ProjectsSection.tsx`)
1. **AI-Powered Corporate Credit Intelligence Platform** (FastAPI, React 19, PostgreSQL, Qdrant, Gemini 2.0 Flash, LangChain LCEL)
2. **Real-Time Financial Market Intelligence Platform** (FastAPI, WebSockets, PostgreSQL, rolling Z-score, spaCy, 50+ Tickers)
3. **AI-Powered Patient Recovery Monitoring System** (FastAPI, React, Redis, Socket.IO, WhatsApp API)
4. **Multi-Factor Face Authentication + Secure Notes System** (Flask, DeepFace, RetinaFace, AES-256, PostgreSQL)

### 8. Performance & Reliability Engineering (v1.2.0 Full System Audit)
- **Scoped GSAP contexts only** — no global `ScrollTrigger.kill()` anywhere; every GSAP system (pixel transitions, camera rig) owns its triggers via `gsap.context` / `useGSAP`.
- **Loader-aware initialization** — scroll-position-dependent systems wait for the `jrk:loader-complete` event instead of arbitrary timeouts, so GSAP never measures a scroll-locked page.
- **WebGL context preservation** — the 3D canvas stays mounted and gates its render loop (`frameloop="never"`) when the hero is off-screen: zero draw calls, zero context churn.
- **Shader swarm lifecycle** — butterfly background suspends on tab hide and renders a single static frame under `prefers-reduced-motion`.
- **rAF-throttled scroll handlers** — cursor section detection coalesces layout reads to one pass per frame.
- **Reduced-motion respected everywhere** — loader, reveals, transitions, swarm, and avatar all collapse under `prefers-reduced-motion`.

### 9. Responsive & Touch Engineering (v1.2.0)
- **Mobile viewport units** — sections use `min-h-svh` / `100svh` so heights track the mobile URL-bar viewport (no jump-on-scroll); `vh` fallbacks retained.
- **iOS input zoom prevented** — the CLI terminal prompt renders at ≥16px on touch (`text-base sm:text-xs`).
- **44px touch targets** — navbar menu toggle and resume button meet touch-target minimums on mobile; desktop sizes preserved via `sm:` overrides.
- **Adaptive GPU budgets** — 3D avatar DPR clamps to 1.2 below 768px; butterfly swarm density halves below 768px.
- **Fluid typography** — hero display type uses a safe `clamp(2.6rem, 9vw, 6.5rem)` floor; eyebrow pills wrap instead of overflowing at 320px.
- **Layout stacking verified** — About/Projects/Experience bento grids collapse to single-column below `lg`; metrics run `2-col → sm:4-col`; hero CTAs wrap; footer rhythm tightens on mobile.
- **Touch semantics** — custom cursor disabled on coarse pointers and below `md`; tap highlight suppressed globally; all hover effects have non-hover-safe fallbacks.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | `16.3.2` | Core SSR/SSG & routing engine |
| **UI Library** | React | `19.2.8` | Component rendering & state |
| **Compiler** | React Compiler (`babel-plugin-react-compiler`) | `1.0.0` | Automatic memoization & immutability |
| **3D Rendering** | Three.js + React Three Fiber + Drei | `0.185.1` / `9.7.0` | WebGL 3D scene & GLTF character rig |
| **Animations** | Motion (Framer Motion) + GSAP ScrollTrigger | `13.1.1` / `3.15.0` | Choreographed transitions & parallax |
| **Styling** | Tailwind CSS | `v4` | High-performance atomic styling |
| **Icons** | Lucide React | `1.34.0` | Vector icon system |
| **Typography** | Geist Sans + Geist Mono | `next/font` | Display and monospace typefaces |

---

## Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/JayanthReddyKonda/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting
```bash
# Type check without emitting
npx tsc --noEmit

# Optimized production build
npm run build

# Strict ESLint check
npm run lint
```

---

## License
MIT © Jayanth Reddy Konda
