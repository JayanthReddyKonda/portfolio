# Engineering Best Practices & Standards

This document establishes the technical rules, performance budgets, quality metrics, and coding standards required across the codebase.

---

## 1. Performance Budgets & Core Web Vitals (CWV)

Every component, shader, and asset must adhere to strict performance thresholds:

| Metric | Target | Enforcement Strategy |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | `< 0.8s` | Server pre-rendered static HTML, embedded system fonts, and critical CSS inlining. |
| **Largest Contentful Paint (LCP)** | `< 1.2s` | Defer heavy 3D canvases, optimize hero wordmark rendering, and eliminate render-blocking external scripts. |
| **Cumulative Layout Shift (CLS)** | `0.00` | Fixed aspect-ratio containers for 3D viewports, explicit SVG viewBoxes, and reserved layout bounds. |
| **Interaction to Next Paint (INP)** | `< 50ms` | Zero long JavaScript tasks on the main thread; WebGL calculations offloaded to GPU shaders and RAF loops. |
| **Static Build Time** | `< 2.5s` | Turbopack compilation with static page pre-generation. |

---

## 2. React 19 & TypeScript Strictness

* **React 19 Immutability & Compiler Compatibility**:
  * Avoid mutating objects or arrays in place. Use declarative state transformations and memoized value selectors.
  * Keep component render functions pure; isolate side effects strictly within lifecycle hooks.
* **Zero `any` TypeScript Policy**:
  * All domain models, event parameters, component props, and API schemas must have explicit, strongly-typed TypeScript interfaces defined in `src/types/`.
* **Server vs. Client Component Boundaries**:
  * Route files (`page.tsx`) must remain Server Components whenever possible to declare route metadata and static structure.
  * Add `"use client"` only at the leaf or sub-tree boundary where interactive state, browser APIs, or Framer Motion hooks are required.

---

## 3. WebGL & Three.js Best Practices

* **Zero-CPU Idle Draw Calls**:
  * Graphics canvases must pause or reduce frame loops (`frameloop="never"` or visibility checks) when scrolled out of view or during off-screen transitions.
* **Decoupled Local Asset Pipeline**:
  * All 3D decoders (Draco WASM) and texture assets must reside within the local `public/` directory to prevent network-dependent loading failures or CDN outages.
* **Skeletal Rig Optimization**:
  * 3D bones and look-at tracking calculations must use exponential decay damping (`Math.exp(-damping * delta)`) to ensure framerate-independent, jitter-free cursor tracking.
* **Explicit Resource Disposal**:
  * WebGL contexts, geometries, textures, and animation mixers must be explicitly cleaned up on component unmount to prevent GPU memory leaks across route transitions.

---

## 4. Mobile & Touch Ergonomics

* **Eliminating Tap Latency**:
  * `touch-action: manipulation` must be applied across all interactive controls and links to eliminate the standard 300ms mobile double-tap delay.
* **Touch Target Standards**:
  * All buttons, nav links, social icons, and interactive pills must maintain a minimum touch target bounding box of $44 \times 44\text{px}$ (`min-h-[44px]`).
* **Viewport Stability**:
  * Viewport overscroll bounce must be contained (`overscroll-behavior-y: none`) to prevent rubber-band jumping during touch gestures.
* **Adaptive DPR Budgeting**:
  * Mobile and low-power devices receive a capped Device Pixel Ratio (DPR 1.0–1.2) to preserve battery life and maintain solid 60 FPS rendering.

---

## 5. Accessibility (a11y) & Inclusive Design

* **Motion Sensitivity**:
  * Always respect `prefers-reduced-motion` queries. Replace large translate/scale animations with instant or subtle opacity fades.
* **Semantic Document Hierarchy**:
  * Exactly one `<h1>` per page. Secondary headings must follow sequential nesting (`<h2>` → `<h3>`) without skipping levels.
* **Color Contrast Compliance**:
  * All primary and secondary text combinations against emerald backgrounds must meet or exceed WCAG AA contrast standards (minimum 4.5:1 ratio).
* **Keyboard Navigation**:
  * Focus rings, tab indexes, and interactive key listeners (Enter/Space on terminal and buttons) must be fully navigable without a pointing device.

