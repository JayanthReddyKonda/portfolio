# Portfolio Engineering & Architecture Handoff

**Project**: Interactive 3D Developer Portfolio — Jayanth Reddy Konda
**Profile**: AI/ML Systems & Backend Architect (VNR VJIET • CGPA: 9.1)
**Version**: 1.1.0 (Production-Ready — Post Full System Audit)
**Framework**: Next.js 16.3.2 (App Router, Turbopack) • React 19.2.8 • Three.js 0.185.1 • GSAP 3.15.0 • Tailwind CSS v4

---

## 1. Executive Summary

This codebase is a high-performance, single-page interactive portfolio engineered to showcase AI/ML architectures, distributed backend platforms, and biometric systems. It integrates real-time WebGL 3D avatar mechanics, procedural GPU shaders, GSAP ScrollTrigger section transitions, an interactive developer CLI terminal, and an Originkit ASCII face reveal canvas.

**v1.1.0 audit outcome**: full performance/design/bug pass across every file. Critical fixes include removal of a global `ScrollTrigger.kill()` inside the 3D camera rig (which destroyed the pixel transitions), WebGL context preservation via `frameloop` gating, duplicate-DOM-id elimination, rAF-throttled scroll handlers, and tab-visibility suspension for the shader swarm.

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
│   │   ├── globals.css           # Tailwind v4 tokens, custom cursor rules, base section setup
│   │   ├── layout.tsx            # Root layout, font loader (Geist), metadata & PNG icon routes
│   │   └── page.tsx              # Single-page orchestration (Footer lives INSIDE <main> so the
│   │                             #   terminal→contact pixel seam has a valid sibling target)
│   │
│   └── components/
│       ├── three/                # 3D WebGL Canvas Layer
│       │   ├── CameraController.tsx # Camera parallax — SCOPED gsap.context only (never killAll)
│       │   ├── Character.tsx        # 3D Avatar rig, bone cursor parallax, animation mixer
│       │   ├── EnvironmentSetup.tsx # Three-point studio lighting (zero network deps)
│       │   ├── Scene.tsx            # Canvas wrapper; frameloop gated by hero visibility
│       │   └── SceneMount.tsx       # Dynamic client mount wrapper (SSR safe)
│       │
│       └── ui/                   # UI Components & Interactive Layers
│           ├── AboutSection.tsx           # Profile foundation, metrics (9.1 CGPA), skills taxonomy
│           ├── AsciiReveal.tsx            # Multi-blob spring physics ASCII face reveal
│           ├── ButterflyDrift.tsx         # GPU shader swarm; pauses when tab hidden,
│           │                              #   static single frame under prefers-reduced-motion
│           ├── CustomCursor.tsx           # Spring cursor with section badges; rAF-throttled scroll
│           ├── ExperienceSection.tsx      # Work experience, education, certifications, leadership
│           ├── Footer.tsx                 # Contact CTA (#contact); plain anchors for hash nav
│           ├── HeroSection.tsx            # Hero typography, liquid carve button, CTAs
│           ├── InitialLoader.tsx          # 0→100% loader; dispatches `jrk:loader-complete` event
│           ├── LiquidCarveButton.tsx      # SVG Gaussian blur organic surface tension button
│           ├── Navbar.tsx                 # Frosted glass capsule with live beacon & resume download
│           ├── PixelSectionTransition.tsx # GSAP ScrollTrigger pixel grid transition (see §3A)
│           ├── ProjectsSection.tsx        # 4 production-grade systems case studies
│           ├── RippleTransition.tsx       # Shockwave ripple teleporter for anchor navigation
│           ├── RotatingText.tsx           # GSAP rotating taxonomy text badge
│           ├── TerminalWidget.tsx         # Interactive developer CLI (scoped container scroll)
│           └── Typewriter.tsx             # Terminal typing emulator component
│
├── DESIGN.md                     # Design tokens, color system, typography & spacing rules
├── README.md                     # Getting started guide & feature overview
└── package.json                  # Dependencies, scripts, engine specifications
```

---

## 3. Core Systems & Technical Implementation

### A. GSAP Cybernetic Pixel Grid Section Transitions (`PixelSectionTransition.tsx`)
- **Init contract**: waits for `jrk:loader-complete` (dispatched by `InitialLoader`) before measuring layout — GSAP never measures against a scroll-locked page (4s fallback timer).
- **Square-cell math**: explicit `${cellSize}px` column/row tracks; no grid gap/padding distortion.
- **Timeline**: wave-in `0 → 0.65`, wave-out starts `0.7` so the full-glow peak renders mid-scrub.
- **Lifecycle safety**: StrictMode double-mount guard (`:scope > [data-st-03-pixels]` check), breakpoint-crossing rebuild via `matchMedia change`, debounced resize rebuild, `document.fonts.ready` refresh, `prefers-reduced-motion` bail-out.
- **Perf**: no per-cell `backdrop-filter`; `will-change` hints and `contain: strict` on layers.
- **CRITICAL RULE**: nothing in the app may call `ScrollTrigger.getAll().forEach(kill)` or `ScrollTrigger.killAll()`. The camera rig previously did this and silently destroyed every transition trigger. All GSAP work must stay inside scoped `gsap.context()` / `useGSAP`.

### B. 3D WebGL Avatar Engine (`src/components/three/`)
- **Skeletal cursor tracking**: head/neck bone look-at with exponential decay (`LOOK_DAMPING = 4.5`).
- **Animation Mixer**: dedicated `THREE.AnimationMixer` over the `SkeletonUtils.clone` of the GLB scene.
- **Context preservation**: the Canvas stays mounted for the whole session; scrolling past the hero flips `frameloop` to `"never"` (zero draw calls) instead of unmounting, which previously destroyed/recreated the WebGL context.

### C. Procedural Shader Swarm (`ButterflyDrift.tsx`)
- Pure WebGL 12-float stride vertex/fragment pipeline at `-z-10`, density 20.
- Suspends its RAF loop on `visibilitychange` (hidden tab); renders one static frame under `prefers-reduced-motion`.

### D. Shockwave Ripple Navigation Teleporter (`RippleTransition.tsx`)
- Intercepts in-page anchors, spawns radial shockwaves from click coordinates, glides viewport to target. `#top` performs exactly one `scrollTo(0)` call (double-scroll bug fixed in v1.1.0).

