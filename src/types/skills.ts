/**
 * @file skills.ts
 * @description Type definitions for technical competencies, sticker badges, and taxonomy.
 */

export interface SkillItem {
  label: string;
  desc: string;
}

export interface StickerBadge {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
}

