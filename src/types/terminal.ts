/**
 * @file terminal.ts
 * @description Type definitions for interactive CLI diagnostics terminal.
 */

import type React from "react";

export interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export interface PresetCommand {
  label: string;
  cmd: string;
}

