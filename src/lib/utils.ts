/**
 * @file utils.ts
 * @description Core helper utilities for styling, class resolution, and motion presets.
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

