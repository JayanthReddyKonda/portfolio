"use client";

/**
 * @file PixelSectionTransition.tsx
 * @description GSAP-Powered Cybernetic Pixelated Grid Section Transition (sectionTransition03).
 * Features:
 * - High-visibility Emerald & Cyan glowing cyber-pixel cells with neon borders and matrix glow.
 * - Hardware-accelerated GSAP ScrollTrigger scrubbing across section boundaries.
 * - Dynamic CSS grid calculation with square aspect ratio preservation.
 * - Bottom-to-top staggered wave with deterministic pseudo-random hash jitter.
 * - Automatic ScrollTrigger refresh and window resize handling.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger (guarded so HMR / double-eval never stacks patches)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  const w = window as typeof window & { __st03WarnPatched?: boolean };
  if (!w.__st03WarnPatched) {
    w.__st03WarnPatched = true;
    // Filter THREE.Clock deprecation warning from console
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock: This module has been deprecated")
      ) {
        return;
      }
      origWarn.apply(console, args);
    };
  }
}

interface PixelTransitionConfig {
  resolution?: number;
  spread?: number;
  fillDuration?: number;
  layerHeight?: string;
  mode?: "cover" | "reveal";
  coverStart?: string;
  revealStart?: string;
  mobile?: {
    breakpoint?: number;
    resolution?: number;
  };
}

const DEFAULT_CONFIG: Required<PixelTransitionConfig> = {
  resolution: 22,
  spread: 6,
  fillDuration: 0.04,
  layerHeight: "65vh",
  mode: "cover",
  coverStart: "bottom 95%",
  revealStart: "top bottom",
  mobile: {
    breakpoint: 768,
    resolution: 14,
  },
};

export function sectionTransition03(
  scopeOrConfig: Element | Document = document,
  maybeConfig: PixelTransitionConfig = {}
) {
  if (typeof window === "undefined") return () => {};

  const config: Required<PixelTransitionConfig> = {
    ...DEFAULT_CONFIG,
    ...maybeConfig,
    mobile: {
      ...DEFAULT_CONFIG.mobile,
      ...(maybeConfig.mobile || {}),
    },
  };

  const isMobile = window.matchMedia(
    `(max-width: ${config.mobile.breakpoint}px)`
  ).matches;

  const getPositiveInt = (value: string | null | undefined, fallback: number) => {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  };

  const hash = (i: number) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const createPixelLayer = (
    section: HTMLElement,
    columnCount: number,
    mode: "cover" | "reveal"
  ) => {
    const computedStyles = getComputedStyle(section);
    if (computedStyles.position === "static") {
      section.style.position = "relative";
    }

    const layer = document.createElement("div");
    layer.setAttribute("data-st-03-pixels", "");
    layer.setAttribute("aria-hidden", "true");

    Object.assign(layer.style, {
      position: "absolute",
      left: "0",
      right: "0",
      bottom: mode === "cover" ? "0" : "auto",
      top: mode === "reveal" ? "0" : "auto",
      height: config.layerHeight,
      zIndex: "50",
      pointerEvents: "none",
      overflow: "hidden",
      contain: "strict",
    });

    section.append(layer);

    // Square-cell math: fold nothing into gaps — no grid gap/padding so
    // cells are exact squares of cellSize.
    const layerWidth = layer.offsetWidth || window.innerWidth;
    const layerHeightPx = layer.offsetHeight || window.innerHeight * 0.65;
    const cellSize = layerWidth / columnCount;
    const rowCount = Math.max(Math.round(layerHeightPx / cellSize), 1);

    Object.assign(layer.style, {
      display: "grid",
      gridTemplateColumns: `repeat(${columnCount}, ${cellSize}px)`,
      gridAutoRows: `${cellSize}px`,
      justifyContent: "center",
      alignContent: "end",
      willChange: "transform, opacity",
    });

    const totalCells = columnCount * rowCount;
    const cells = Array.from({ length: totalCells }, () => {
      const cell = document.createElement("span");
      cell.setAttribute("data-st-03-cell", "");
      Object.assign(cell.style, {
        display: "block",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(0, 229, 255, 0.6) 100%)",
        border: "1px solid rgba(16, 185, 129, 0.75)",
        boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
        borderRadius: "2px",
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      });
      layer.append(cell);
      return cell;
    });

    gsap.set(cells, { opacity: 0, scale: 0.1 });

    return { layer, cells, rows: rowCount, columns: columnCount };
  };

  const build = () => {
    const sections = scopeOrConfig.querySelectorAll<HTMLElement>("[data-st-03]");
    const createdLayers: HTMLElement[] = [];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      // StrictMode / Fast Refresh guard — never stack duplicate layers.
      if (section.querySelector(":scope > [data-st-03-pixels]")) return;

      const mode = (section.dataset.stMode || config.mode) as "cover" | "reveal";
      const sibling =
        mode === "cover" ? section.nextElementSibling : section.previousElementSibling;
      if (!(sibling instanceof HTMLElement)) return;

      const desktopResolution = getPositiveInt(
        section.getAttribute("data-st-03"),
        config.resolution
      );
      const resolution = isMobile
        ? getPositiveInt(section.dataset.stMobileResolution, desktopResolution)
        : desktopResolution;

      const spread = getPositiveInt(section.dataset.stSpread, config.spread);

      const { layer, cells, rows, columns } = createPixelLayer(
        section,
        resolution,
        mode
      );
      createdLayers.push(layer);

      const maxDelay = Math.max(rows - 1 + spread, 1);
      const cellDelays = cells.map((_, index) => {
        const row = Math.floor(index / columns);
        const rowFromBottom = mode === "cover" ? rows - 1 - row : row;
        return (rowFromBottom + hash(index) * spread) / maxDelay;
      });

      // Wave-in occupies 0 -> 0.65 of the timeline; wave-out starts at 0.7 so
      // the full-glow peak is actually visible mid-scrub.
      const STAGGER_WINDOW = 0.4;
      const WAVE_OUT_START = 0.7;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: mode === "cover" ? "bottom 95%" : "top bottom",
          end: mode === "cover" ? "bottom 15%" : "top 30%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Wave in: Staggered pixel pop & glow
      timeline.to(
        cells,
        {
          duration: 0.25,
          opacity: 1,
          scale: 1,
          stagger: (index) => cellDelays[index] * STAGGER_WINDOW,
          ease: "power2.out",
        },
        0
      );

      // Wave out: Smooth pixel dissolve into next section
      timeline.to(
        cells,
        {
          duration: 0.25,
          opacity: 0,
          scale: 0.3,
          stagger: (index) => cellDelays[index] * STAGGER_WINDOW,
          ease: "power2.in",
        },
        WAVE_OUT_START
      );

      if (timeline.scrollTrigger) {
        triggers.push(timeline.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((st) => st.kill());
      createdLayers.forEach((layer) => layer.remove());
    };
  };

  // Respect reduced-motion users — skip the effect entirely.
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.st03Disabled === "true"
  ) {
    return () => {};
  }

  let teardown = build();
  let disposed = false;

  // Rebuild grids when crossing the mobile/desktop breakpoint (resolution
  // differs per breakpoint; a plain refresh is not enough).
  const mq = window.matchMedia(`(max-width: ${config.mobile.breakpoint}px)`);
  const onMqChange = () => {
    if (disposed) return;
    teardown();
    teardown = build();
  };
  mq.addEventListener("change", onMqChange);

  // Debounced rebuild on resize (cell sizes are computed in px at build time).
  let resizeTimer: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (disposed) return;
      teardown();
      teardown = build();
    }, 200);
  };
  window.addEventListener("resize", onResize, { passive: true });

  // Keep trigger positions accurate once webfonts finish loading.
  document.fonts?.ready.then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    clearTimeout(resizeTimer);
    mq.removeEventListener("change", onMqChange);
    window.removeEventListener("resize", onResize);
    teardown();
  };
}

/** Event dispatched by InitialLoader when the boot sequence completes. */
export const LOADER_COMPLETE_EVENT = "jrk:loader-complete";

/**
 * PixelSectionTransition React Mount Component
 *
 * Defers initialization until InitialLoader releases the scroll lock
 * (`jrk:loader-complete`) so GSAP measures final layout instead of a
 * scroll-locked, mid-load page. Falls back to a timeout if the event was
 * already missed.
 */
export function PixelSectionTransition() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      let started = false;
      const start = () => {
        if (started || typeof window === "undefined") return;
        started = true;
        sectionTransition03(document);
      };

      const loaderDone =
        document.body.style.overflow !== "hidden" &&
        document.body.dataset.loaderActive !== "true";

      if (loaderDone) {
        start();
      } else {
        window.addEventListener(LOADER_COMPLETE_EVENT, start, { once: true });
        // Fallback in case the event never fires (e.g. loader removed in a refactor).
        const fallback = setTimeout(start, 4000);
        return () => {
          clearTimeout(fallback);
          window.removeEventListener(LOADER_COMPLETE_EVENT, start);
        };
      }

      return () => {
        window.removeEventListener(LOADER_COMPLETE_EVENT, start);
      };
    },
    { scope }
  );

  return null;
}

export default PixelSectionTransition;
