"use client";

/**
 * @file CustomCursor.tsx
 * @description Tactile Dynamic Cursor Context with Clean Page Name Telemetry.
 * Features:
 * - Dynamic Page Name tracking (OVERVIEW, ABOUT, PROJECTS, GALLERY, EXPERIENCE, SKILLS LAB, CONTACT).
 * - Interactive hover contextual actions (OPEN, EXPLORE, VIEW, RUN).
 * - Smooth spring physics with velocity tilt.
 * - Hardware-accelerated GPU transforms.
 */

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type SpringOptions,
} from "framer-motion";

export interface UserCursorProps {
  color?: string;
  textColor?: string;
  size?: number;
  labelTiltStrength?: number;
  pressScale?: number;
}

export function CustomCursor({
  color = "#7ba05b",
  size = 26,
  labelTiltStrength = 22,
  pressScale = 0.88,
}: UserCursorProps) {
  const pathname = usePathname();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hoverAction, setHoverAction] = useState<string | null>(null);

  const getPageName = (path: string) => {
    if (path === "/") return "OVERVIEW";
    if (path === "/about") return "ABOUT";
    if (path === "/work" || path === "/projects") return "PROJECTS";
    if (path === "/gallery") return "GALLERY";
    if (path === "/experience") return "EXPERIENCE";
    if (path === "/skills" || path === "/terminal") return "SKILLS LAB";
    if (path === "/contact") return "CONTACT";
    return path.replace("/", "").toUpperCase();
  };

  const pageLabel = getPageName(pathname);

  // Detect coarse-pointer / touch devices
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsTouchDevice(!!mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  // Hide native cursor across desktop document
  useEffect(() => {
    if (isTouchDevice || typeof document === "undefined") return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isTouchDevice]);

  // Motion coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const pointerVelocityX = useMotionValue(0);
  const pointerVelocityY = useMotionValue(0);
  const lastPosRef = useRef({ x: -100, y: -100, t: 0 });

  const springConfig: SpringOptions = useMemo(
    () => ({
      damping: 38,
      stiffness: 420,
      mass: 0.5,
    }),
    []
  );

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rawTilt = useTransform(
    pointerVelocityX,
    [-1200, 0, 1200],
    [-labelTiltStrength, 0, labelTiltStrength]
  );
  const labelTilt = useSpring(rawTilt, { damping: 20, stiffness: 200 });

  const scaleMotion = useMotionValue(1);
  const labelScale = useSpring(scaleMotion, { damping: 25, stiffness: 350 });

  // Track global mouse position and clickable elements
  useEffect(() => {
    if (isTouchDevice || typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastPosRef.current.t);
      const vx = ((e.clientX - lastPosRef.current.x) / dt) * 1000;
      const vy = ((e.clientY - lastPosRef.current.y) / dt) * 1000;

      pointerVelocityX.set(Math.max(-1500, Math.min(1500, vx)));
      pointerVelocityY.set(Math.max(-1500, Math.min(1500, vy)));

      lastPosRef.current = { x: e.clientX, y: e.clientY, t: now };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-interactive]");
      if (interactive) {
        setHovering(true);
        if (interactive.tagName === "INPUT" || interactive.tagName === "TEXTAREA") {
          setHoverAction("TYPE");
        } else if (interactive.textContent?.toLowerCase().includes("resume")) {
          setHoverAction("DOWNLOAD");
        } else if (interactive.textContent?.toLowerCase().includes("terminal") || interactive.textContent?.toLowerCase().includes("skills")) {
          setHoverAction("EXPLORE");
        } else {
          setHoverAction("OPEN");
        }
      } else {
        setHovering(false);
        setHoverAction(null);
      }
    };

    const handlePointerDown = () => {
      animate(scaleMotion, pressScale, { duration: 0.1 });
    };

    const handlePointerUp = () => {
      animate(scaleMotion, 1, { duration: 0.2 });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isTouchDevice, mouseX, mouseY, pointerVelocityX, pointerVelocityY, pressScale, scaleMotion]);

  if (isTouchDevice) return null;

  const currentDisplayText = hoverAction || pageLabel;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none"
    >
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          scale: labelScale,
          rotate: labelTilt,
        }}
        className="absolute left-0 top-0 will-change-transform"
      >
        {/* Dynamic Page / Action Pill */}
        <motion.div
          animate={{
            scale: hovering ? 1.08 : 1,
            backgroundColor: hovering ? "#7ba05b" : "rgba(13, 76, 60, 0.92)",
            color: hovering ? "#0d4c3c" : "#f4f1eb",
            borderColor: hovering ? "#7ba05b" : "rgba(123, 160, 91, 0.4)",
          }}
          transition={{ duration: 0.15 }}
          className="absolute left-6 top-6 flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_4px_20px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <span
            className={`inline-block size-1.5 rounded-full ${hovering ? "bg-[#0d4c3c]" : "bg-[#7ba05b]"
              }`}
          />
          <span>{currentDisplayText}</span>
        </motion.div>

        {/* Minimal Cyan Pointer Arrow */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,173,181,0.5)]"
        >
          <path
            d="M5 3 L23 14 L14 16 L11 24 Z"
            fill={color}
            stroke="#222831"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default CustomCursor;
