"use client";

/**
 * @file CameraController.tsx
 * @description GSAP ScrollTrigger Camera Rig for the 3D Avatar Hero stage.
 * Controls 3D camera translation, depth perception, and smooth easing as the user
 * navigates through the initial hero experience.
 */

import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Camera Controller orchestrates subtle 3D parallax on scroll.
 */
export function CameraController() {
  const { camera } = useThree();

  useGSAP(() => {
    // NOTE: never call ScrollTrigger.killAll()/getAll().forEach(kill) here —
    // this canvas mounts alongside other GSAP systems (PixelSectionTransition)
    // and killing globally would destroy their triggers. gsap.context scopes
    // creation AND revert cleans up only what this component created.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "50% top",
          scrub: 1.5,
        },
      });

      // Default Hero Camera: Framed cleanly with zero edge clipping
      tl.set(camera.position, { x: 0, y: 0.4, z: 7 });
      tl.set(camera.rotation, { x: 0, y: 0, z: 0 });

      // Smooth cinematic camera drift on initial scroll
      tl.to(
        camera.position,
        {
          x: 0.2,
          y: 0.1,
          z: 8.2,
          ease: "power2.out",
        },
      );
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

export default CameraController;