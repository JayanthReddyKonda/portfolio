"use client";

/**
 * @file PixelSectionTransition.tsx
 * @description "Cyber Wipe" — full-screen slat transition between sections (v5).
 *
 * When the viewport crosses a section boundary, six vertical panels sweep UP
 * from the bottom edge and cover the entire screen (staggered left-to-right,
 * each with a glowing teal leading edge), then peel AWAY through the top to
 * reveal the next section. Fully scrubbed to scroll position — reversing the
 * scroll reverses the wipe.
 *
 * Implementation notes:
 * - One fixed-position overlay per section, animated only while its seam is
 *   on screen (opacity gated so hidden overlays cost nothing).
 * - Trigger is the component's own parent container — zero coupling between
 *   sections, no sibling logic, no init races.
 * - GPU-friendly transforms only; useGSAP context reverts on unmount.
 * - prefers-reduced-motion: no overlay is rendered.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SLAT_COUNT = 6;

export function SectionTransition() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const section = root.current?.parentElement;
      const overlay = root.current?.querySelector(".st-overlay");
      if (!section || !overlay) return;

      const slats = overlay.querySelectorAll(".st-slat");

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          // Centered ON the seam crossing: the wipe only begins once the
          // boundary reaches the upper-middle of the viewport (i.e. the next
          // section is genuinely arriving) and completes just after it has
          // fully taken the screen. One full viewport of travel = slow.
          start: "bottom 65%",
          end: "bottom -35%",
          scrub: 1.2, // heavy smoothing = weighty, watchable motion
        },
      });

      // Phase 1 — panels sweep up and cover the screen (staggered L->R).
      tl.set(overlay, { opacity: 1 })
        .fromTo(
          slats,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: "power2.inOut",
          },
          0
        )
        // Covered beat — long enough to register as its own moment.
        .to({}, { duration: 0.3 })
        // Phase 2 — panels peel away through the top (staggered R->L).
        .set(slats, { transformOrigin: "top center" })
        .to(slats, {
          scaleY: 0,
          duration: 0.4,
          stagger: { each: 0.07, from: "end" },
          ease: "power2.inOut",
        })
        .set(overlay, { opacity: 0 });
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden="true" className="contents">
      <div className="st-overlay pointer-events-none fixed inset-0 z-[45] opacity-0">
        <div className="absolute inset-0 grid grid-cols-6">
          {Array.from({ length: SLAT_COUNT }, (_, i) => (
            <div
              key={i}
              className="st-slat h-full w-full origin-bottom"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, #1c2129 0%, #152a2e 100%)"
                    : "linear-gradient(180deg, #222831 0%, #173034 100%)",
                boxShadow:
                  "inset 0 2px 0 rgba(0,173,181,0.55), inset 0 10px 28px rgba(0,173,181,0.12)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionTransition;
