/**
 * @file experience.ts
 * @description Career track record, academic degrees, certifications, leadership, and languages.
 */

import type {
  WorkExperience,
  EducationRecord,
  CertificationRecord,
  LeadershipActivity,
  LanguageFluency,
} from "@/types/experience";

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    role: "Artificial Intelligence & Machine Learning Virtual Trainee",
    company: "IBM SkillsBuild",
    period: "Sep 2025 – Oct 2025",
    highlights: [
      "Designed an AI-powered study assistant enabling interactive question answering and automated concept explanations using LLM APIs, implementing modular Python services to support concurrent study workflows.",
      "Engineered API-driven pipelines integrating external LLM services for summarization, concept retrieval, prompt orchestration, request routing, and response parsing.",
    ],
  },
];

export const EDUCATION: EducationRecord[] = [
  {
    institution: "VNR Vignana Jyothi Institute of Engineering and Technology",
    degree: "B.Tech, Computer Science and Engineering (AI & ML) • Hyderabad, Telangana",
    grade: "CGPA: 9.1 / 10.0",
    period: "Sep 2024 – Present",
  },
  {
    institution: "Narayana Junior College",
    degree: "Intermediate (Class XII) • Vijayawada, Andhra Pradesh",
    grade: "93% (2022 – 2024)",
    period: "2022 – 2024",
  },
  {
    institution: "Gitanjali (EM) High School",
    degree: "Matriculation (Class X) • Podili, Andhra Pradesh",
    grade: "97.2% (2021 – 2022)",
    period: "2021 – 2022",
  },
];

export const CERTIFICATIONS: CertificationRecord[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    description:
      "Instructed by Andrew Ng via Coursera — Covering Supervised Learning, Advanced Learning Algorithms, Neural Networks, Decision Trees, and Unsupervised Learning / Recommender Systems.",
  },
];

export const LEADERSHIP_ACTIVITIES: LeadershipActivity[] = [
  {
    role: "Technical Volunteer",
    organization: "Krithomedh AI/ML Club",
    description:
      "Organized AI Week '26; authored the official Machine Learning Challenge problem deployed on Kaggle, and designed problem statements for the Vibe Coding Hackathon, engaging 500+ student developers.",
  },
  {
    role: "Competitive Programmer",
    organization: "LeetCode & Codeforces",
    description:
      "Solved 300+ Data Structures and Algorithms problems across Codeforces and LeetCode with strong algorithmic optimization in C++ and Python.",
  },
];

export const LANGUAGES: LanguageFluency[] = [
  { language: "English", proficiency: "Professional / Fluent" },
  { language: "Telugu", proficiency: "Native" },
  { language: "Hindi", proficiency: "Conversational" },
];
