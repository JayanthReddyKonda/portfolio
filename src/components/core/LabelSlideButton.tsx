"use client";

/**
 * @file LabelSlideButton.tsx
 * @description Official Originkit Label Slide Button with Emerald Sophistication theme integration.
 * 
 * Features:
 * - Label rolls smoothly between dual duplicate spans with Framer Motion imperative useAnimate.
 * - Icon badge swaps resting symbol/icon for hover symbol along precise movement vector angle.
 * - Native Emerald Sophistication presets (accent, primary, secondary, ghost) and full custom styling.
 */

import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useAnimate, useReducedMotion, type Transition } from "framer-motion";

const borderColorOf = (b: unknown): string => {
  if (b && typeof b === "object" && "borderColor" in b) {
    return String((b as Record<string, unknown>).borderColor ?? "transparent");
  }
  return "transparent";
};

const borderBoxOf = (b: unknown): React.CSSProperties => {
  if (b && typeof b === "object") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { borderColor, ...rest } = b as Record<string, unknown>;
    return rest as React.CSSProperties;
  }
  return {};
};

const DEFAULT_TRANSITION: Transition = {
  type: "tween",
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};

const ICON_TRANSITION: Transition = { duration: 0.25, ease: "easeInOut" };

export interface ButtonColors {
  fill?: string;
  textColor?: string;
  hoverFill?: string;
  hoverTextColor?: string;
}

export interface IconSettings {
  type?: "symbol" | "image";
  restSymbol?: string;
  hoverSymbol?: string;
  restImage?: string | { src: string };
  hoverImage?: string | { src: string };
  color?: string;
  hoverColor?: string;
  size?: number;
  padding?: number;
  rounded?: number;
  background?: string;
  hoverBackground?: string;
  angle?: number;
  side?: "left" | "right";
  position?: "left" | "right";
}

export interface LabelSlideButtonProps {
  label?: string;
  children?: React.ReactNode;
  variant?: "accent" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textSide?: "top" | "bottom";
  font?: React.CSSProperties;
  padding?: string;
  rounded?: number;
  colors?: ButtonColors;
  border?: Record<string, unknown>;
  hoverBorderColor?: string;
  addIcon?: boolean;
  icon?: IconSettings | React.ReactNode;
  gap?: number;
  link?: string;
  href?: string;
  transition?: Transition;
  newTab?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
}

