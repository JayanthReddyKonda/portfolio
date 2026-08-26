# Jayanth Reddy Konda — Production Portfolio Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An award-winning, production-grade interactive engineering portfolio for **Jayanth Reddy Konda** — AI/ML Systems Engineer & Distributed Backend Architect. Features horizontal spatial stage transitions, an interactive 3D WebGL Avatar rig, infinite 3D architecture gallery corridor, 3D bilinear skinning sticker peel deck with deferred WebGL initialization, and a real-time developer CLI diagnostics terminal.

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
│   ├── template.tsx               # Per-route spatial stage transition boundary
│   ├── page.tsx                   # Stage: Overview / 3D Avatar Hero
│   ├── globals.css                # Emerald Sophistication design tokens & View Transitions
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
│   │   ├── Navbar.tsx             # Floating glass capsule navbar with JRK brand badge
│   │   ├── CustomCursor.tsx       # Kinetic spring cursor with dynamic page telemetry
│   │   ├── InitialLoader.tsx      # Session-gated system bootloader (runs strictly once)
│   │   ├── LabelSlideButton.tsx   # Originkit rolling text & directional vector button
│   │   ├── Typewriter.tsx         # Kinetic typewriter subheading
│   │   └── PageTransition.tsx     # Clean horizontal spatial glide & ambient progress hairline
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
│   │   ├── StickerPeel.tsx        # 3D Bilinear skinning sticker peel deck (Deferred WebGL)
│   │   ├── GalleryTunnel.tsx      # Infinite WebGL corridor tunnel with acceleration
│   │   ├── RoundCarousel.tsx      # 3D Rotating cylinder carousel
│   │   └── ButterflyDrift.tsx     # GPU procedural butterfly particle swarm
│   │
│   ├── three/                     # React Three Fiber 3D Scene Components
│   │   ├── SceneMount.tsx         # Dynamic SSR client boundary
│   │   ├── Scene.tsx              # Three.js canvas setup & studio lighting
│   │   ├── Character.tsx          # 3D Avatar rigging & bone parallax
│   │   ├── CameraController.tsx   # Dynamic camera controller
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

### 1. Native View Transitions & Hardware-Accelerated Spatial Glide
- **Compositor-Level Morphs**: Triggered via `document.startViewTransition()` for fluid page morphs.
- **Horizontal Spatial Glide**: Hardware-accelerated GPU transforms (`x: 36px -> 0`, `opacity: 0 -> 1`, cubic-bezier `[0.16, 1, 0.3, 1]`).
- **Top Ambient Hairline**: Subtle `#7ba05b` progress hairline indicates transition progress.

### 2. Interactive 3D Avatar Hero Canvas
- **Skeletal Look-At Tracking**: Real-time cursor tracking following mixamo neck and head bones.
- **Dynamic Lighting**: Self-contained 3-point key, fill, and rim lighting rig in Emerald palette.

### 3. High-Performance 3D WebGL Sticker Peel Deck
- **Deferred WebGL Context Activation**: Instant 0ms entrance latency with zero dropped frames on initial page navigation; lazily initializes WebGL on pointer interaction or post-transition.
- **Physical 2D Bilinear Skinning**: Realistic fold curvature with dual-face SVG rendering and cast shadow projection.

### 4. Interactive Developer CLI Terminal
- Real system commands (`help`, `projects`, `skills`, `education`, `experience`, `certifications`, `contact`, `clear`).
- History navigation buffer with Up/Down arrow keys.
- Custom event dispatcher for one-click button execution.

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
