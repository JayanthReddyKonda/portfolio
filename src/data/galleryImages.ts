/**
 * @file galleryImages.ts
 * @description Local high-definition SVG Architecture Blueprint textures in Emerald Sophistication.
 * 100% self-contained, zero external network requests, instant offline rendering.
 */

function createSvgDataUri(title: string, subtitle: string, tag: string, color: string, iconPaths: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d4c3c" />
        <stop offset="100%" stop-color="#082b22" />
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#7ba05b" stop-opacity="0.3" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244,241,235,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    
    <!-- Background & Grid -->
    <rect width="800" height="600" fill="url(#bg)"/>
    <rect width="800" height="600" fill="url(#grid)"/>
    
    <!-- Outer Glass Border -->
    <rect x="24" y="24" width="752" height="552" rx="28" fill="none" stroke="rgba(244,241,235,0.15)" stroke-width="2"/>
    <rect x="28" y="28" width="744" height="544" rx="24" fill="rgba(45,90,74,0.2)"/>
    
    <!-- Top System Telemetry Header -->
    <text x="56" y="72" fill="${color}" font-family="monospace" font-size="14" font-weight="bold" letter-spacing="4">SYS // ${tag}</text>
    <circle cx="730" cy="68" r="5" fill="${color}"/>
    <circle cx="730" cy="68" r="10" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Center Graphic / Architectural Core -->
    <g transform="translate(400, 260)">
      <circle cx="0" cy="0" r="110" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.4"/>
      <circle cx="0" cy="0" r="75" fill="rgba(123,160,91,0.1)" stroke="rgba(244,241,235,0.2)" stroke-width="1.5"/>
      ${iconPaths}
    </g>
    
    <!-- Content Title & Architecture Breakdown -->
    <text x="56" y="440" fill="#f4f1eb" font-family="sans-serif" font-size="32" font-weight="bold" letter-spacing="-0.5">${title}</text>
    <text x="56" y="480" fill="#d1ccc0" font-family="sans-serif" font-size="18" letter-spacing="0.2">${subtitle}</text>
    
    <!-- Bottom Tech Pill Matrix -->
    <rect x="56" y="516" width="140" height="28" rx="14" fill="rgba(123,160,91,0.2)" stroke="rgba(123,160,91,0.4)" stroke-width="1"/>
    <text x="126" y="534" fill="${color}" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">SUB-200MS LATENCY</text>

    <rect x="210" y="516" width="150" height="28" rx="14" fill="rgba(244,241,235,0.08)" stroke="rgba(244,241,235,0.15)" stroke-width="1"/>
    <text x="285" y="534" fill="#f4f1eb" font-family="monospace" font-size="11" text-anchor="middle">DISTRIBUTED CLUSTER</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const GALLERY_ARCHITECTURES = [
  createSvgDataUri(
    "CrediSync AI Engine",
    "Real-Time Credit Intelligence & Vector RAG Pipeline",
    "CREDISYNC-V4",
    "#7ba05b",
    `<polygon points="0,-45 40,25 -40,25" fill="none" stroke="#7ba05b" stroke-width="3"/>
     <circle cx="0" cy="0" r="18" fill="#7ba05b"/>`
  ),
  createSvgDataUri(
    "Financial Anomaly Engine",
    "Sub-200ms Algorithmic Volatility & Pattern Detection",
    "ANOMALY-DETECTION",
    "#a4c982",
    `<path d="M-50,20 L-20,-30 L10,15 L50,-40" fill="none" stroke="#a4c982" stroke-width="3.5" stroke-linecap="round"/>
     <circle cx="50" cy="-40" r="7" fill="#a4c982"/>`
  ),
  createSvgDataUri(
    "NeuroCare Telemetry",
    "Concurrent Patient Vital Streaming & Event Queues",
    "NEUROCARE-CORE",
    "#7ba05b",
    `<path d="M-55,0 L-25,0 L-10,-35 L10,35 L25,0 L55,0" fill="none" stroke="#7ba05b" stroke-width="3.5" stroke-linecap="round"/>`
  ),
  createSvgDataUri(
    "Face Auth Vault",
    "RetinaFace Detection & AES-256 Vector Biometrics",
    "BIOMETRIC-VAULT",
    "#2d5a4a",
    `<rect x="-35" y="-35" width="70" height="70" rx="16" fill="none" stroke="#7ba05b" stroke-width="3"/>
     <circle cx="0" cy="0" r="14" fill="#7ba05b"/>`
  ),
  createSvgDataUri(
    "Qdrant Vector Mesh",
    "High-Dimensional Cosine Similarity Embeddings",
    "VECTOR-EMBEDDINGS",
    "#7ba05b",
    `<circle cx="-25" cy="-20" r="12" fill="#7ba05b"/>
     <circle cx="25" cy="-20" r="12" fill="#7ba05b"/>
     <circle cx="0" cy="25" r="12" fill="#7ba05b"/>
     <line x1="-25" y1="-20" x2="25" y2="-20" stroke="rgba(244,241,235,0.4)" stroke-width="2"/>
     <line x1="-25" y1="-20" x2="0" y2="25" stroke="rgba(244,241,235,0.4)" stroke-width="2"/>
     <line x1="25" y1="-20" x2="0" y2="25" stroke="rgba(244,241,235,0.4)" stroke-width="2"/>`
  ),
];
