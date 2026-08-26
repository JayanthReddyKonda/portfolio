"use client";

/**
 * @file AsciiReveal.tsx
 * @description Originkit Full-Color ASCII Reveal Canvas Component.
 * Converts Jayanth's high-definition portrait into a vibrant, multi-color ASCII character
 * matrix in real-time, and uses an interactive multi-blob pointer mask with dynamic gaussian
 * softness to reveal the full-resolution photograph underneath on hover.
 */

import { useEffect, useRef, type CSSProperties } from "react";

/** Default local portrait image */
const DEFAULT_LOCAL_IMAGE = "/images/ascii_profile.png";

export type ColorMode = "mono" | "image";
export type Fit = "cover" | "contain";

export interface RevealOptions {
  /** Size of the reveal circle in pixels */
  size: number;
  /** Softness / blur radius of the reveal boundary */
  softness: number;
}

const DEFAULTS = {
  fit: "cover" as Fit,
  focusY: 15,
  columns: 110,
  ramp: " .:-=+*#%@",
  invert: false,
  contrast: 105,
  colorMode: "image" as ColorMode,
  inkColor: "#00ADB5",
  reveal: true,
  revealOptions: { size: 95, softness: 18 } as RevealOptions,
};

/** Calculates contrast multiplier based on 0-100 input */
const contrastAt = (value: number) => 0.5 + (value / 100) * 2;

/** Clamps focus vertical percentage between 0 and 100 */
const clampFocus = (value: number) =>
  Math.min(100, Math.max(0, typeof value === "number" ? value : 50));

/**
 * Computes destination rectangle positioning for contain/cover fit modes
 */
function placeRect(
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  fit: Fit,
  focusY: number
) {
  const scale =
    fit === "contain"
      ? Math.min(boxW / imgW, boxH / imgH)
      : Math.max(boxW / imgW, boxH / imgH);
  const dw = imgW * scale;
  const dh = imgH * scale;
  const f = fit === "cover" ? clampFocus(focusY) / 100 : 0.5;
  return { dx: (boxW - dw) / 2, dy: (boxH - dh) * f, dw, dh };
}

export interface AsciiImageProps {
  /** Image source path or object */
  image?: { src: string; srcSet?: string; alt?: string } | string;
  /** Fit mode: 'cover' fills the box, 'contain' preserves aspect ratio */
  fit?: Fit;
  /** Focus position percentage along vertical axis */
  focusY?: number;
  /** Number of ASCII character columns */
  columns?: number;
  /** Character density ramp from darkest to brightest */
  ramp?: string;
  /** Invert luminance mapping */
  invert?: boolean;
  /** Contrast adjustment multiplier (0-100+) */
  contrast?: number;
  /** Color mode: 'mono' uses inkColor, 'image' samples rich RGB from source pixels */
  colorMode?: ColorMode;
  /** Foreground ink color for mono mode */
  inkColor?: string;
  /** Whether mouse hover triggers image reveal */
  reveal?: boolean;
  /** Reveal circle size and edge softness */
  revealOptions?: RevealOptions;
  /** Optional inline CSS styles */
  style?: CSSProperties;
  /** Optional container class name */
  className?: string;
}

function resolveImageSrc(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image.trim() || undefined;
  return (image as { src?: string }).src || undefined;
}

