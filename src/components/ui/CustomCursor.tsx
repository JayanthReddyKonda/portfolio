"use client";

/**
 * @file CustomCursor.tsx
 * @description Originkit UserCursor with Precision Dynamic Section Context.
 * Features:
 * - Ultra-high z-index (z-[99999]) ensuring cursor visibility over Navbar and all UI layers.
 * - Accurate IntersectionObserver section detection:
 *   • Hero: "Jayanth // AI Systems"
 *   • About: "01 // Profile & Stack"
 *   • Work: "02 // Selected Systems"
 *   • Experience: "03 // Experience & Rigor"
 *   • Terminal: "04 // CLI Diagnostics"
 *   • Contact / Footer: "05 // Transmissions"
 * - Direction-aware inertia tilt and tactile click scaling.
 */

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type SpringOptions,
} from "motion/react";

export interface UserCursorProps {
  color?: string;
  textColor?: string;
  size?: number;
  labelTiltStrength?: number;
  pressScale?: number;
}

export function CustomCursor({
  color = "#10b981",
  textColor = "#050505",
  size = 26,
  labelTiltStrength = 22,
  pressScale = 0.88,
}: UserCursorProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [sectionLabel, setSectionLabel] = useState("Jayanth // AI Systems");

  // Detect coarse-pointer / touch devices
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsTouchDevice(!!mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  // Hide native cursor across the document on desktop
  useEffect(() => {
    if (isTouchDevice || typeof document === "undefined") return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isTouchDevice]);

  // Precision Section Detection using IntersectionObserver + Scroll Fallback
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionMap: Record<string, string> = {
      hero: "Jayanth // AI Systems",
      about: "01 // Profile & Stack",
      work: "02 // Selected Systems",
      experience: "03 // Experience & Rigor",
      terminal: "04 // CLI Diagnostics",
      contact: "05 // Transmissions",
    };

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight * 0.4;

      if (scrollY < 200) {
        setSectionLabel("Jayanth // AI Systems");
        return;
      }

      const sections = ["contact", "terminal", "experience", "work", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const bottom = top + rect.height;

          if (viewportCenter >= top && viewportCenter <= bottom) {
            setSectionLabel(sectionMap[id] || "Jayanth // AI Systems");
            return;
          }
        }
      }
    };

    // rAF-throttled scroll handling: one layout read pass per frame max.
    let ticking = false;
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateActiveSection();
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener("scroll", requestUpdate);
  }, []);

  // Spring physics configurations
  const arrowSpring = useMemo<SpringOptions>(
    () => ({ stiffness: 440, damping: 30, mass: 0.5 }),
    []
  );
  const labelSpringCfg = useMemo<SpringOptions>(
    () => ({ stiffness: 220, damping: 24, mass: 0.7 }),
    []
  );

  // Raw pointer coordinates
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // Smoothed spring positions
  const arrowX = useSpring(mouseX, arrowSpring);
  const arrowY = useSpring(mouseY, arrowSpring);
  const labelX = useSpring(mouseX, labelSpringCfg);
  const labelY = useSpring(mouseY, labelSpringCfg);

  // Press scale animation
  const scaleMV = useMotionValue(1);
  useEffect(() => {
    const controls = animate(scaleMV, pressed ? pressScale : 1, {
      type: "spring",
      stiffness: 500,
      damping: 28,
      mass: 0.5,
    });
    return () => controls.stop();
  }, [pressed, pressScale, scaleMV]);

  // Direction-aware label velocity tilt
  const labelTiltTarget = useMotionValue(0);
  const labelRotation = useSpring(labelTiltTarget, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const lastSampleRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    if (isTouchDevice || typeof window === "undefined") return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const now = performance.now();
      const last = lastSampleRef.current;
      let vx = 0;
      let vy = 0;
      if (last) {
        const dt = Math.max(1, now - last.t);
        vx = ((x - last.x) / dt) * 1000;
        vy = ((y - last.y) / dt) * 1000;
      }
      lastSampleRef.current = { x, y, t: now };

      mouseX.set(x);
      mouseY.set(y);

      // Velocity-dependent label tilt
      const speed = Math.hypot(vx, vy);
      const norm = Math.min(1, speed / 1400);
      const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
      labelTiltTarget.set(sign * norm * labelTiltStrength);

      setHovering(true);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setHovering(false);
      lastSampleRef.current = null;
      labelTiltTarget.set(0);
    };
    const onEnter = () => setHovering(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      setPressed(false);
    };
  }, [isTouchDevice, labelTiltStrength, mouseX, mouseY, labelTiltTarget]);

  // Label offset relative to cursor tip
  const labelOffsetX = size * 0.85;
  const labelOffsetY = size * 0.25 + 4;

  const labelTranslateX = useTransform(labelX, (v) => v + labelOffsetX);
  const labelTranslateY = useTransform(labelY, (v) => v + labelOffsetY);

  if (isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block"
    >
      {/* Trailing Name Pill Badge with dynamic section label */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: labelTranslateX,
          y: labelTranslateY,
          rotate: labelRotation,
          scale: scaleMV,
          background: color,
          borderRadius: 999,
          padding: `${size * 0.16}px ${size * 0.38}px`,
          boxShadow:
            "0 4px 20px rgba(16,185,129,0.45), 0 2px 4px rgba(0,0,0,0.5)",
          opacity: hovering ? 1 : 0,
          transformOrigin: "0% 50%",
          transition: "opacity 140ms ease",
          willChange: "transform, opacity",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: Math.max(9, size * 0.42),
            lineHeight: 1.15,
            fontWeight: 700,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
          }}
        >
          {sectionLabel}
        </div>
      </motion.div>

      {/* Primary Arrow Glyph Cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: arrowX,
          y: arrowY,
          scale: scaleMV,
          width: size,
          height: size,
          opacity: hovering ? 1 : 0,
          transformOrigin: "0% 0%",
          transition: "opacity 140ms ease",
          willChange: "transform, opacity",
          pointerEvents: "none",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", overflow: "visible" }}
        >
          <path
            d="M5 3 L23 14 L14 16 L11 24 Z"
            fill={color}
            stroke="#000000"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default CustomCursor;
