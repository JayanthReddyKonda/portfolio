# DESIGN.md — Jayanth · "The Autonomous Engine Room"

The implementation contract for this portfolio. Every color, font size, spacing value,
and motion decision in `src/` traces back to a token or rule named here.

## 0. Research Log

| Lane | Status | Deliverable |
|---|---|---|
| Embedded references (`references/design/` Layer A + Layer B) | **SKIPPED — unavailable** | The frontend skill's local reference corpus is not present on disk in this environment (searched `~/.cache/opencode/skills`, `~/.agents/skills`, global npm roots). Substituted with the user's explicit brief naming Vercel + Linear as brand references, distilled into the token set below. |
| Lazyweb real-product screens | **SKIPPED — tool unavailable** | No lazyweb recipe/network lane available locally. Layout grammar derived from the named brands' public design language: fixed frosted nav, oversized tight-tracked hero type, single-column editorial sections, hairline borders. |
| Imagen concept drafts | **SKIPPED — imagegen not requested** | User supplied a complete written art direction; no visual draft needed as contract. |

Shortlist rationale: brief explicitly names two brands → their shared system (near-black
canvas, white type, 1px hairlines, frosted glass, restrained motion) IS the Layer B
reference. Layer A philosophy: minimalism — restraint, typography-led, no ornament.

---

## 1. Brand & Mood

- **Name**: Jayanth — AI/ML Engineer & Builder
- **Concept**: "The Autonomous Engine Room" — a cinematic machine hall behind glass.
  UI = instrument panel. 3D scene = the engine, always running, barely lit.
- **References**: vercel.com (typography, monochrome discipline), linear.app (frosted
  chrome, motion restraint), pmndrs R3F showcase (scene staging).
- **Do**: deep blacks, stark white type, hairline borders, one accent at most, huge
  whitespace, motion that reports state only.
- **Don't**: gradients-as-decoration, colored blocks, rounded-bubbly shapes, emoji
  icons, bouncy easing, decorative animation on non-interactive elements.

## 2. Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--background` | `#222831` | Page + canvas clear color (deep slate) |
| `--foreground` | `#eeeeee` | Primary text |
| `--muted` | `rgba(238,238,238,0.60)` | Secondary text |
| `--faint` | `rgba(238,238,238,0.38)` | Tertiary text, labels |
| `--hairline` | `rgba(238,238,238,0.10)` | 1px borders, dividers |
| `--glass` | `rgba(34,40,49,0.55)` | Frosted surfaces (with blur) |
| `--accent` | `#00ADB5` | Teal — the single accent hue |
| Surface (cards) | `#1c2129` | Panel backgrounds, one step below bg |
| Grey | `#393E46` | Secondary fills, fill-light tint |