### E. Scoped Interactive Developer CLI (`TerminalWidget.tsx`)
- Container-scoped auto-scroll never moves the window. Supports: `projects`, `skills`, `education`, `experience`, `certifications`, `contact`, `clear`, `help`. Root div no longer carries a duplicate `id="terminal"` (the parent section owns it).

### F. Boot Loader Event Contract (`InitialLoader.tsx`)
- Sets `document.body.dataset.loaderActive = "true"` while scroll is locked; on completion clears it and dispatches the `jrk:loader-complete` window event. Any scroll-position-dependent system must subscribe to this event instead of guessing with timeouts.

---

## 4. Verification & Quality Assurance (v1.1.0)

| Test / Check | Command | Status |
| :--- | :--- | :---: |
| **Production Compiler** | `npm run build` | ✅ Passed (static prerender `/`) |
| **TypeScript Typecheck** | `npx tsc --noEmit` (also inside build) | ✅ Passed |
| **ESLint Analysis** | `npm run lint` | ✅ Passed (0 errors, 0 warnings) |
| **ScrollTrigger Isolation** | No global kill calls; scoped contexts only | ✅ Audited |
| **Duplicate DOM IDs** | Single `id="terminal"`; unique section ids | ✅ Fixed |
| **Favicon Routes** | Prerendered `/icon.png` & `/favicon.png` | ✅ Verified |

Manual QA checklist before release: full scroll-through at 375 / 768 / 1280 px, keyboard-only nav pass, reduced-motion pass, and visual confirmation of every seam (hero→about→work→experience→terminal→contact).

---

## 5. Maintenance & Future Modifications

1. **Updating Resume**: Replace `/public/resume.pdf`.
2. **Adding/Editing Projects**: Modify `REAL_PROJECTS` in `src/components/ui/ProjectsSection.tsx` and matching terminal logs in `src/components/ui/TerminalWidget.tsx`.
3. **Updating Bio & Metrics**: Modify `IMPACT_METRICS` and `SKILLS` in `src/components/ui/AboutSection.tsx`.
4. **Adding a new section**: give it `data-st-03="20"` and ensure it has a next/previous sibling per its `data-st-mode`; register any cursor badge label in `CustomCursor.tsx`.
5. **Local Development**:
   ```bash
   npm install
   npm run dev
   ```
6. **Deployment**: Vercel, Netlify, Cloudflare Pages, Docker, or static Node.js environments (`next build`).
