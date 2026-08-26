# Portfolio Engineering & Architecture Handoff

**Project**: Interactive Developer Portfolio — Jayanth Reddy Konda  
**Profile**: AI/ML Systems & Distributed Backend Architect (VNR VJIET • CGPA: 9.1)  
**Version**: 3.0.0 (Production-Ready — Emerald Sophistication, Spatial Transitions, LabelSlideButton)  
**Framework**: Next.js 16.3.2 (App Router, Turbopack) • React 19.2.8 • Three.js 0.185.1 • Framer Motion 13.1.1 • Tailwind CSS v4  

---

## 1. Executive Summary

This codebase is a high-performance, production-grade interactive engineering portfolio built to showcase AI/ML architectures, distributed backend platforms, and biometric systems. It integrates real-time WebGL 3D avatar mechanics, procedural GPU shaders, horizontal spatial page transitions with View Transitions API integration, an interactive developer CLI diagnostics terminal, and an Originkit ASCII face reveal canvas.

---

## 2. Directory Structure & File Map

```
portfolio/
├── public/
│   ├── favicon.png               # PNG Favicon for standard browsers
│   ├── icon.png                  # PNG App icon
│   ├── resume.pdf                # Downloadable candidate resume
│   ├── images/
│   │   └── ascii_profile.png     # Source portrait for ASCII neural scan
│   └── models/
│       └── character-transformed.glb # Optimized 3D avatar model
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout, metadata, particle swarm & cursor
│   │   ├── template.tsx          # Per-route spatial stage transition boundary
│   │   ├── page.tsx              # Overview stage (3D Avatar Hero)
│   │   ├── globals.css           # Emerald Sophistication tokens & View Transitions
│   │   ├── about/page.tsx        # Profile & Neural ASCII Matrix
│   │   ├── work/page.tsx         # Production Systems & Benchmarks
│   │   ├── gallery/page.tsx      # 3D Architecture Gallery Tunnel
│   │   ├── experience/page.tsx   # Work experience, education, certifications
│   │   ├── skills/page.tsx       # 3D Sticker Peel Deck & Live CLI Lab
│   │   └── contact/page.tsx      # Direct outreach & transmission lines
│   │
│   ├── components/
│   │   ├── core/                 # Atomic UI Primitives
│   │   │   ├── Navbar.tsx            # Floating glass capsule with JRK brand badge
│   │   │   ├── CustomCursor.tsx      # Kinetic spring cursor with telemetry
│   │   │   ├── InitialLoader.tsx     # Session-gated system bootloader (runs strictly once)
│   │   │   ├── LabelSlideButton.tsx  # Originkit rolling text & directional vector button
│   │   │   ├── Typewriter.tsx        # Kinetic typewriter subheading
│   │   │   └── PageTransition.tsx    # Clean horizontal spatial glide
│   │   │
│   │   ├── sections/             # Stage Viewport Sections
│   │   │   ├── HeroSection.tsx       # Overview hero narrative & quick-action triggers
│   │   │   ├── AboutSection.tsx      # Technical foundation & ASCII face reveal
│   │   │   ├── ProjectsSection.tsx   # 4 Verified production architectures with metrics
│   │   │   ├── GallerySection.tsx    # 3D infinite corridor viewer section
│   │   │   ├── ExperienceSection.tsx # IBM experience, VNR VJIET & Stanford certifications
│   │   │   ├── SkillsSection.tsx     # Unified 3D sticker deck & CLI terminal lab
│   │   │   └── ContactSection.tsx    # Direct contact channels & metadata footer
│   │   │
│   │   ├── webgl/                # Interactive Canvas & WebGL Shaders
│   │   │   ├── AsciiReveal.tsx       # Neural ASCII matrix with cursor/touch mask
│   │   │   ├── StickerPeel.tsx       # 3D Bilinear skinning sticker peel deck (Deferred WebGL)
│   │   │   ├── GalleryTunnel.tsx     # Infinite WebGL corridor tunnel with acceleration
│   │   │   ├── RoundCarousel.tsx     # 3D Rotating cylinder carousel
│   │   │   └── ButterflyDrift.tsx    # GPU procedural butterfly particle swarm
│   │   │
│   │   ├── three/                # React Three Fiber 3D Scene Components
│   │   │   ├── SceneMount.tsx        # Dynamic SSR client boundary
│   │   │   ├── Scene.tsx             # Three.js canvas setup & studio lighting
│   │   │   ├── Character.tsx         # 3D Avatar rigging & bone parallax
│   │   │   ├── CameraController.tsx  # Dynamic camera controller
│   │   │   └── EnvironmentSetup.tsx  # Cinematic 3-point lighting rig
│   │   │
│   │   └── terminal/             # CLI Diagnostics Subsystem
│   │       └── TerminalWidget.tsx    # Live keyboard-driven terminal emulator
│   │
│   ├── data/                     # Typed Static Content & Metadata
│   │   ├── projects.ts           # Architecture specifications & benchmarks
│   │   ├── skills.ts             # Technical taxonomy, stickers & impact metrics
│   │   ├── experience.ts         # IBM, VNR VJIET & Stanford records
│   │   ├── galleryImages.ts      # Vector SVG architecture blueprints
│   │   └── stickerImages.ts      # Vector SVG sticker badges
│   │
│   └── types/                    # Domain TypeScript Schemas
│       ├── project.ts            # Project interfaces & benchmarks schema
│       ├── skills.ts             # Sticker & skill taxonomy types
│       ├── experience.ts         # Experience & academic record types
│       └── terminal.ts           # Command log & parser interfaces
│
├── DESIGN.md                     # Design tokens, color system, typography & spacing rules
├── ARCHITECTURE.md               # Technical architecture & directory organization
├── README.md                     # Getting started guide & feature overview
└── package.json                  # Dependencies, scripts, engine specifications
```

