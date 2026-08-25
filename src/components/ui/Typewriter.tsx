"use client";

/**
 * @file Typewriter.tsx
 * @description Originkit Kinetic Typewriter Text Component.
 * Types text character by character with configurable hold delay, delete speed,
 * and blinking cursor variants.
 */

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

export type TypewriterProps = {
  texts?: string[];
  prefix?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  showCursor?: boolean;
  cursorChar?: string;
  color?: string;
  typedColor?: string;
  cursorColor?: string;
  style?: React.CSSProperties;
  className?: string;
};

const COMPONENT_DEFAULTS = {
  prefix: "",
  color: "#FFFFFF",
  texts: [
    "AI/ML Systems Engineer",
    "Distributed Backend Architect",
    "FastAPI & Qdrant Specialist",
    "Real-Time WebSockets Engineer",
  ],
  typedColor: "#10b981",
  typeSpeed: 0.06,
  deleteSpeed: 0.04,
  holdTime: 1.6,
  showCursor: true,
  cursorChar: "_",
  cursorColor: "#10b981",
};

export function Typewriter(props: TypewriterProps) {
  const {
    texts = COMPONENT_DEFAULTS.texts,
    prefix = COMPONENT_DEFAULTS.prefix,
    typeSpeed = COMPONENT_DEFAULTS.typeSpeed,
    deleteSpeed = COMPONENT_DEFAULTS.deleteSpeed,
    holdTime = COMPONENT_DEFAULTS.holdTime,
    showCursor = COMPONENT_DEFAULTS.showCursor,
    cursorChar = COMPONENT_DEFAULTS.cursorChar,
    color = COMPONENT_DEFAULTS.color,
    typedColor = COMPONENT_DEFAULTS.typedColor,
    cursorColor = COMPONENT_DEFAULTS.cursorColor,
    style,
    className,
  } = props;

  const typeDelayMs = Math.max(10, typeSpeed * 1000);
  const holdMs = Math.max(100, holdTime * 1000);
  const deleteDelayMs = Math.max(10, deleteSpeed * 1000);

  const list: string[] = (texts ?? []).filter(
    (t): t is string => typeof t === "string" && t.length > 0
  );
  const hasTexts = list.length > 0;

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!hasTexts) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const currentText = list[currentTextIndex] ?? "";

    if (isDeleting) {
      if (displayText === "") {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % list.length);
          setCurrentIndex(0);
        }, 250);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteDelayMs);
      }
    } else {
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, typeDelayMs);
      } else if (list.length > 1) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, holdMs);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    currentIndex,
    displayText,
    isDeleting,
    typeDelayMs,
    deleteDelayMs,
    holdMs,
    currentTextIndex,
    hasTexts,
    list,
  ]);

  const cursorAnimationVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {prefix ? <span style={{ color }}>{prefix}&nbsp;</span> : null}
      <span style={{ color: typedColor }}>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          initial="initial"
          animate="animate"
          style={{
            color: cursorColor,
            marginLeft: "0.15rem",
            fontWeight: "bold",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
}

export default Typewriter;
