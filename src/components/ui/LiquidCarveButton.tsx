"use client";

/**
 * @file LiquidCarveButton.tsx
 * @description Premium Liquid Carve Glass Button with tactile fluid refraction,
 * dynamic edge specular highlights, and cyber glow feedback.
 */

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface LiquidCarveButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function LiquidCarveButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  glow = true,
  className = "",
  onClick,
  href,
  target,
  rel,
  ...props
}: LiquidCarveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl",
  }[size];

  const variantStyles = {
    primary: {
      base: "bg-gradient-to-b from-[#00ADB5]/20 to-[#00ADB5]/5 border-[#00ADB5]/40 text-[#EEEEEE]",
      glow: "rgba(0, 173, 181, 0.45)",
      sheen: "rgba(0, 173, 181, 0.35)",
    },
    accent: {
      base: "bg-[#00ADB5] border-[#00ADB5] text-[#222831] font-semibold hover:bg-[#00c4ce]",
      glow: "rgba(0, 173, 181, 0.6)",
      sheen: "rgba(255, 255, 255, 0.4)",
    },
    secondary: {
      base: "bg-white/[0.04] border-white/15 text-[#EEEEEE] hover:bg-white/[0.08]",
      glow: "rgba(255, 255, 255, 0.2)",
      sheen: "rgba(255, 255, 255, 0.25)",
    },
    ghost: {
      base: "bg-transparent border-transparent text-[#EEEEEE] hover:bg-white/[0.05]",
      glow: "rgba(0, 173, 181, 0.2)",
      sheen: "rgba(255, 255, 255, 0.15)",
    },
  }[variant];

  const content = (
    <>
      {/* Liquid Sheen Refraction Layer */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${mousePos.x}% ${mousePos.y}%, ${variantStyles.sheen}, transparent 70%)`,
        }}
      />

      {/* Top Highlight Carve Edge */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      {/* Bottom Inset Shadow */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-black/40" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-[inherit]">
        {icon && iconPosition === "left" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const sharedClassName = `
    group relative inline-flex items-center justify-center font-mono font-medium
    border backdrop-blur-xl shadow-lg transition-all duration-300
    overflow-hidden select-none cursor-pointer
    ${sizeClasses}
    ${variantStyles.base}
    ${className}
  `;

  const motionProps = {
    whileHover: {
      scale: 1.03,
      boxShadow: glow ? `0 0 25px ${variantStyles.glow}` : undefined,
    },
    whileTap: { scale: 0.97 },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={sharedClassName}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={sharedClassName}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export default LiquidCarveButton;
