"use client";

/**
 * @file PageTransition.tsx
 * @description Ultra-Clean Figma/Linear-Grade Horizontal Page Transition.
 * 
 * Features:
 * - Minimalist horizontal spatial glide (x: 48px -> 0, opacity: 0 -> 1, blur: 6px -> 0px).
 * - High-speed luxury cubic-bezier easing ([0.16, 1, 0.3, 1]).
 * - Subtle ambient top progress hairline.
 * - Zero visual clutter, zero tacky overlays — clean, fast, and responsive.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {!reduceMotion && (
        /* Top Ambient Hairline Progress Glow */
        <motion.div
          key={`progress-${pathname}`}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="pointer-events-none fixed top-0 inset-x-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-transparent via-[#7ba05b] to-transparent shadow-[0_0_12px_#7ba05b]"
        />
      )}

      {/* Clean Horizontal Spatial Glide */}
      <motion.div
        key={pathname}
        initial={{
          opacity: reduceMotion ? 1 : 0,
          x: reduceMotion ? 0 : 40,
          filter: reduceMotion ? "none" : "blur(4px)",
        }}
        animate={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: reduceMotion ? 0.15 : 0.42,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PageTransition;