---

## 3. Core Technical Subsystems

### A. Horizontal Spatial Stage Transitions (`PageTransition.tsx`)
- Hardware-accelerated GPU transforms (`x: 36px -> 0`, `opacity: 0 -> 1`, `cubic-bezier(0.16, 1, 0.3, 1)`).
- Native View Transitions API integration via `document.startViewTransition()` in `Navbar.tsx`.
- Subtle top ambient progress hairline (`#7ba05b`).

### B. 3D WebGL Avatar Engine (`src/components/three/`)
- Dynamic SSR client boundary via `SceneMount.tsx` (`ssr: false`).
- Skeletal cursor tracking (`mixamorigNeck`, `mixamorigHead`) with exponential decay smoothing.
- Self-contained 3-point studio lighting calibrated to the Emerald Sophistication palette.

### C. Deferred WebGL 3D Sticker Peel (`src/components/webgl/StickerPeel.tsx`)
- Instant static base layer renders immediately on frame 0, completely eliminating mount lag and blank flashes during route transitions.
- Lazily activates WebGL context on pointer interaction or 380ms post-mount, maintaining 120 FPS navigation.

### D. Scoped Interactive Developer CLI (`src/components/terminal/TerminalWidget.tsx`)
- Container-scoped scroll navigation with history buffer (Up/Down arrow navigation).
- Custom event dispatcher for one-click preset command buttons.

---

## 4. Verification & Quality Assurance (v2.0.0 Final)

| Test / Check | Command | Status |
| :--- | :--- | :---: |
| **Production Compiler** | `npm run build` | ✅ Passed (static prerender `/`) |
| **TypeScript Typecheck** | `npx tsc --noEmit` (also inside build) | ✅ Passed |
| **ESLint Analysis** | `npm run lint` | ✅ Passed (0 errors, 0 warnings) |
| **Dead Code Sweep** | No unused exports, no stale selectors/attrs, no TODO/FIXME markers | ✅ Audited |
| **ScrollTrigger Isolation** | No global kill calls; scoped contexts only | ✅ Audited |
| **Duplicate DOM IDs** | Single `id="terminal"`; unique section ids | ✅ Fixed |
| **Favicon Routes** | Prerendered `/icon.png` & `/favicon.png` | ✅ Verified |

Manual QA checklist before release: full scroll-through at 375 / 768 / 1280 px, keyboard-only nav pass, reduced-motion pass, and visual confirmation of every seam (hero→about→work→experience→terminal→contact).

---

## 5. Maintenance & Future Modifications

1. **Updating Resume**: Replace `/public/resume.pdf`.
2. **Adding/Editing Projects**: Modify `REAL_PROJECTS` in `src/components/ui/ProjectsSection.tsx` and matching terminal logs in `src/components/ui/TerminalWidget.tsx`.
3. **Updating Bio & Metrics**: Modify `IMPACT_METRICS` and `SKILLS` in `src/components/ui/AboutSection.tsx`.
4. **Adding a new section**: render `<SectionTransition />` as the last child of the section element; register any cursor badge label in `CustomCursor.tsx`.
5. **Local Development**:
   ```bash
   npm install
   npm run dev
   ```
6. **Deployment**: Vercel, Netlify, Cloudflare Pages, Docker, or static Node.js environments (`next build`).
