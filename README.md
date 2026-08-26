# Jayanth Reddy Konda — Production Portfolio Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An award-winning, production-grade interactive engineering portfolio for **Jayanth Reddy Konda** — AI/ML Systems Engineer & Backend Architect. Features horizontal 3D stage sliding transitions with native View Transitions API integration, an interactive 3D WebGL Avatar rig, infinite 3D architecture gallery corridor, 3D bilinear skinning sticker peel deck, and a real-time developer CLI diagnostics terminal.

---

## 🌐 Live Transmission & Channels
- **GitHub**: [github.com/JayanthReddyKonda](https://github.com/JayanthReddyKonda)
- **LinkedIn**: [linkedin.com/in/jayanthreddykonda](https://www.linkedin.com/in/jayanthreddykonda/)
- **Email**: [kondajayanthreddy@gmail.com](mailto:kondajayanthreddy@gmail.com)
- **Phone**: [+91 7036086060](tel:+917036086060)
- **Location**: Hyderabad, Telangana, India (UTC+5:30)

---

## 🏛️ Production-Grade Project Architecture

```
src/
├── app/                           # Next.js App Router (16.3.2)
│   ├── layout.tsx                 # Root layout with metadata, cursor & particles
│   ├── template.tsx               # Per-route 3D stage transition boundary
│   ├── page.tsx                   # Stage: Overview / 3D Avatar Hero
│   ├── globals.css                # Obsidian & Teal design tokens + View Transitions
│   ├── about/page.tsx             # Stage: Profile & Neural ASCII Matrix
│   ├── work/page.tsx              # Stage: Production Systems & Benchmarks
│   ├── gallery/page.tsx           # Stage: 3D Architecture Gallery Tunnel
│   ├── experience/page.tsx        # Stage: IBM Experience & Stanford Credentials
│   ├── skills/page.tsx            # Stage: 3D Sticker Peel Deck & Live CLI
│   ├── contact/page.tsx           # Stage: Direct Outreach & Transmission Lines
│   ├── projects/page.tsx          # Route Alias -> /work
│   └── terminal/page.tsx          # Route Alias -> /skills
│
├── components/
│   ├── core/                      # Atomic UI Primitives
│   │   ├── Navbar.tsx             # Floating capsule navbar with JRK LiquidCarve button
│   │   ├── CustomCursor.tsx       # Kinetic spring cursor with dynamic page telemetry
│   │   ├── InitialLoader.tsx      # Session-gated system bootloader (runs strictly once)
│   │   ├── LiquidCarveButton.tsx  # Physical glass refraction action button
│   │   ├── Typewriter.tsx         # Kinetic typewriter subheading
│   │   └── PageTransition.tsx     # Horizontal 3D stage slide & cyber shutter wipe
│   │
│   ├── sections/                  # Discrete Page Section Orchestrators
│   │   ├── HeroSection.tsx        # Overview hero narrative & quick-action triggers
│   │   ├── AboutSection.tsx       # Technical foundation & ASCII face reveal
│   │   ├── ProjectsSection.tsx    # 4 Verified production architectures with metrics
│   │   ├── GallerySection.tsx     # 3D infinite corridor viewer section
│   │   ├── ExperienceSection.tsx  # IBM experience, VNR VJIET & Stanford certifications
│   │   ├── SkillsSection.tsx      # Unified 3D sticker deck & CLI terminal lab
│   │   └── ContactSection.tsx     # Direct contact channels & metadata footer
│   │
│   ├── webgl/                     # Canvas & WebGL Interactive Shaders
│   │   ├── AsciiReveal.tsx        # Neural ASCII matrix with cursor/touch mask
│   │   ├── StickerPeel.tsx        # 3D Bilinear skinning sticker peel deck
│   │   ├── GalleryTunnel.tsx      # Infinite WebGL corridor tunnel with acceleration
│   │   └── ButterflyDrift.tsx     # GPU procedural butterfly particle swarm
│   │
│   ├── three/                     # React Three Fiber 3D Scene Components
│   │   ├── SceneMount.tsx         # Dynamic SSR client boundary
│   │   ├── Scene.tsx              # Three.js canvas setup & fog rendering
│   │   ├── Character.tsx          # 3D Avatar rigging & bone parallax
│   │   ├── CameraController.tsx   # Dynamic mouse-tracking camera controller
│   │   └── EnvironmentSetup.tsx   # Cinematic 3-point lighting rig
│   │
│   └── terminal/                  # CLI Diagnostics Subsystem
│       └── TerminalWidget.tsx     # Live keyboard-driven terminal emulator
│
├── data/                          # Typed Static Content & Metadata
│   ├── projects.ts                # Verified architecture specs & benchmarks
│   ├── skills.ts                  # Technical taxonomy, stickers & impact metrics
│   ├── experience.ts              # IBM, VNR VJIET & Stanford records
│   ├── galleryImages.ts           # Vector SVG architecture blueprints
│   └── stickerImages.ts           # Vector SVG sticker badges (PyTorch, FastAPI, etc.)
│
├── types/                         # Global TypeScript Schemas & Interfaces
│   ├── project.ts                 # Project interfaces & benchmarks schema
│   ├── skills.ts                  # Sticker & skill taxonomy types
│   ├── experience.ts              # Experience & academic record types
│   └── terminal.ts                # Command log & parser interfaces
│
└── lib/                           # Shared Utilities
    └── utils.ts                   # Class name merger & animation ease curves
```

---

## ⚡ Core Technical Capabilities

### 1. Native View Transitions API & Horizontal 3D Stage Slide
- **Compositor-Level Morphs**: Triggered via `document.startViewTransition()` for smooth 60fps transitions.
- **Horizontal Cyber Shutter**: 4 horizontal shutter bands cascade across the viewport with vertical cyan laser guides.
- **3D Perspective Unfold**: Hardware-accelerated GPU transforms (`x: 50px -> 0`, `rotateY: -3deg -> 0`, `scale: 0.98 -> 1`, cubic-bezier `[0.16, 1, 0.3, 1]`).
- **Live Transmission HUD**: Telemetry badge flashes destination stage in transit.

### 2. 3D WebGL Avatar Rig (`src/components/three/`)
- **Skeletal Cursor Parallax**: Smooth bone rotation (`mixamorigNeck`, `mixamorigHead`) with exponential decay smoothing (`LOOK_DAMPING = 4.5`).
- **Dynamic Framing**: Clamped viewport positioning that renders cleanly on Overview `/` and stays responsive on mobile.

### 3. 3D Bilinear Skinning Sticker Deck (`src/components/webgl/StickerPeel.tsx`)
- Physical mesh peeling simulation running in WebGL with dynamic specular highlights and shadow projection.

### 4. Infinite WebGL Architecture Gallery Tunnel (`src/components/webgl/GalleryTunnel.tsx`)
- 3D infinite corridor displaying local vector SVG system blueprints with drag-and-hold acceleration boost.

### 5. Interactive CLI Diagnostics Terminal (`src/components/terminal/TerminalWidget.tsx`)
- Live keyboard-driven terminal emulator with command history, tab completion, and instant quick-action execution.

---

## 🛠️ Verification & Build Commands

```bash
# Run Development Server (Turbopack)
npm run dev

# Run Production Linter (Strict React Compiler & TypeScript)
npm run lint

# Build Static Optimized Production Bundle (12/12 Prerendered Pages)
npm run build

# Start Production Server
npm start
```

---

## 📜 License
MIT © [Jayanth Reddy Konda](https://github.com/JayanthReddyKonda)
