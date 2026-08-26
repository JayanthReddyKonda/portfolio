/**
 * @file project.ts
 * @description Type definitions for production engineering projects and benchmarks.
 */

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  metrics: Metric[];
  tags: string[];
  highlights: string[];
  github: string;
  demo?: string;
}

