"use client";

/**
 * @file PixelSectionTransition.tsx
 * @description Zero-Leak Direction-Aware GSAP Pixel Transition (sectionTransition03).
 *
 * Zero-Leak Resting State:
 * - When resting inside any section, ALL tiles are guaranteed to be 100% invisible (opacity: 0, scale: 0.15).
 * - Outgoing Cover ONLY activates when the user actively scrolls the section boundary up past the bottom fold
 *   (start: "bottom bottom", end: "bottom -35%").
 * - Incoming Reveal activates as the incoming section rolls up into view (start: "top 100%", end: "top -10%").
 *
 * Directional Dissolve:
 * - Outgoing Section: Bottom -> Up cascade across the full section.
 * - Incoming Section: Top -> Down cascade across the full section.
 *
 * Responsive Resolution:
 * - Desktop: 16 columns (~85px-95px square tiles)
 * - Tablet: 12 columns (~65px square tiles)
 * - Mobile: 8 columns (~45px-50px tactile square tiles)
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function initPixelTransitions() {
  if (typeof window === "undefined") return () => { };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => { };

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const columnCount = isMobile ? 8 : isTablet ? 12 : 16;
  const spread = isMobile ? 3 : 4.5;

  const hash = (i: number) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const createdLayers: HTMLElement[] = [];
  const triggers: ScrollTrigger[] = [];

  const createPixelLayer = (
    section: HTMLElement,
    mode: "cover" | "reveal",
    isLast: boolean = false
  ) => {
    const computedStyles = getComputedStyle(section);
    if (computedStyles.position === "static") {
      section.style.position = "relative";
    }

    const layer = document.createElement("div");
    layer.setAttribute("data-st-03-layer", mode);
    layer.setAttribute("aria-hidden", "true");

    // 100% Full Section Coverage Inset
    Object.assign(layer.style, {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      width: "100%",
      height: "100%",
      zIndex: "25",
      pointerEvents: "none",
      overflow: "hidden",
    });

    section.append(layer);

    const layerWidth = layer.offsetWidth || section.offsetWidth || window.innerWidth;
    const layerHeight = layer.offsetHeight || section.offsetHeight || window.innerHeight;
    const cellSize = layerWidth / columnCount;
    const rowCount = Math.max(Math.ceil(layerHeight / cellSize), 1);

    Object.assign(layer.style, {
      display: "grid",
      gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
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
          "linear-gradient(135deg, rgba(0, 173, 181, 0.92) 0%, rgba(28, 33, 41, 0.97) 100%)",
        border: isMobile ? "0.5px solid rgba(0, 173, 181, 0.35)" : "1px solid rgba(0, 173, 181, 0.32)",
        boxShadow: "0 0 10px rgba(0, 173, 181, 0.2)",
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
        borderRadius: "2px",
        willChange: "transform, opacity",
      });
      layer.append(cell);
      return cell;
    });

    const maxDelay = Math.max(rowCount - 1 + spread, 1);
    const cellDelays = cells.map((_, index) => {
      const row = Math.floor(index / columnCount);
      // Cover (outgoing top section): Dissolves from BOTTOM (rowCount - 1) -> UP (0)
      // Reveal (incoming bottom section): Dissolves from TOP (0) -> DOWN (rowCount - 1)
      const distance = mode === "cover" ? rowCount - 1 - row : row;
      return (distance + hash(index) * spread) / maxDelay;
    });

    // Zero-Leak Initial State: 100% invisible on resting page load
    gsap.set(cells, { opacity: 0, scale: 0.15 });

    if (mode === "cover") {
      // 1. Outgoing Section: ONLY triggers as section bottom scrolls up past viewport bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom 15%",
          scrub: isMobile ? 0.35 : 0.45,
          invalidateOnRefresh: true,
        },
      });

      // Wave In from bottom across full section as section exits
      tl.to(cells, {
        opacity: 1,
        scale: 1,
        stagger: (index) => cellDelays[index] * 0.45,
        ease: "power1.out",
        duration: 0.45,
      });

      // Wave Out (Decay): Dissolves away from bottom up much faster
      tl.to(cells, {
        opacity: 0,
        scale: 0.15,
        stagger: (index) => cellDelays[index] * 0.3,
        ease: "power2.in",
        duration: 0.35,
      });

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    } else {
      // 2. Incoming Section: Triggers as incoming section top enters viewport bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 100%",
          end: isLast ? "top 60%" : "top -25%",
          scrub: isMobile ? 0.65 : 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Wave In over incoming edge
      tl.to(cells, {
        opacity: 1,
        scale: 1,
        stagger: (index) => cellDelays[index] * 0.8,
        ease: "power1.out",
        duration: 0.35,
      });

      // Smooth Top -> Down unmasking & full dissolution
      tl.to(cells, {
        opacity: 0,
        scale: 0.15,
        stagger: (index) => cellDelays[index] * 1.0,
        ease: "power1.inOut",
        duration: 0.65,
      });

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }

    createdLayers.push(layer);
  };

  // Find all sections marked for transitions
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("main > section, footer#contact")
  );

  sections.forEach((section, idx) => {
    // 1. Outgoing Cover Layer (on every section except the very last one)
    if (idx < sections.length - 1) {
      createPixelLayer(section, "cover");
    }

    // 2. Incoming Reveal Layer (on every section except the first hero section)
    if (idx > 0) {
      createPixelLayer(section, "reveal", idx === sections.length - 1);
    }
  });

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((st) => st.kill());
    createdLayers.forEach((layer) => layer.remove());
  };
}

/**
 * PixelSectionTransition React Mount Component
 */
export function PixelSectionTransition() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = () => {
      cleanup?.();
      cleanup = initPixelTransitions();
    };

    const timer = setTimeout(init, 150);

    const onLoaderComplete = () => {
      init();
    };

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };

    window.addEventListener("jrk:loader-complete", onLoaderComplete);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("jrk:loader-complete", onLoaderComplete);
      window.removeEventListener("resize", onResize);
      cleanup?.();
    };
  }, []);

  return null;
}

export const SectionTransition = PixelSectionTransition;
export default PixelSectionTransition;
