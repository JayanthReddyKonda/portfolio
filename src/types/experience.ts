/**
 * @file experience.ts
 * @description Type definitions for career experience, academics, certifications, and leadership.
 */

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface EducationRecord {
  institution: string;
  degree: string;
  grade: string;
  period: string;
}

export interface CertificationRecord {
  title: string;
  issuer: string;
  description: string;
}

export interface LeadershipActivity {
  role: string;
  organization: string;
  description: string;
}

export interface LanguageFluency {
  language: string;
  proficiency: string;
}
