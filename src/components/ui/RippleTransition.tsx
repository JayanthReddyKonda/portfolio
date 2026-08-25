"use client";

/**
 * @file RippleTransition.tsx
 * @description Global Ripple Shockwave Screen Warp & High-Speed Navigation Teleporter.
 * Features:
 * - Intercepts anchor links (#work, #about, etc.) to trigger radial shockwave ripples from click origin.
 * - Hardware-accelerated SVG / CSS expanding wave with emerald & cyan energy halo.
 * - Smooth high-speed section navigation with window scroll behavior.
 */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleTransition() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const triggerRipple = useCallback((x: number, y: number, targetId: string) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y }]);

    // Smooth speedy scroll to target ("top" is handled by the caller).
    if (targetId !== "top") {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.replace("#", "");
        if (targetId === "top") {
          e.preventDefault();
          triggerRipple(e.clientX, e.clientY, "top");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          triggerRipple(e.clientX, e.clientY, targetId);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => document.removeEventListener("click", handleAnchorClick, { capture: true });
  }, [triggerRipple]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 35, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              left: r.x,
              top: r.y,
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderRadius: "9999px",
              border: "2px solid rgba(0, 229, 255, 0.9)",
              boxShadow:
                "0 0 40px rgba(16, 185, 129, 0.8), inset 0 0 30px rgba(0, 229, 255, 0.5)",
              background:
                "radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(16,185,129,0.08) 50%, transparent 80%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default RippleTransition;

