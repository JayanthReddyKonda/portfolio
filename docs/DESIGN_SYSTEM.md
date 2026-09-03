# Emerald Sophistication — Design System & Visual Specification

**Emerald Sophistication** is the design language governing all visual, spatial, and motion choices across the portfolio. It blends the depth of an architectural machine hall with the clarity of frosted crystalline glass and luminous emerald accents.

---

## 1. Visual Philosophy & Identity

* **Theme Concept**: A dark velvet obsidian machine hall behind precision-crafted frosted glass.
* **Atmospheric Tone**: Precise, high-tech, editorial, calm, and sophisticated.
* **Core Principles**:
  * **Typography as Structure**: Strong hierarchy with massive display wordmarks, crisp monospace telemetry badges, and comfortable reading line-lengths.
  * **Layered Atmospheric Depth**: Backgrounds consist of deep velvet forest tones layered with frosted glass panels, subtle radial glows, and delicate hairlines.
  * **Purposeful Motion**: Animations are quick, physical, and restrained—avoiding gratuitous distractions and prioritizing immediate user feedback.

---

## 2. Color Palette & Hierarchy

The palette is constructed around four tonal tiers:

### Primary Palette Tiers

1. **Deep Forest Emerald (`#0d4c3c`) — Canvas Foundation**
   * The deep velvet obsidian base for all viewports, full-page backgrounds, and root canvases.
2. **Sage Emerald Slate (`#2d5a4a`) — Structural Glass & Bento Cards**
   * Applied to elevated cards, bento grid surfaces, floating capsules, and secondary interactive containers.
3. **Moss Green Accent (`#7ba05b`) — Luminous Telemetry & Focus**
   * High-contrast luminous green used strictly for active status pings, focused interactive states, primary button fills, terminal highlights, and link hover accents.
4. **Warm Alabaster (`#f4f1eb`) — Editorial Typography**
   * High-contrast ivory text that provides optimal readability without the harsh glare of pure white.

### Surface Elevation & Transparency Tokens

* **Root Backdrop**: `#0d4c3c`
* **Elevated Surface**: `#123d32`
* **Card Surface**: `#1b4b3e`
* **Glass Container**: `#2d5a4a` with 40%–80% opacity and backdrop blur (`backdrop-blur-md` to `backdrop-blur-xl`).
* **Hairline Borders**: `rgba(244, 241, 235, 0.12)` to `rgba(244, 241, 235, 0.20)` for crisp 1px separation.
* **Accent Hairlines**: `rgba(123, 160, 91, 0.30)` to `rgba(123, 160, 91, 0.60)` for interactive borders.

---

## 3. Typography Architecture

The typographic hierarchy balances modern geometric sans-serif headings with monospace engineering telemetry:

* **Display Wordmark (Hero XL)**:
  * Scale: `clamp(2.6rem, 7.5vw, 5.8rem)`
  * Weight: Bold (700)
  * Line Height: `0.96` (Tight, impactful editorial lockup)
  * Tracking: `-0.04em`

* **Section Heading (Heading M)**:
  * Scale: `clamp(2.25rem, 4.5vw, 4rem)`
  * Weight: Medium (500)
  * Line Height: `1.08`
  * Tracking: `-0.03em`

* **Body & Narrative**:
  * Scale: `1rem` to `1.125rem`
  * Weight: Regular (400)
  * Line Height: `1.75` to `1.8` (Relaxed for effortless scanning)
  * Color: Warm Alabaster at 80%–90% opacity.

* **Engineering Telemetry & Badges**:
  * Font: Monospace
  * Scale: `0.6875rem` to `0.75rem`
  * Transformation: Uppercase with generous tracking (`0.18em` to `0.25em`)
  * Colors: Moss Green (`#7ba05b`) or Alabaster with live pulsing status dots.

---

## 4. Standardized Button & Interaction System

All actionable navigation triggers, external link pills, and submission controls adhere to the **Sliding Label & Directional Swap** paradigm:

* **Dual Rolling Label Spans**: Hovering transitions the resting text span upward while a duplicate label rolls into view from below, creating a polished physical interaction.
* **Directional Badge Swap**: The resting vector indicator (e.g., arrow or icon) slides diagonally along its vector angle, replaced instantaneously by an active state glyph.
* **Standard Variants**:
  * **Accent**: Solid Moss Green fill (`#7ba05b`) with dark forest text—reserved for primary calls to action.
  * **Primary**: Deep card fill (`#1b4b3e`) with Alabaster text and luminous border on hover.
  * **Secondary**: Sage slate fill (`#2d5a4a`) with backdrop blur for secondary utility actions.
  * **Ghost / Outlined**: Transparent capsule with a delicate 1px hairline border for low-priority links.

---

## 5. Motion Principles & Timing Standards

* **Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Custom Apple-grade decelerated curve—snappy initiation with an ultra-smooth landing).
* **Duration Hierarchy**:
  * Micro-interactions (Button hovers, badges, icon swaps): `0.2s`
  * Stage page slides & transitions: `0.38s` to `0.45s`
  * Content reveals & staggered bento entries: `0.6s` to `0.7s`
* **Accessibility Compliance**:
  * All animations respect `prefers-reduced-motion`. When reduced motion is detected, spatial translations (`y`, `x`) are suppressed and replaced by instant opacity switches.

