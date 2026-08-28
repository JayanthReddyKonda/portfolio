"use client";

/**
 * @file StickerPeel.tsx
 * @description Static Sticker Badge Component — clean SVG/Image display with subtle hover lift.
 * Replaces the 3D WebGL peel animation with a lightweight static component.
 */

import React, { useState } from "react";
import { STICKER_BADGES } from "@/data/stickerImages";

const DEFAULT_IMAGE = STICKER_BADGES.pytorch;

const resolveImageSource = (input: unknown): string | undefined => {
  if (!input) return undefined;
  if (typeof input === "string") return input.trim() || undefined;
  if (typeof input === "object" && input !== null && "src" in input) {
    return (input as { src?: string }).src || undefined;
  }
  return undefined;
};

export interface StickerPeelProps {
  image?: unknown;
  imageWidth?: number;
  imageHeight?: number;
  backColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function StickerPeel({
  image = DEFAULT_IMAGE,
  imageWidth = 130,
  imageHeight = 130,
  backColor = "#1b4b3e",
  style,
  className,
}: StickerPeelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedImageUrl = resolveImageSource(image) || DEFAULT_IMAGE;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      style={{
        width: imageWidth,
        height: imageHeight,
        ...style,
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Sticker image with subtle hover lift */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          backgroundColor: backColor,
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(123,160,91,0.3)"
            : "0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(123,160,91,0.25)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHovered ? "translateY(-8px) rotate(-2deg)" : "translateY(0) rotate(0deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          border: "1px solid rgba(123, 160, 91, 0.3)",
        }}
      >
        <img
          src={resolvedImageUrl}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* Subtle corner accent on hover */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#7ba05b",
            boxShadow: "0 0 12px #7ba05b",
            opacity: 0.9,
          }}
        />
      )}
    </div>
  );
}

export default StickerPeel;