# System Architecture & Technical Specifications

**Portfolio Architecture Guide** — Jayanth Reddy Konda  
**Stack**: Next.js 16.3.2 (App Router) • React 19 • Three.js / React Three Fiber • Framer Motion • Tailwind CSS v4

---

## 1. Directory Organization Principles

The codebase follows the **Single Responsibility & Feature Taxonomy** pattern:

| Directory | Responsibility | Guidelines |
| :--- | :--- | :--- |
| `src/app/` | Next.js App Router route segments | Server/Client route pages, global styles, metadata, and `template.tsx` transition wrappers. Minimal page logic; mounts section components inside `<main className="relative z-10 min-h-screen">`. |
| `src/components/core/` | Atomic UI primitives & design tokens | Reusable low-level widgets (`Navbar`, `CustomCursor`, `InitialLoader`, `LabelSlideButton`, `PageTransition`, `Typewriter`). |
| `src/components/sections/` | Full-page section orchestrators | Domain-specific viewports (`HeroSection`, `AboutSection`, `ProjectsSection`, `GallerySection`, `ExperienceSection`, `SkillsSection`, `ContactSection`). |
| `src/components/webgl/` | Shader canvases & interactive WebGL | Heavy canvas / WebGL shaders (`AsciiReveal`, `StickerPeel`, `GalleryTunnel`, `RoundCarousel`, `ButterflyDrift`). |
| `src/components/three/` | 3D Fiber avatar & scene mounting | Dynamic client-mounted R3F canvas, camera rig, avatar bone rotation, and studio lighting. |
| `src/components/terminal/` | Terminal diagnostics engine | Live interactive terminal parser, history buffer, and command execution pipeline. |
| `src/data/` | Strongly-typed static content | Architecture specifications, skills matrix, academic records, and local SVG vector blueprints. |
| `src/types/` | TypeScript schema definitions | Core domain interfaces for projects, skills, experience, and terminal command logs. |
| `src/lib/` | Shared utilities | Class name merging (`cn`) and animation cubic-bezier tokens. |

---

## 2. Navigation & Page Transition Pipeline

```
[User Clicks Link in Navbar / CTA]
                 │
                 ▼
  document.startViewTransition()
                 │
                 ▼
      Next.js Router Push (href)
                 │
                 ▼
     [template.tsx Boundaries]
                 │
                 ├─► Top Ambient Glow Hairline Sweep (#7ba05b)
                 └─► Smooth Horizontal Spatial Slide (x: 40px -> 0px, opacity: 0 -> 1, ease: [0.16, 1, 0.3, 1])
```

---

## 3. WebGL & 3D Resource Isolation

1. **Avatar Rigging & SSR Boundary**:
   - `SceneMount.tsx` dynamically imports `Scene.tsx` with `{ ssr: false }` to avoid hydration mismatches.
   - The avatar scene renders only on the Overview page (`/`), freeing GPU cycles when navigating to deep content pages.
2. **Local Vector Blueprint Data URIs**:
   - Architecture gallery textures and sticker badges are defined locally in `src/data/galleryImages.ts` and `src/data/stickerImages.ts` as SVG data URIs, ensuring 100% offline reliability with zero network timeouts.
3. **Session-Gated Bootloader**:
   - `InitialLoader.tsx` records session completion in `sessionStorage`, ensuring the boot screen runs strictly once per user visit and never interrupts back-navigation.

---

## 4. Quality & Build Standards

- **TypeScript Strictness**: `strict: true`, zero `any` declarations across all component props and domain models.
- **Performance Budget**: Target < 400ms static prerender, 60fps animations on mobile and desktop viewports.
- **Design Tokens**: Strict adherence to the Emerald Sophistication system defined in `DESIGN.md`.