const radiusFromPercent = (w: number, h: number, pct: number) =>
  (Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const normalizeAngle = (deg: number | string | undefined): number => {
  const parsed = typeof deg === "number" ? deg : parseFloat(String(deg ?? ""));
  if (!Number.isFinite(parsed)) return 315;
  return ((parsed % 360) + 360) % 360;
};

const ARROW_ANGLES: Record<string, number> = {
  "↗": 315,
  "→": 0,
  "↘": 45,
  "↓": 90,
  "↙": 135,
  "←": 180,
  "↖": 225,
  "↑": 270,
};

const arrowAngleOf = (symbol: string): number | undefined =>
  ARROW_ANGLES[symbol.trim()];

export function LabelSlideButton(props: LabelSlideButtonProps) {
  const {
    label: labelProp,
    children,
    variant = "primary",
    size = "md",
    showText = true,
    textSide = "top",
    font,
    padding: paddingProp,
    rounded = 100,
    colors: colorsProp,
    border: borderProp,
    hoverBorderColor: hoverBorderColorProp,
    addIcon: addIconProp,
    icon: iconProp,
    gap: gapProp,
    link,
    href,
    transition = DEFAULT_TRANSITION,
    newTab = false,
    target,
    rel,
    className = "",
    onClick,
    style,
  } = props;

  // Resolve effective label & link
  const effectiveLink = href || link || "";
  const isStringChildren = typeof children === "string";
  const displayLabel = labelProp || (isStringChildren ? (children as string) : "");

  // Emerald Sophistication Palette Presets
  const variantPalettes = useMemo(
    () =>
    ({
      accent: {
        fill: "#7ba05b",
        textColor: "#0d4c3c",
        hoverFill: "#f4f1eb",
        hoverTextColor: "#0d4c3c",
        borderColor: "rgba(123, 160, 91, 0.6)",
        hoverBorderColor: "#f4f1eb",
        iconBg: "#0d4c3c",
        iconColor: "#f4f1eb",
        hoverIconBg: "#7ba05b",
        hoverIconColor: "#0d4c3c",
      },
      primary: {
        fill: "#1b4b3e",
        textColor: "#f4f1eb",
        hoverFill: "#7ba05b",
        hoverTextColor: "#0d4c3c",
        borderColor: "rgba(244, 241, 235, 0.15)",
        hoverBorderColor: "rgba(123, 160, 91, 0.8)",
        iconBg: "#2d5a4a",
        iconColor: "#f4f1eb",
        hoverIconBg: "#0d4c3c",
        hoverIconColor: "#f4f1eb",
      },
      secondary: {
        fill: "#2d5a4a",
        textColor: "#f4f1eb",
        hoverFill: "#7ba05b",
        hoverTextColor: "#0d4c3c",
        borderColor: "rgba(123, 160, 91, 0.3)",
        hoverBorderColor: "#7ba05b",
        iconBg: "#1b4b3e",
        iconColor: "#7ba05b",
        hoverIconBg: "#0d4c3c",
        hoverIconColor: "#f4f1eb",
      },
      ghost: {
        fill: "transparent",
        textColor: "#f4f1eb",
        hoverFill: "#1b4b3e",
        hoverTextColor: "#f4f1eb",
        borderColor: "rgba(244, 241, 235, 0.12)",
        hoverBorderColor: "rgba(123, 160, 91, 0.5)",
        iconBg: "rgba(244, 241, 235, 0.08)",
        iconColor: "#f4f1eb",
        hoverIconBg: "#7ba05b",
        hoverIconColor: "#0d4c3c",
      },
    }[variant]),
    [variant]
  );

  // Sizing Presets
  const sizePresets = useMemo(
    () =>
    ({
      sm: {
        padding: "6px 14px",
        fontSize: 12,
        glyphSize: 12,
        badgePadding: 5,
        gap: 8,
      },
      md: {
        padding: "10px 20px",
        fontSize: 13,
        glyphSize: 14,
        badgePadding: 7,
        gap: 10,
      },
      lg: {
        padding: "14px 26px",
        fontSize: 15,
        glyphSize: 16,
        badgePadding: 8,
        gap: 12,
      },
    }[size]),
    [size]
  );

  const padding = paddingProp || sizePresets.padding;
  const gap = gapProp !== undefined ? gapProp : sizePresets.gap;
  const addIcon = addIconProp !== undefined ? addIconProp : true;

  const isIconObject = iconProp && typeof iconProp === "object" && !React.isValidElement(iconProp);
  const iconSettings: IconSettings = useMemo(
    () => (isIconObject ? (iconProp as IconSettings) : {}),
    [iconProp, isIconObject]
  );

  const iconType = iconSettings.type || "symbol";
  const restSymbol = iconSettings.restSymbol || "↗";
  const hoverSymbol = iconSettings.hoverSymbol || "↗";
  const iconColor = iconSettings.color || variantPalettes.iconColor;
  const hoverIconColor = iconSettings.hoverColor || variantPalettes.hoverIconColor;
  const iconSizeProp = iconSettings.size || sizePresets.glyphSize;
  const iconPaddingProp = iconSettings.padding || sizePresets.badgePadding;
  const iconRounded = iconSettings.rounded !== undefined ? iconSettings.rounded : 100;
  const iconBg = iconSettings.background || variantPalettes.iconBg;
  const hoverIconBg = iconSettings.hoverBackground || variantPalettes.hoverIconBg;
  const moveAngleProp = iconSettings.angle || 315;
  const iconPosition = iconSettings.side || iconSettings.position || "right";

  const [scope, animate] = useAnimate();
  const labelUpRef = useRef<HTMLSpanElement>(null);
  const labelDownRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const iconOutRef = useRef<HTMLSpanElement>(null);
  const iconInRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef(false);
  const reducedMotion = useReducedMotion();

  const defaultFont: React.CSSProperties = useMemo(
    () => ({
      fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, monospace)",
      fontSize: sizePresets.fontSize,
      fontWeight: 600,
      letterSpacing: "0.06em",
      lineHeight: "1.2em",
      textTransform: "uppercase",
    }),
    [sizePresets.fontSize]
  );

  const fontStyles = useMemo(() => ({ ...defaultFont, ...(font ?? {}) }), [defaultFont, font]);

  const glyphSize = Math.max(1, Math.round(iconSizeProp));
  const iconRadius = radiusFromPercent(glyphSize, glyphSize, iconRounded);
  const iconPadding = Math.max(0, Math.round(iconPaddingProp));
  const badgeSize = glyphSize + iconPadding * 2;
  const badgeRadius = `${Math.max(0, Math.min(100, Math.round(iconRounded))) / 2}%`;

  const moveAngle = normalizeAngle(moveAngleProp);
  const travel = (glyphSize + 2) * 1.5;
  const travelX = Math.cos((moveAngle * Math.PI) / 180) * travel;
  const travelY = Math.sin((moveAngle * Math.PI) / 180) * travel;

  const labelExit = textSide === "bottom" ? "100%" : "-100%";
  const labelEnter = textSide === "bottom" ? "-100%" : "100%";

  const fill = colorsProp?.fill || variantPalettes.fill;
  const textColor = colorsProp?.textColor || variantPalettes.textColor;
  const hoverFill = colorsProp?.hoverFill || variantPalettes.hoverFill;
  const hoverTextColor = colorsProp?.hoverTextColor || variantPalettes.hoverTextColor;

  const border = useMemo(
    () =>
      borderProp || {
        borderColor: variantPalettes.borderColor,
        borderStyle: "solid",
        borderWidth: "1px",
      },
    [borderProp, variantPalettes.borderColor]
  );

  const resolvedHoverBorderColor =
    hoverBorderColorProp || variantPalettes.hoverBorderColor || borderColorOf(border);

  const opts = useCallback(
    (): Transition => (reducedMotion ? { duration: 0 } : transition),
    [reducedMotion, transition]
  );

  const apply = useCallback(
    (toHover: boolean, instant: boolean) => {
      const t: Transition = instant ? { duration: 0 } : opts();
      const it: Transition =
        instant || reducedMotion ? { duration: 0 } : ICON_TRANSITION;

      const rootColors = {
        backgroundColor: toHover ? hoverFill : fill,
        color: toHover ? hoverTextColor : textColor,
        borderColor: toHover ? resolvedHoverBorderColor : borderColorOf(border),
      };
      const badgeColors = {
        backgroundColor: toHover ? hoverIconBg : iconBg,
        color: toHover ? hoverIconColor : iconColor,
      };

      const element = document.getElementById(scope.current?.id || "");
      if (instant && element) {
        Object.assign(element.style, rootColors);
        if (badgeRef.current) Object.assign(badgeRef.current.style, badgeColors);
      }

      if (scope.current && !instant) {
        animate(scope.current, rootColors, t);
      }
      if (labelUpRef.current) {
        animate(labelUpRef.current, { y: toHover ? labelExit : "0%" }, t);
      }
      if (labelDownRef.current) {
        animate(labelDownRef.current, { y: toHover ? "0%" : labelEnter }, t);
      }
      if (badgeRef.current && !instant) {
        animate(badgeRef.current, badgeColors, t);
      }
      if (iconOutRef.current) {
        animate(
          iconOutRef.current,
          {
            x: toHover ? travelX : 0,
            y: toHover ? travelY : 0,
            opacity: toHover ? 0 : 1,
          },
          it
        );
      }
      if (iconInRef.current) {
        animate(
          iconInRef.current,
          {
            x: toHover ? 0 : -travelX,
            y: toHover ? 0 : -travelY,
            opacity: toHover ? 1 : 0,
          },
          it
        );
      }
    },
    [
      animate,
      scope,
      opts,
      reducedMotion,
      fill,
      hoverFill,
      textColor,
      hoverTextColor,
      border,
      resolvedHoverBorderColor,
      iconBg,
      hoverIconBg,
      iconColor,
      hoverIconColor,
      travelX,
      travelY,
      labelExit,
      labelEnter,
    ]
  );

  useIsoLayoutEffect(() => {
    if (hovered.current) return;
    apply(false, true);
  }, [apply, showText, addIcon]);

  const onEnter = () => {
    hovered.current = true;
    apply(true, false);
  };

  const onLeave = () => {
    hovered.current = false;
    apply(false, false);
    if (scope.current) {
      animate(scope.current, { scale: 1 }, opts());
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (e.currentTarget.matches(":focus-visible")) onEnter();
  };

  const onBlur = () => {
    if (hovered.current) onLeave();
  };

  const isLink = Boolean(effectiveLink);
  const Tag = isLink ? "a" : "button";
  const tagProps = {
    "aria-label": showText ? undefined : displayLabel || undefined,
    ...(isLink
      ? {
        href: effectiveLink,
        target: target || (newTab ? "_blank" : undefined),
        rel: rel || (newTab ? "noopener noreferrer" : undefined),
      }
      : { type: "button" as const }),
  };

  const renderIcon = (symbol: string, image?: string | { src: string }) => {
    const src = typeof image === "string" ? image : image?.src;
    if (iconType === "image" && src) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          style={{
            width: glyphSize,
            height: glyphSize,
            objectFit: iconRadius > 0 ? "cover" : "contain",
            borderRadius: Math.min(iconRadius, glyphSize / 2),
            display: "block",
            pointerEvents: "none",
          }}
        />
      );
    }

    const arrowAngle = iconType === "symbol" ? arrowAngleOf(symbol) : undefined;
    if (arrowAngle !== undefined) {
      const rotation = arrowAngle - 315;
      return (
        <svg
          width={glyphSize}
          height={glyphSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            display: "block",
            transform: `rotate(${rotation}deg)`,
            pointerEvents: "none",
          }}
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );
    }

    return (
      <span
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: glyphSize,
          lineHeight: 1,
          color: "currentColor",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        {symbol}
      </span>
    );
  };

  return (
    <Tag
      {...tagProps}
      ref={scope}
      onClick={onClick}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerDown={() =>
        scope.current && animate(scope.current, { scale: 0.97 }, opts())
      }
      onPointerUp={() =>
        scope.current && animate(scope.current, { scale: 1 }, opts())
      }
      className={`group relative inline-flex items-center justify-center select-none cursor-pointer rounded-full transition-shadow duration-200 active:scale-95 ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: iconPosition === "left" ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: showText && addIcon ? `${gap}px` : 0,
        padding,
        borderRadius: rounded ? `${rounded}px` : "9999px",
        ...borderBoxOf(border),
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        boxSizing: "border-box",
        willChange: "transform",
        ...fontStyles,
        minWidth: "min-content",
        minHeight: "min-content",
        ...style,
      }}
    >
      {showText && (
        <span
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {/* Spacer span */}
          <span style={{ visibility: "hidden" }}>{displayLabel}</span>
          <span
            ref={labelUpRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayLabel}
          </span>
          <span
            ref={labelDownRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${labelEnter})`,
            }}
          >
            {displayLabel}
          </span>
        </span>
      )}

      {addIcon && (
        <span
          ref={badgeRef}
          style={{
            position: "relative",
            flexShrink: 0,
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeRadius,
            overflow: "hidden",
          }}
        >
          <span
            ref={iconOutRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderIcon(restSymbol, iconSettings.restImage)}
          </span>
          <span
            ref={iconInRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
            }}
          >
            {renderIcon(hoverSymbol, iconSettings.hoverImage)}
          </span>
        </span>
      )}
    </Tag>
  );
}

export default LabelSlideButton;