export function AsciiReveal(props: AsciiImageProps) {
  const {
    image,
    fit = DEFAULTS.fit,
    focusY = DEFAULTS.focusY,
    columns = DEFAULTS.columns,
    ramp = DEFAULTS.ramp,
    invert = DEFAULTS.invert,
    contrast = DEFAULTS.contrast,
    colorMode = DEFAULTS.colorMode,
    inkColor = DEFAULTS.inkColor,
    reveal = DEFAULTS.reveal,
    revealOptions = DEFAULTS.revealOptions,
    style,
    className,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const samplerRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const revealRef = useRef<HTMLCanvasElement | null>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const blobsRef = useRef<Array<{ x: number; y: number }>>([]);
  const seededRef = useRef(false);
  const pointer = useRef({ x: -9999, y: -9999, inside: false });

  const src = resolveImageSrc(image) || DEFAULT_LOCAL_IMAGE;
  const revealSize = revealOptions?.size ?? DEFAULTS.revealOptions.size;
  const revealSoftness =
    revealOptions?.softness ?? DEFAULTS.revealOptions.softness;

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const chars = ramp && ramp.length > 0 ? ramp : DEFAULTS.ramp;
    const punch = contrastAt(contrast);

    let raf = 0;
    let alive = true;
    let coverRect = { dx: 0, dy: 0, dw: 0, dh: 0 };

    const BLOB_COUNT = 5;
    blobsRef.current = Array.from({ length: BLOB_COUNT }, () => ({
      x: 0,
      y: 0,
    }));
    seededRef.current = false;

    function getSize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 600;
      const h = canvas.clientHeight || 600;
      return { w, h, dpr };
    }

    /** Rebuilds the rich color ASCII character representation from source pixels */
    function buildAscii() {
      const img = imgRef.current;
      if (!img) return;
      const { w, h, dpr } = getSize();
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));

      const cols = Math.max(8, Math.round(columns));
      const cellW = (w * dpr) / cols;
      const fontPx = cellW * 1.65;
      const cellH = fontPx;
      const rows = Math.max(1, Math.floor((h * dpr) / cellH));

      let sampler = samplerRef.current;
      if (!sampler) {
        sampler = document.createElement("canvas");
        samplerRef.current = sampler;
      }
      sampler.width = cols;
      sampler.height = rows;
      const sctx = sampler.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      const place = placeRect(
        img.width || 600,
        img.height || 600,
        canvas.width,
        canvas.height,
        fit,
        focusY
      );
      sctx.clearRect(0, 0, cols, rows);
      sctx.drawImage(
        img,
        place.dx / cellW,
        place.dy / cellH,
        place.dw / cellW,
        place.dh / cellH
      );

      let data: Uint8ClampedArray;
      try {
        data = sctx.getImageData(0, 0, cols, rows).data;
      } catch {
        imgRef.current = null;
        return;
      }

      let off = offRef.current;
      if (!off) {
        off = document.createElement("canvas");
        offRef.current = off;
      }
      off.width = canvas.width;
      off.height = canvas.height;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.clearRect(0, 0, off.width, off.height);
      octx.font = `600 ${fontPx.toFixed(2)}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      octx.textBaseline = "top";

      const last = chars.length - 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const rr = data[i];
          const gg = data[i + 1];
          const bb = data[i + 2];

          // Compute perceived luminance
          let lum = (0.299 * rr + 0.587 * gg + 0.114 * bb) / 255;
          lum = (lum - 0.5) * punch + 0.5;
          if (invert) lum = 1 - lum;
          lum = lum < 0 ? 0 : lum > 1 ? 1 : lum;

          const ch = chars[Math.round(lum * last)];
          if (ch === " ") continue;

          if (colorMode === "image") {
            // Enhanced vibrant color saturation for ASCII matrix
            const rBoost = Math.min(255, Math.max(0, Math.round(rr * 1.15 + 15)));
            const gBoost = Math.min(255, Math.max(0, Math.round(gg * 1.15 + 15)));
            const bBoost = Math.min(255, Math.max(0, Math.round(bb * 1.15 + 15)));
            octx.fillStyle = `rgb(${rBoost}, ${gBoost}, ${bBoost})`;
          } else {
            octx.fillStyle = inkColor;
          }

          octx.fillText(ch, c * cellW, r * cellH);
        }
      }

      coverRect = place;
    }

    function ensureLayer(ref: { current: HTMLCanvasElement | null }) {
      let layer = ref.current;
      if (!layer) {
        layer = document.createElement("canvas");
        ref.current = layer;
      }
      if (layer.width !== canvas.width || layer.height !== canvas.height) {
        layer.width = canvas.width;
        layer.height = canvas.height;
      }
      return layer;
    }

    /** Smooth spring physics for organic blob tracking behind pointer */
    function updateBlobs() {
      const blobs = blobsRef.current;
      if (blobs.length === 0) return;
      const { dpr } = getSize();
      const tx = pointer.current.x * dpr;
      const ty = pointer.current.y * dpr;
      if (!seededRef.current) {
        for (const blob of blobs) {
          blob.x = tx;
          blob.y = ty;
        }
        seededRef.current = true;
        return;
      }
      blobs[0].x += (tx - blobs[0].x) * 0.35;
      blobs[0].y += (ty - blobs[0].y) * 0.35;
      for (let i = 1; i < blobs.length; i++) {
        blobs[i].x += (blobs[i - 1].x - blobs[i].x) * 0.35;
        blobs[i].y += (blobs[i - 1].y - blobs[i].y) * 0.35;
      }
    }

    /** Composites the vibrant ASCII layer with the masked high-def underlying photograph */
    function paint() {
      const off = offRef.current;
      if (!off) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(off, 0, 0);

      const img = imgRef.current;
      const revealing = pointer.current.inside || releasing;
      if (!reveal || !revealing || !img) return;

      const { dpr } = getSize();
      const blobs = blobsRef.current;
      const photo = ensureLayer(revealRef);
      const pctx = photo.getContext("2d");
      const mask = ensureLayer(maskRef);
      const mctx = mask.getContext("2d");
      if (!pctx || !mctx) return;

      pctx.globalCompositeOperation = "source-over";
      pctx.clearRect(0, 0, photo.width, photo.height);
      pctx.drawImage(
        img,
        coverRect.dx,
        coverRect.dy,
        coverRect.dw,
        coverRect.dh
      );

      mctx.clearRect(0, 0, mask.width, mask.height);
      mctx.save();
      mctx.filter = `blur(${(revealSoftness * dpr).toFixed(1)}px)`;
      mctx.fillStyle = "#FFFFFF";
      for (let i = 0; i < blobs.length; i++) {
        const t = blobs.length <= 1 ? 0 : i / (blobs.length - 1);
        const radius =
          revealSize * dpr * (1 - t * 0.5) * Math.max(0, releaseAlpha);
        mctx.beginPath();
        mctx.arc(blobs[i].x, blobs[i].y, radius, 0, Math.PI * 2);
        mctx.fill();
      }
      mctx.restore();

      pctx.globalCompositeOperation = "destination-in";
      pctx.drawImage(mask, 0, 0);
      pctx.globalCompositeOperation = "source-over";
      ctx.drawImage(photo, 0, 0);
    }

    let isLooping = false;
    // Graceful release: on pointer exit (mouse leave or finger lift) the
    // reveal blobs shrink away over ~450ms instead of snapping back to ASCII.
    let releasing = false;
    let releaseAlpha = 1;
    let releaseStart = 0;
    const RELEASE_MS = 450;

    function loop() {
      if (!alive) return;
      updateBlobs();
      if (releasing) {
        releaseAlpha = 1 - (performance.now() - releaseStart) / RELEASE_MS;
        if (releaseAlpha <= 0) {
          releasing = false;
          releaseAlpha = 0;
          seededRef.current = false; // next interaction re-seeds at its origin
        }
      }
      paint();
      if (pointer.current.inside || releasing) {
        raf = requestAnimationFrame(loop);
      } else {
        isLooping = false;
        paint(); // Final static draw
      }
    }

    function startLoop() {
      if (isLooping || !alive) return;
      isLooping = true;
      raf = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.inside =
        x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (pointer.current.inside) {
        startLoop();
      }
    }
    function onLeave() {
      if (!pointer.current.inside && !seededRef.current) return;
      pointer.current.inside = false;
      // Begin the graceful dissolve rather than snapping back to ASCII.
      releasing = true;
      releaseAlpha = 1;
      releaseStart = performance.now();
      startLoop();
    }

    // Touch support: a pressed finger drives the reveal blobs. The canvas
    // opts out of browser panning (touch-action: none) so drags scrub the
    // reveal instead of scrolling the page away mid-interaction.
    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "touch") return; // mouse handled by move/leave
      canvas.setPointerCapture(event.pointerId);
      onMove(event);
    }
    function onPointerEnd(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      onLeave();
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!alive) return;
      imgRef.current = img;
      buildAscii();
      paint();
    };
    if (src) img.src = src;

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        buildAscii();
        paint();
      });
      ro.observe(canvas);
    }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerEnd);
    canvas.addEventListener("pointercancel", onPointerEnd);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerEnd);
      canvas.removeEventListener("pointercancel", onPointerEnd);
    };
  }, [
    src,
    fit,
    focusY,
    columns,
    ramp,
    invert,
    contrast,
    colorMode,
    inkColor,
    reveal,
    revealSize,
    revealSoftness,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={
        typeof image === "object" ? (image?.alt ?? "Full Color ASCII Art Profile") : "Full Color ASCII Art Profile"
      }
      style={{
        ...style,
        display: "block",
        width: "100%",
        height: "100%",
        cursor: reveal ? "crosshair" : "default",
        touchAction: reveal ? "none" : "auto",
      }}
    />
  );
}

export default AsciiReveal;