Full-site rule: ONLY these four palette colors (#222831 / #393E46 / #00ADB5 / #EEEEEE)
and their alpha variants. No emerald, no cyan, no other hues anywhere.

### Typography
| Token | Value | Use |
|---|---|---|
| Font sans | Geist Sans (`--font-geist-sans`) | All UI text |
| Font mono | Geist Mono (`--font-geist-mono`) | Labels, nav meta, status text |
| Display XL | `clamp(3.5rem, 13vw, 9rem)` / weight 500 / tracking `-0.05em` / leading 0.95 | Hero "Jayanth." |
| Heading M | `clamp(1.75rem, 4vw, 2.75rem)` / weight 500 / tracking `-0.03em` | Section headings |
| Body | `1rem–1.125rem` / weight 400 / leading 1.7 / `--muted` | Paragraphs |
| Label | `0.6875rem` mono uppercase tracking `0.2em` / `--faint` | Eyebrows, index numbers |

### Spacing & Layout
- Section rhythm: `100vh` per section, content max-width `72rem` (px-6 sm:px-10 lg:px-16).
- Nav height: `4rem` (h-16), full-width, fixed.
- Radii: `6px` small controls, `12px` panels. Hairline borders everywhere else.

### Elevation / Material
- Frosted glass: `bg-[var(--glass)]` + `backdrop-blur-xl` + bottom hairline. Used ONLY
  by Navbar and mobile menu panel.
- The 3D scene is the depth layer; UI never casts shadows.

### Layers (z-index)
| Layer | z | Content |
|---|---|---|
| Canvas | `-10` (fixed inset-0) | R3F scene, `pointer-events-none` |
| UI scroll | auto (in-flow) | Sections |
| Chrome | `50` | Navbar, mobile menu |

## 3. Components (anatomy)

### Navbar
Fixed top h-16, full width, frosted glass, hairline bottom border appears after scroll.
Left: wordmark `JAYANTH` (sans, 600, tracking 0.08em). Right (≥768px): three links
`WORK / ABOUT / CONTACT` — mono label style, hover → foreground color, 150ms.
Mobile (<768px): Lucide `Menu`/`X` toggle opens full-screen frosted overlay with the
same links stacked large; closes on link click and Escape.

### HeroSection
`min-h-svh`, flex-end aligned content block bottom-left third. Eyebrow label line
(`ENGINE ROOM — ONLINE`, mono), display-XL `Jayanth.`, subtitle
`AI/ML Engineer & Software Builder.` in body size `--muted`, plus a scroll cue row.
Entrance: staggered fade+rise (opacity 0→1, y 24→0, 700ms, ease `[0.16,1,0.3,1]`,
delays 0.1/0.25/0.4s). Runs once on load.

### InitialLoader
Minimal boot screen: `#222831` field, mono wordmark with wide tracking, a single
1px teal (`#00ADB5`) progress hairline, and a quiet tabular percentage. Fades
out (opacity only) on completion. No icons, no telemetry logs, no zoom effects.

### AboutSection
`min-h-svh`, vertically centered narrow column (`max-w-2xl`). Mono eyebrow `01 — ABOUT`,
heading-M statement about AI/ML + distributed systems focus, two short body paragraphs.
Reveal on scroll via `whileInView` once, same rise/fade language.

### SceneMount / Scene (3D layer)
- Mount gate: client component, `next/dynamic(() => import("./Scene"), { ssr: false })`
  (Next 16: `ssr:false` illegal in Server Components). Renders nothing until module loads;
  Drei `<Loader />` covers asset suspense inside the canvas.
- Canvas: fixed inset-0 `-z-10`, `dpr={[1, 1.5]}`, camera fov 40 @ `[0, 0.4, 7]`,
  `gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}`, shadows OFF.
- **Frameloop gating (v1.1.0)**: the Canvas never unmounts; scrolling past the hero flips
  `frameloop` to `"never"` (zero draw calls) instead of destroying the WebGL context.
- EnvironmentSetup (`EnvironmentSetup.tsx`): fully local three-point rig — ambient 0.7,
  key directional 2.2 (#f8faff), fill directional 1.0 (#d0e0ff), cyan rim spot (#00e5ff),
  front accent spot. Zero network/HDR dependencies by design.
- Character (`Character.tsx`): real GLB avatar (`/models/character-transformed.glb`) with
  SkeletonUtils clone, dedicated AnimationMixer, and head/neck bone cursor parallax
  (`LOOK_DAMPING = 4.5`). Honors `prefers-reduced-motion`.

## 4. Motion Rules

| Token | Value |
|---|---|
| ease-out-expo | `cubic-bezier(0.16, 1, 0.3, 1)` |
| duration-fast | 150ms (hovers, link color) |
| duration-reveal | 700ms (entrances) |
| float | sin-driven, period ~18s equivalent, amplitude ≤ 0.08 units |

- GPU-composited properties only: `transform`, `opacity`.
- Motion serves state: entrance reveals, scroll-in reveals, hover feedback on links,
  open/close of the mobile menu. Nothing else moves.
- `prefers-reduced-motion`: Framer transitions collapse to opacity-only instant states;
  3D float stops (static pose).

## 5. Responsive Behavior

- Breakpoint: Tailwind `md` (768px). Below it, UI takes precedence: scene still renders
  but DPR clamps to 1 and the character sits lower/right so text owns the viewport.
- Hero type scales fluidly via `clamp()` — no layout shift between breakpoints.
- Mobile menu replaces inline links < 768px; touch targets ≥ 44px.

## 6. Accessibility Constraints

- Semantic landmarks: `header/nav/main/section/footer`; one `h1` (Hero).
- Nav links are real anchors to section ids; unimplemented targets (#work/#contact)
  remain valid hrefs — accepted debt until those sections ship (Phase 3).
- Focus-visible: 1px offset outline in `--foreground` on all interactive elements.
- Contrast: muted text ≥ 4.5:1 on #050505; faint used for ≥14px mono only.
- Canvas is `aria-hidden`, `pointer-events-none`; Loader announces via polite aria-live.

## 7. Accepted Debt & Resolved Items

**Resolved in v1.1.0 full audit:**
1. ~~`#work` and `#contact` anchors have no target sections~~ — all sections ship
   (About, Work, Experience, Terminal, Contact) with "Luminous Wipe" teal glow-line
   transitions on every seam; Footer lives inside `<main>` so the terminal→contact seam resolves.
2. ~~Environment preset network HDR~~ — replaced by a fully local lighting rig
   (`EnvironmentSetup.tsx`), zero runtime CDN dependencies.
3. ~~CharacterPlaceholder primitive~~ — replaced by the production GLB avatar rig.
4. Global `ScrollTrigger.kill()` inside the camera rig removed — all GSAP contexts are
   scoped (`gsap.context` / `useGSAP`); this rule is documented in HANDOFF.md §3A.

**Remaining debt:**
1. Single dark theme; light mode intentionally out of scope for this concept.
2. Section transitions use a single shared scroll listener per instance; extreme
   resize storms are debounced by rAF coalescing rather than explicit debounce — acceptable.

## 8. Verification Contract

Every shipped screen passes: real-browser check at 375 / 768 / 1280 px, keyboard-only
nav pass, reduced-motion pass, and `npm run build` + eslint clean. Visual QA evidence
before any "done" claim on future phases.

## 9. Component Inventory (v1.5.0)

- **LiquidCarveButton** (Hero + Footer CTAs): light `#EEEEEE` fill, `#222831` text,
  teal `#00ADB5` blob, mono 13px/600 label, `→` symbol right.
- **InitialLoader**: see §3. **Luminous Wipe**: see HANDOFF §3A.
