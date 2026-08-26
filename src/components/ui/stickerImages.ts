/**
 * @file stickerImages.ts
 * @description Embedded high-resolution SVG Data URIs for 3D Sticker Peel badges.
 * Self-contained, zero external network dependency, ultra crisp graphics.
 */

function createSvgDataUri(svgContent: string): string {
  const utf8 = encodeURIComponent(svgContent.trim())
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${utf8}`;
}

export const STICKER_BADGES = {
  pytorch: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2a1b1b"/>
          <stop offset="100%" stop-color="#140d0d"/>
        </radialGradient>
        <linearGradient id="fire" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF3E00"/>
          <stop offset="50%" stop-color="#EE4C2C"/>
          <stop offset="100%" stop-color="#FF8A00"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg)" stroke="#EE4C2C" stroke-width="6"/>
      <circle cx="200" cy="200" r="140" fill="none" stroke="#EE4C2C" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
      <g transform="translate(110, 80) scale(0.9)">
        <path d="M 100 0 C 130 50 170 90 170 145 C 170 195 130 220 100 220 C 70 220 30 195 30 145 C 30 115 50 80 80 50 L 100 0 Z" fill="url(#fire)"/>
        <circle cx="150" cy="50" r="14" fill="#FF8A00"/>
      </g>
      <text x="200" y="325" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">PYTORCH</text>
      <text x="200" y="355" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">DEEP LEARNING // AI</text>
    </svg>
  `),

  fastapi: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg_fa" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#003538"/>
          <stop offset="100%" stop-color="#0c181a"/>
        </radialGradient>
        <linearGradient id="teal_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00F0FF"/>
          <stop offset="100%" stop-color="#009688"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg_fa)" stroke="#00ADB5" stroke-width="6"/>
      <circle cx="200" cy="200" r="140" fill="none" stroke="#00ADB5" stroke-width="2" stroke-dasharray="6 6" opacity="0.3"/>
      <g transform="translate(125, 90) scale(1.1)">
        <polygon points="90,10 20,95 70,95 50,150 130,65 80,65" fill="url(#teal_grad)"/>
      </g>
      <text x="200" y="315" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">FASTAPI</text>
      <text x="200" y="348" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">ASYNC BACKEND // REST</text>
    </svg>
  `),

  docker: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg_doc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0e2a47"/>
          <stop offset="100%" stop-color="#081422"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg_doc)" stroke="#2496ED" stroke-width="6"/>
      <g transform="translate(85, 105) scale(0.9)">
        <!-- Containers -->
        <rect x="80" y="10" width="22" height="22" rx="3" fill="#2496ED"/>
        <rect x="110" y="10" width="22" height="22" rx="3" fill="#2496ED"/>
        <rect x="50" y="40" width="22" height="22" rx="3" fill="#2496ED"/>
        <rect x="80" y="40" width="22" height="22" rx="3" fill="#2496ED"/>
        <rect x="110" y="40" width="22" height="22" rx="3" fill="#2496ED"/>
        <rect x="140" y="40" width="22" height="22" rx="3" fill="#2496ED"/>
        <!-- Whale -->
        <path d="M 20 80 C 20 140 120 160 210 140 C 240 130 250 100 250 80 C 220 75 190 85 170 70 L 10 70 Z" fill="#2496ED"/>
        <circle cx="60" cy="100" r="5" fill="#FFFFFF"/>
      </g>
      <text x="200" y="315" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">DOCKER</text>
      <text x="200" y="348" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">CLOUD // CONTAINERS</text>
    </svg>
  `),

  qdrant: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg_qd" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3d1222"/>
          <stop offset="100%" stop-color="#19070e"/>
        </radialGradient>
        <linearGradient id="qd_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF2E93"/>
          <stop offset="100%" stop-color="#DC143C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg_qd)" stroke="#FF2E93" stroke-width="6"/>
      <g transform="translate(130, 95) scale(1.1)">
        <!-- Vector Cube -->
        <polygon points="70,10 130,45 70,80 10,45" fill="#FF2E93" opacity="0.9"/>
        <polygon points="10,45 70,80 70,140 10,105" fill="#DC143C"/>
        <polygon points="130,45 70,80 70,140 130,105" fill="#990b27"/>
      </g>
      <text x="200" y="315" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">QDRANT</text>
      <text x="200" y="348" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">VECTOR RAG // SEARCH</text>
    </svg>
  `),

  nextjs: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg_next" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#222831"/>
          <stop offset="100%" stop-color="#0a0c0f"/>
        </radialGradient>
        <linearGradient id="n_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#00ADB5"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg_next)" stroke="#EEEEEE" stroke-width="6"/>
      <circle cx="200" cy="200" r="140" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.2"/>
      <g transform="translate(135, 90) scale(1.1)">
        <path d="M 20 120 L 20 10 L 40 10 L 95 100 L 95 10 L 115 10 L 115 120 L 95 120 L 40 30 L 40 120 Z" fill="url(#n_grad)"/>
      </g>
      <text x="200" y="315" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">NEXT.JS 16</text>
      <text x="200" y="348" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">REACT 19 // TURBOPACK</text>
    </svg>
  `),

  cuda: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <radialGradient id="bg_cuda" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#143314"/>
          <stop offset="100%" stop-color="#081408"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" rx="60" fill="url(#bg_cuda)" stroke="#76B900" stroke-width="6"/>
      <g transform="translate(110, 85) scale(0.9)">
        <!-- Tensor Grid -->
        <circle cx="100" cy="100" r="75" fill="none" stroke="#76B900" stroke-width="10"/>
        <path d="M 50 100 C 50 60 150 60 150 100 C 150 140 50 140 50 100 Z" fill="#76B900" opacity="0.85"/>
        <circle cx="100" cy="100" r="20" fill="#FFFFFF"/>
      </g>
      <text x="200" y="315" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">CUDA // TENSOR</text>
      <text x="200" y="348" font-family="monospace" font-weight="600" font-size="14" fill="#00ADB5" text-anchor="middle" letter-spacing="2">GPU COMPUTE // C++</text>
    </svg>
  `),
};

export type StickerKey = keyof typeof STICKER_BADGES;

