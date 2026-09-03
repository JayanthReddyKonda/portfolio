# SEO Strategy & Search Engine Metadata Specifications

This document outlines the search engine optimization (SEO) architecture, semantic metadata standards, structured data graph, and crawling rules implemented across the platform.

---

## 1. Technical SEO Architecture

The SEO implementation follows a multi-tiered indexing and discovery strategy:

* **Static Route Prerendering**: Every route segment is generated at build time with comprehensive metadata baked directly into static HTML responses, ensuring instant readability for Googlebot and other web crawlers.
* **Canonical URL Authority**: Every route explicitly declares its canonical URL to prevent indexing fragmentation and duplicate content penalties.
* **Metadata Route Handlers**: Next.js native metadata handlers generate dynamic sitemaps, robots rules, and web manifests at runtime:
  * `src/app/sitemap.ts` → Dynamic XML sitemap with per-route change frequencies and priority scores.
  * `src/app/robots.ts` → Search bot crawl permissions and direct sitemap reference.
  * `src/app/manifest.ts` → Progressive Web App (PWA) manifest with branding tokens.

---

## 2. Schema.org JSON-LD Structured Data Graph

A unified semantic JSON-LD entity graph is embedded in the root document `<head>`, enabling search engines to construct rich knowledge graph entries:

### Core Entity Definitions

1. **`Person` Schema**:
   * **Identity**: Jayanth Reddy Konda (`alternateName: ["JRK", "Jayanth Konda"]`).
   * **Role**: AI/ML Systems Engineer & Distributed Backend Architect.
   * **Affiliations**: Alumni of *VNR Vignana Jyothi Institute of Engineering and Technology*.
   * **Verifiable Profiles (`sameAs`)**: Direct links to GitHub and LinkedIn profiles for domain authority and entity verification.
   * **Expertise Matrix (`knowsAbout`)**: Enumerated technical specialties (FastAPI, Qdrant Vector Database, Retrieval-Augmented Generation, PyTorch, PostgreSQL, Docker, Distributed Systems).

2. **`WebSite` Schema**:
   * **Publisher**: Connected directly to the `Person` entity graph node (`@id: /#person`).
   * **Language & Locality**: Explicitly defined as `en-US` with complete site URL identifiers.

---

## 3. Social Graph & Rich Link Previews

The platform generates high-fidelity preview cards for social media networks, messaging platforms (Slack, Discord, Telegram), and search results:

* **OpenGraph Protocol**:
  * Rich card titles, localized descriptions, and high-resolution banner image metadata (`1200x630px` format).
* **Twitter / X Cards**:
  * `summary_large_image` format with author attribution and descriptive copy.
* **PWA & Mobile Search Discoverability**:
  * Dedicated high-resolution PNG icons (`192x192` and `512x512` maskable icons) and Emerald Sophistication theme color tokens (`#0d4c3c`).

---

## 4. Crawl Priority & Update Frequency Matrix

| Route | Canonical Path | Crawl Priority | Change Frequency |
| :--- | :--- | :--- | :--- |
| **Overview (Hero)** | `/` | `1.00` | Weekly |
| **Production Work** | `/work` | `0.95` | Weekly |
| **Skills & Diagnostics** | `/skills` | `0.90` | Weekly |
| **Profile & Vision** | `/about` | `0.85` | Monthly |
| **Experience & Credentials** | `/experience` | `0.85` | Monthly |
| **Transmission Lines** | `/contact` | `0.80` | Monthly |
| **Visual Blueprints** | `/gallery` | `0.75` | Monthly |

