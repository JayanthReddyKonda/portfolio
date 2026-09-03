# System Architecture & Technical Specifications

This document outlines the architectural patterns, runtime boundaries, component hierarchy, and data pipelines governing the portfolio platform.

---

## 1. Architectural Philosophy

The application is architected around four core pillars:

1. **Zero-Latency Static Generation**: All routes and pages are pre-compiled at build time into static HTML/CSS/JS artifacts, eliminating server-side rendering latency and guaranteeing maximum reliability.
2. **Strict Client-Server Component Isolation**: Page entry points act as Server Component wrappers responsible for metadata and SEO, while interactive UI, 3D WebGL canvases, and kinetic animations are encapsulated in strictly bounded Client Components.
3. **Resilient Offline-First Asset Strategy**: External dependencies are eliminated in favor of locally embedded vector blueprints (SVG data URIs) and locally served WebAssembly binaries (such as Draco 3D decoders), preventing network timeouts and third-party blocking.
4. **Compositor-Level Hardware Acceleration**: Visual transitions, particle simulations, and 3D rigs leverage GPU composition via native CSS View Transitions, WebGL, and Framer Motion hardware-accelerated transforms.

---

## 2. Component Taxonomy & Directory Layers

The codebase adheres to a strict single-responsibility feature taxonomy:

```
src/
├── app/              # Next.js App Router Segments (Metadata, Routing, Layout, Transitions)
├── components/
│   ├── core/         # Reusable Atomic UI Primitives & Design Tokens
│   ├── sections/     # High-Level Stage Viewports (One per major route domain)
│   ├── three/        # 3D Avatar Scene, Lighting Rigs, and Bone Parallax
│   ├── webgl/        # Custom WebGL Shaders & Canvas Simulations
│   └── terminal/     # Interactive Developer Diagnostics CLI Subsystem
├── data/             # Strongly-Typed Static Data Models & Vector Assets
├── types/            # Domain TypeScript Schemas & Data Contracts
└── lib/              # Shared Utilities, Animation Curves, and Class Mergers
```

### Layer Responsibilities

* **`src/app/` (Application Layer)**:
  * Manages route resolution, OpenGraph/Twitter metadata injection, View Transition template wrappers, and root HTML/Body configurations.
  * Pages remain thin orchestrators that mount corresponding section components.

* **`src/components/core/` (Foundational UI Layer)**:
  * Encapsulates atomic, globally accessible widgets: floating capsule navigation, kinetic spring cursor, single-session bootloader, sliding-label action buttons, typewriter engines, and route glide transitions.

* **`src/components/sections/` (Domain Orchestration Layer)**:
  * Structural viewports representing each unique page stage (`Hero`, `About`, `Projects`, `Gallery`, `Experience`, `Skills`, `Contact`).
  * Manages responsive grid distributions, typography layouts, and interactive trigger groupings.

* **`src/components/three/` (3D Graphics Subsystem)**:
  * React Three Fiber (R3F) canvas setup, studio 3-point lighting rigs, camera tracking, and skeletal bone look-at tracking.
  * Isolated via dynamic client boundaries to ensure zero impact on initial page hydration.

* **`src/components/webgl/` (Creative Canvas Shaders)**:
  * Procedural shader effects: Neural ASCII scan mask, 3D bilinear skinning sticker peel deck, infinite corridor gallery tunnel, and background butterfly drift.

* **`src/components/terminal/` (Interactive Diagnostics Engine)**:
  * Real-time keyboard-driven CLI emulator with command parsing, tokenization, history scrolling, and system health telemetry.

* **`src/data/` & `src/types/` (Domain Model Layer)**:
  * Pure TypeScript source-of-truth definitions for projects, benchmarks, career milestones, skill taxonomy, and terminal command definitions.

---

## 3. Navigation & Spatial Stage Transition Pipeline

The platform utilizes a dual-layer transition architecture combining modern browser capabilities with fine-tuned Framer Motion physics:

```
[User Interaction] ──► document.startViewTransition()
                               │
                               ▼
                       [Next.js App Router]
                               │
                               ▼
                    [template.tsx Boundary]
                               │
                               ├─► Top Ambient Hairline Pulse (Moss Green)
                               └─► Horizontal Spatial Slide (GPU x-axis glide & opacity)
```

1. **Native View Transition API**: Captures before-and-after DOM snapshots at the browser compositor level for instantaneous, seamless layout morphs.
2. **Template-Level Spatial Glide**: Each route transition triggers a coordinated horizontal slide (`x: 36px → 0px`) and fade-in governed by high-performance cubic-bezier easing (`[0.16, 1, 0.3, 1]`), creating an editorial spatial flow between stages.
3. **Session-Gated Boot Sequence**: The application boot screen executes strictly once per browsing session using session storage gating, ensuring subsequent internal navigations and back-button presses occur with zero delay.

---

## 4. 3D & WebGL Resource Lifecycle Management

To maintain 60–120 FPS performance across low-end mobile devices and high-refresh desktop monitors, graphics resources follow strict lifecycle rules:

* **Dynamic SSR Boundaries**: Heavy canvas components (`Scene.tsx`, `StickerPeel.tsx`, `GalleryTunnel.tsx`) are dynamically imported with server-side rendering disabled (`ssr: false`), preventing hydration mismatches and reducing initial bundle size.
* **Local WebAssembly Draco Decoding**: 3D model geometry decoders are bundled locally in `public/draco/`, eliminating external network calls and guaranteeing offline 3D rendering.
* **View-Gated Render Loops**: Three.js render loops can be gated based on visibility thresholds, preventing idle GPU draw calls when the user navigates or scrolls past 3D viewports.
* **Canvas Cleanup**: All WebGL shaders, geometries, materials, and event listeners are properly disposed of in component unmount hooks to prevent memory leaks.

