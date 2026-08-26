"use client";

/**
 * Lighting rig for the Engine Room (DESIGN.md §3 — Scene).
 *
 * Fully self-contained cinematic 3-point lighting setup with cool rim accent
 * and soft ambient fill — renders instantly with 0 external network dependencies.
 */
export function EnvironmentSetup() {
  return (
    <>
      {/* Ambient floor */}
      <ambientLight intensity={0.7} color="#ffffff" />

      {/* Main Key Light: crisp cool white from top-front-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.2}
        color="#EEEEEE"
      />

      {/* Fill Light: softer neutral fill from left */}
      <directionalLight
        position={[-5, 3, 3]}
        intensity={1.0}
        color="#393E46"
      />

      {/* Rim / Hair Light: teal backlight for silhouette definition */}
      <spotLight
        position={[0, 6, -4]}
        angle={0.6}
        penumbra={0.8}
        intensity={25}
        color="#00ADB5"
      />

      {/* Front Accent Spot aimed at the character area */}
      <spotLight
        position={[2, 4, 6]}
        angle={0.45}
        penumbra={0.9}
        intensity={35}
        color="#ffffff"
      />
    </>
  );
}

export default EnvironmentSetup;
