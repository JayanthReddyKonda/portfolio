# DESIGN.md — Jayanth · "Emerald Sophistication" Design System

The implementation contract for this portfolio. Every color, font size, spacing value,
and motion decision in `src/` traces back to a token or rule named here.

---

## 1. Brand & Mood

- **Name**: Jayanth Reddy Konda — AI/ML Engineer & Backend Architect
- **Concept**: **"Emerald Sophistication"** — a deep velvet obsidian and emerald machine hall behind frosted crystal glass.
- **Palette Identity**:
  - Deep Forest Emerald (`#0d4c3c`): Primary dark velvet foundation and canvas backdrop.
  - Sage Emerald Slate (`#2d5a4a`): Secondary surfaces, glass cards, and elevated bento panels.
  - Moss Green Accent (`#7ba05b`): Precision luminous highlights, active indicators, and button fills.
  - Warm Alabaster (`#f4f1eb`): Ultra-crisp high-contrast editorial typography.
- **Rules**:
  - Pure typography-led layout hierarchy.
  - Restrained 60fps hardware-accelerated Framer Motion transitions (`[0.16, 1, 0.3, 1]`).
  - Zero cluttered watermarks or intrusive shutter animations.
  - Standardized Originkit `LabelSlideButton` across all actionable triggers.

---

## 2. Tokens

### Color Palette
| Token | HEX / Value | Purpose |
|---|---|---|
| `--background` | `#0d4c3c` | Root backdrop & primary canvas background |
| `--surface` | `#123d32` | Elevated surface background |
| `--surface-card` | `#1b4b3e` | Primary card background |
| `--surface-sage` | `#2d5a4a` | Secondary card background & glass panels |
| `--accent` | `#7ba05b` | Luminous Moss green accent |
| `--foreground` | `#f4f1eb` | Warm Alabaster primary text |
| `--muted` | `rgba(244, 241, 235, 0.72)` | Muted secondary text |
| `--faint` | `rgba(244, 241, 235, 0.42)` | Faint tertiary text, badges, labels |
| `--hairline` | `rgba(244, 241, 235, 0.14)` | 1px precision hairlines & borders |
| `--glass` | `rgba(13, 76, 60, 0.82)` | Frosted glass backdrop |

### Typography
| Token | Value | Purpose |
|---|---|---|
| Font sans | Geist Sans (`--font-geist-sans`) | Primary editorial text & headings |
| Font mono | Geist Mono (`--font-geist-mono`) | CLI labels, badges, and button labels |
| Display XL | `clamp(2.6rem, 9vw, 6.5rem)` / weight 700 / leading 0.95 | Hero Display Wordmark |
| Heading M | `clamp(2.25rem, 4.5vw, 4rem)` / weight 500 / leading 1.08 | Section titles |
| Body | `1rem–1.125rem` / weight 400 / leading 1.8 / `--muted` | Narrative paragraphs |
| Label | `0.6875rem` mono uppercase tracking `0.25em` / `--accent` | Section index eyebrows |

---

## 3. Button System: Originkit `LabelSlideButton`

All buttons across the portfolio strictly utilize `src/components/core/LabelSlideButton.tsx`:
- **Dual Duplicate Label Roll**: Smoothly slides the text span on entry and exit.
- **Directional Icon Swap**: Translates resting vector badge and replaces with active indicator along an angle vector.
- **Variants**:
  - `accent`: Solid `#7ba05b` fill with `#0d4c3c` text, `#f4f1eb` hover state.
  - `primary`: `#1b4b3e` fill with `#f4f1eb` text, `#7ba05b` hover state.
  - `secondary`: `#2d5a4a` fill with `#f4f1eb` text, `#7ba05b` hover state.
  - `ghost`: Transparent pill with `#f4f1eb` text and hairline border.

---

## 4. Stage Transitions Architecture

- **Horizontal Spatial Glide**:
  - Speed: `0.38s`
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Travel: `x: 36px -> 0px`
  - Opacity: `0 -> 1`
  - Top progress hairline: `#7ba05b` with `0.45s` exit fade.
- **View Transitions API**:
  - `document.startViewTransition()` integrated for native instant router transitions.

---

## 5. Architectural Directory Map

```
src/
├── app/
│   ├── layout.tsx         # Root layout with ButterflyDrift & CustomCursor
│   ├── page.tsx           # Overview / Hero entry
│   ├── globals.css        # Emerald Sophistication tokens & View Transition animations
│   ├── about/             # /about stage
│   ├── work/              # /work stage
│   ├── gallery/           # /gallery stage
│   ├── experience/        # /experience stage
│   ├── skills/            # /skills stage
│   └── contact/           # /contact stage
├── components/
│   ├── core/              # Standardized core widgets (Navbar, LabelSlideButton, Typewriter, PageTransition)
│   ├── sections/          # 7 Standardized stage sections
│   ├── terminal/          # Real interactive CLI diagnostics terminal
│   ├── three/             # 3D Scene lighting and camera mount
│   └── webgl/             # WebGL shaders (StickerPeel, AsciiReveal, RoundCarousel, GalleryTunnel)
├── data/                  # Source of truth data files
├── lib/                   # Utility helpers
└── types/                 # Shared TypeScript interfaces
```
