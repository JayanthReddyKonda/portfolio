"use client";

/**
 * @file StickerPeel.tsx
 * @description 3D WebGL Sticker Peel Component (Originkit Sticker Peel).
 * Provides interactive physical 2D bilinear skinning, realistic fold curvature,
 * and cast shadow projection with Three.js and Framer Motion.
 */

import React, { useEffect, useRef, useCallback } from "react";
import { useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  SkinnedMesh,
  MeshStandardMaterial,
  Texture,
  Vector3,
  Quaternion,
  Bone,
  Skeleton,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  FrontSide,
  RepeatWrapping,
  LinearFilter,
  SRGBColorSpace,
  RGBAFormat,
  Color,
  DirectionalLight,
  AmbientLight,
  PlaneGeometry,
  Mesh,
  Group,
  ShadowMaterial,
  PCFSoftShadowMap,
} from "three";

const DEFAULT_IMAGE =
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/cbf541e7-a558-45e7-11e8-7e63e9d1a800/w=800";

const resolveImageSource = (input: unknown): string | undefined => {
  if (!input) return undefined;
  if (typeof input === "string") return input.trim() || undefined;
  if (typeof input === "object" && input !== null && "src" in input) {
    return (input as { src?: string }).src || undefined;
  }
  return undefined;
};

const CAMERA_DISTANCE = 1200;
const CAMERA_NEAR = 100;
const CAMERA_FAR = 2000;
const STICKER_DEPTH = 0.003;
const CANVAS_SCALE = 4;

const BONE_GRID_X = 24;
const BONE_GRID_Y = 24;
const SEGMENTS_W = 60;
const SEGMENTS_H = 48;

const FIXED_CURL_RADIUS = 0.15;
const FIXED_CURL_FACTOR = 0.6;

const _scratchQuat = new Quaternion();
const _scratchRotAxis = new Vector3();

function calculateCameraFov(
  width: number,
  height: number,
  distance: number
): number {
  const aspect = width / height;
  return 2 * Math.atan(width / aspect / (2 * distance)) * (180 / Math.PI);
}

function mapLinear(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function mapInternalRadiusToUIValue(ui: number): number {
  const clamped = Math.max(0.1, Math.min(1, ui));
  return mapLinear(clamped, 0.1, 1, 0.05, 1 / Math.PI);
}

function parseColorToRgba(input: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  if (!input) return { r: 0, g: 0, b: 0, a: 1 };
  const str = input.trim();

  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    return {
      r: Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255,
      g: Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255,
      b: Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255,
      a:
        rgbaMatch[4] !== undefined
          ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
          : 1,
    };
  }

  const hex = str.replace(/^#/, "");
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function makeBackTextureViewConsistent(tex: Texture | null, frontTex: Texture | null): Texture | null {
  if (!tex) return null;
  const out =
    tex === frontTex && typeof tex.clone === "function" ? tex.clone() : tex;
  out.wrapS = RepeatWrapping;
  out.repeat.x = -1;
  out.offset.x = 1;
  out.needsUpdate = true;
  return out;
}

export interface StickerPeelProps {
  image?: unknown;
  imageWidth?: number;
  imageHeight?: number;
  curlRotation?: number;
  hoverPeel?: number;
  pressPeel?: number;
  backColor?: string;
  shadowEnabled?: boolean;
  shadow?: { opacity?: number; color?: string; x?: number; y?: number };
  style?: React.CSSProperties;
  className?: string;
}

export function StickerPeel({
  image = DEFAULT_IMAGE,
  imageWidth = 180,
  imageHeight = 180,
  curlRotation = 240,
  hoverPeel = 45,
  pressPeel = 64,
  backColor = "#1c2129",
  shadowEnabled = true,
  shadow,
  style,
  className,
}: StickerPeelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const meshRef = useRef<SkinnedMesh | null>(null);
  const groupRef = useRef<Group | null>(null);
  const bonesRef = useRef<Bone[]>([]);
  const bonesInitialPositionsRef = useRef<Vector3[]>([]);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const imageLoadAbortRef = useRef(false);
  const curlRotationRef = useRef(curlRotation);
  const pendingUpdateRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isPressedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const renderLoopIdRef = useRef<number | null>(null);
  const animationControlsRef = useRef<Record<string, { stop: () => void }>>({});

  const shadowCfg = {
    opacity: 30,
    color: "#000000",
    x: -300,
    y: 140,
    ...shadow,
  };
  const castShadowOpacity = shadowEnabled ? shadowCfg.opacity : 0;
  const shadowColor = shadowCfg.color;
  const shadowPositionX = shadowCfg.x;
  const shadowPositionY = shadowCfg.y;

  const resolvedImageUrl = resolveImageSource(image) || DEFAULT_IMAGE;
  const curlAmountMotion = useMotionValue(0);
  const animatedCurlRef = useRef({ amount: 0 });

  const createStickerGeometry = useCallback(
    (width: number, height: number, gridX: number, gridY: number) => {
      const geometry = new BoxGeometry(
        width,
        height,
        STICKER_DEPTH,
        SEGMENTS_W,
        SEGMENTS_H,
        1
      );

      const position = geometry.attributes.position;
      const vertex = new Vector3();
      const skinIndexes: number[] = [];
      const skinWeights: number[] = [];

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);

        const normalizedX = (vertex.x + width / 2) / width;
        const normalizedY = (vertex.y + height / 2) / height;
        const gridXPos = normalizedX * (gridX - 1);
        const gridYPos = normalizedY * (gridY - 1);
        const x0 = Math.floor(gridXPos);
        const y0 = Math.floor(gridYPos);
        const x1 = Math.min(x0 + 1, gridX - 1);
        const y1 = Math.min(y0 + 1, gridY - 1);
        const tx = gridXPos - x0;
        const ty = gridYPos - y0;

        const idx00 = y0 * gridX + x0;
        const idx10 = y0 * gridX + x1;
        const idx01 = y1 * gridX + x0;
        const idx11 = y1 * gridX + x1;

        skinIndexes.push(idx00, idx10, idx01, idx11);
        skinWeights.push(
          (1 - tx) * (1 - ty),
          tx * (1 - ty),
          (1 - tx) * ty,
          tx * ty
        );
      }

      geometry.setAttribute(
        "skinIndex",
        new Uint16BufferAttribute(skinIndexes, 4)
      );
      geometry.setAttribute(
        "skinWeight",
        new Float32BufferAttribute(skinWeights, 4)
      );
      geometry.computeVertexNormals();
      return geometry;
    },
    []
  );

  const renderFrame = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const gl = rendererRef.current.getContext();
    if (!gl || gl.isContextLost()) return;

    if (meshRef.current?.skeleton) {
      meshRef.current.updateMatrixWorld(true);
      meshRef.current.skeleton.bones.forEach((bone) => {
        if (bone) bone.updateMatrixWorld(true);
      });
      meshRef.current.skeleton.update();
    }
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const startRenderLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const loop = () => {
      if (!isAnimatingRef.current) return;
      renderFrame();
      renderLoopIdRef.current = requestAnimationFrame(loop);
    };
    renderLoopIdRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  const stopRenderLoop = useCallback(() => {
    isAnimatingRef.current = false;
    if (renderLoopIdRef.current !== null) {
      cancelAnimationFrame(renderLoopIdRef.current);
      renderLoopIdRef.current = null;
    }
    requestAnimationFrame(() => renderFrame());
  }, [renderFrame]);

  const createBackTexture = useCallback(
    (img: HTMLImageElement, backColorValue: string) => {
      const backCanvas = document.createElement("canvas");
      backCanvas.width = img.width || 256;
      backCanvas.height = img.height || 256;
      const backCtx = backCanvas.getContext("2d");
      if (!backCtx) return null;

      const { r, g, b, a: backA } = parseColorToRgba(backColorValue);
      const backR = Math.round(r * 255);
      const backG = Math.round(g * 255);
      const backB = Math.round(b * 255);

      backCtx.drawImage(img, 0, 0);
      const imageData = backCtx.getImageData(0, 0, backCanvas.width, backCanvas.height);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const imgR = imageData.data[i];
        const imgG = imageData.data[i + 1];
        const imgB = imageData.data[i + 2];

        if (backA >= 1) {
          imageData.data[i] = backR;
          imageData.data[i + 1] = backG;
          imageData.data[i + 2] = backB;
        } else if (backA > 0) {
          imageData.data[i] = Math.round(backR * backA + imgR * (1 - backA));
          imageData.data[i + 1] = Math.round(backG * backA + imgG * (1 - backA));
          imageData.data[i + 2] = Math.round(backB * backA + imgB * (1 - backA));
        }
      }

      backCtx.putImageData(imageData, 0, 0);
      const tex = new Texture(backCanvas);
      tex.needsUpdate = true;
      tex.minFilter = LinearFilter;
      tex.colorSpace = SRGBColorSpace;
      tex.format = RGBAFormat;
      return tex;
    },
    []
  );

  const updateBones = useCallback(() => {
    if (
      !bonesRef.current.length ||
      !meshRef.current ||
      !bonesInitialPositionsRef.current.length
    )
      return;
    if (!meshRef.current.skeleton) return;

    const skeletonBones = meshRef.current.skeleton.bones;
    if (!skeletonBones?.length) return;

    meshRef.current.updateMatrixWorld(true);
    skeletonBones.forEach((bone) => {
      if (bone) bone.updateMatrixWorld(true);
    });
    meshRef.current.skeleton.update();

    const bones = bonesRef.current;
    const initialPositions = bonesInitialPositionsRef.current;
    const amount = Math.min(1, Math.max(0, animatedCurlRef.current.amount));
    const curlStart = 1 - amount;
    const curlFactor = amount <= 0 ? 1e-4 : FIXED_CURL_FACTOR;
    const r = mapInternalRadiusToUIValue(FIXED_CURL_RADIUS);

    const { geometry } = meshRef.current;
    const width: number = (geometry as BoxGeometry).parameters.width;
    const height: number = (geometry as BoxGeometry).parameters.height;

    const curlRotationRad = curlRotationRef.current * (Math.PI / 180);
    const dirX = Math.cos(curlRotationRad);
    const dirY = Math.sin(curlRotationRad);

    _scratchRotAxis.set(-dirY, dirX, 0).normalize();

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const maxDistAlongDir = Math.max(
      halfWidth * dirX + halfHeight * dirY,
      halfWidth * dirX - halfHeight * dirY,
      -halfWidth * dirX + halfHeight * dirY,
      -halfWidth * dirX - halfHeight * dirY
    );
    const diagonalLength = Math.sqrt(width * width + height * height);
    const maxDistFromCenter = diagonalLength / 2;
    const foldOffset = -maxDistAlongDir + curlStart * 2 * maxDistAlongDir;

    const radiusWorld = r * maxDistFromCenter;
    const RPrime = radiusWorld / curlFactor;
    const arcLimit = Math.PI * radiusWorld;

    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const initialPos = initialPositions[i];
      const distOnDir = initialPos.x * dirX + initialPos.y * dirY;
      const signedDist = distOnDir - foldOffset;

      if (signedDist > 0) {
        let xRel: number, zRel: number, finalAngle: number;

        const angle_s = (signedDist * curlFactor) / radiusWorld;
        if (signedDist <= arcLimit) {
          xRel = RPrime * Math.sin(angle_s);
          zRel = RPrime * (1 - Math.cos(angle_s));
          finalAngle = angle_s;
        } else {
          const Phi = Math.PI * curlFactor;
          const xArcEnd = RPrime * Math.sin(Phi);
          const zArcEnd = RPrime * (1 - Math.cos(Phi));
          const extra = signedDist - arcLimit;
          xRel = xArcEnd + extra * Math.cos(Phi);
          zRel = zArcEnd + extra * Math.sin(Phi);
          finalAngle = Phi;
        }

        const dx = xRel - signedDist;
        bone.position.x = initialPos.x + dx * dirX;
        bone.position.y = initialPos.y + dx * dirY;
        bone.position.z = initialPos.z + zRel;
        _scratchQuat.setFromAxisAngle(_scratchRotAxis, -finalAngle);
        bone.quaternion.copy(_scratchQuat);
      } else {
        bone.position.copy(initialPos);
        bone.quaternion.identity();
      }
    }

    meshRef.current.skeleton?.update();
  }, []);

  const scheduleBoneUpdate = useCallback(() => {
    if (pendingUpdateRef.current) return;
    pendingUpdateRef.current = true;
    requestAnimationFrame(() => {
      pendingUpdateRef.current = false;
      updateBones();
    });
  }, [updateBones]);

  useMotionValueEvent(curlAmountMotion, "change", (latest) => {
    animatedCurlRef.current.amount = latest;
    scheduleBoneUpdate();
  });

  const setupScene = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return null;

    const meshW = imageWidth;
    const meshH = imageHeight;
    if (meshW <= 0 || meshH <= 0) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = meshW * CANVAS_SCALE;
    const canvasHeight = meshH * CANVAS_SCALE;

    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      calculateCameraFov(canvasWidth, canvasHeight, CAMERA_DISTANCE),
      canvasWidth / canvasHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(
        Math.round(canvasWidth * dpr),
        Math.round(canvasHeight * dpr),
        false
      );
      renderer.setPixelRatio(1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      rendererRef.current = renderer;
    } catch {
      return null;
    }

    canvasRef.current.style.width = `${canvasWidth}px`;
    canvasRef.current.style.height = `${canvasHeight}px`;

    const geometry = createStickerGeometry(
      meshW,
      meshH,
      BONE_GRID_X,
      BONE_GRID_Y
    );

    const bones: Bone[] = [];
    const boneSpacingX = meshW / (BONE_GRID_X - 1);
    const boneSpacingY = meshH / (BONE_GRID_Y - 1);
    for (let y = 0; y < BONE_GRID_Y; y++) {
      for (let x = 0; x < BONE_GRID_X; x++) {
        const bone = new Bone();
        bone.position.x = -meshW / 2 + x * boneSpacingX;
        bone.position.y = -meshH / 2 + y * boneSpacingY;
        bone.position.z = 0;
        bones.push(bone);
      }
    }
    bonesRef.current = bones;
    bonesInitialPositionsRef.current = bones.map((b) => b.position.clone());

    const skeleton = new Skeleton(bones);
    const backColorRgba = parseColorToRgba(backColor);

    const frontMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      side: FrontSide,
      transparent: true,
      roughness: 0.2,
      metalness: 0.3,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });
    const backMaterial = new MeshStandardMaterial({
      color: 0xffffff,
      side: FrontSide,
      transparent: true,
      roughness: 0.3,
      metalness: 0,
      emissive: 0xffffff,
      emissiveIntensity: 0.3,
    });
    const sideMaterial = new MeshStandardMaterial({
      color: new Color(backColorRgba.r, backColorRgba.g, backColorRgba.b),
      transparent: true,
      opacity: 1,
      roughness: 0.1,
      metalness: 0,
    });

    const materials = [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      backMaterial,
    ];

    const mesh = new SkinnedMesh(geometry, materials);
    mesh.frustumCulled = false;
    bones.forEach((bone) => {
      mesh.add(bone);
      bone.updateMatrixWorld(true);
    });
    mesh.bind(skeleton);
    mesh.updateMatrixWorld(true);
    skeleton.update();
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    const group = new Group();
    groupRef.current = group;
    mesh.position.set(0, 0, 0);
    group.add(mesh);
    meshRef.current = mesh;
    scene.add(group);

    const ambientLight = new AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(shadowPositionX, shadowPositionY, 400);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.00001;
    scene.add(directionalLight);

    const scRgba = parseColorToRgba(shadowColor);
    const shadowMat = new ShadowMaterial({
      opacity: castShadowOpacity / 100,
      color: new Color(scRgba.r, scRgba.g, scRgba.b),
    });
    const backgroundPlane = new Mesh(
      new PlaneGeometry(canvasWidth, canvasHeight),
      shadowMat
    );
    backgroundPlane.receiveShadow = true;
    backgroundPlane.position.set(0, 0, -1);
    scene.add(backgroundPlane);

    renderer.render(scene, camera);
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }
    return { scene, camera, renderer, mesh, bones };
  }, [
    createStickerGeometry,
    shadowPositionX,
    shadowPositionY,
    castShadowOpacity,
    shadowColor,
    backColor,
    imageWidth,
    imageHeight,
  ]);

  const loadTexture = useCallback(() => {
    if (!resolvedImageUrl || !meshRef.current) return;
    imageLoadAbortRef.current = false;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (imageLoadAbortRef.current || !meshRef.current) return;
      loadedImageRef.current = img;

      const texture = new Texture(img);
      texture.needsUpdate = true;
      texture.minFilter = LinearFilter;
      texture.colorSpace = SRGBColorSpace;
      texture.format = RGBAFormat;

      const rawBackTexture = createBackTexture(img, backColor);
      const backTexture = makeBackTextureViewConsistent(rawBackTexture, texture);

      const materials = meshRef.current.material as MeshStandardMaterial[];
      if (Array.isArray(materials)) {
        if (materials[4]) {
          materials[4].map = texture;
          materials[4].transparent = true;
          materials[4].emissiveMap = texture;
          materials[4].emissiveIntensity = 0.8;
          materials[4].needsUpdate = true;
        }
        if (materials[5] && backTexture) {
          materials[5].map = backTexture;
          materials[5].transparent = true;
          materials[5].needsUpdate = true;
        }
      }

      requestAnimationFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.updateMatrixWorld(true);
        meshRef.current.skeleton?.update();
        updateBones();
        renderFrame();
      });
    };

    img.src = resolvedImageUrl;
  }, [resolvedImageUrl, backColor, createBackTexture, renderFrame, updateBones]);

  const animateCurlTo = useCallback(
    (targetNormalized: number) => {
      animationControlsRef.current.curlAmount?.stop();
      startRenderLoop();
      animationControlsRef.current.curlAmount = animate(
        curlAmountMotion,
        targetNormalized,
        {
          type: "tween",
          duration: 0.55,
          ease: "easeInOut",
          onComplete: () => stopRenderLoop(),
        }
      );
    },
    [curlAmountMotion, startRenderLoop, stopRenderLoop]
  );

  const handlePointerEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (!isPressedRef.current) {
      animateCurlTo(hoverPeel / 100);
    }
  }, [hoverPeel, animateCurlTo]);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    isPressedRef.current = false;
    animateCurlTo(0);
  }, [animateCurlTo]);

  const handlePointerDown = useCallback(() => {
    isPressedRef.current = true;
    animateCurlTo(pressPeel / 100);
  }, [pressPeel, animateCurlTo]);

  const handlePointerUp = useCallback(() => {
    isPressedRef.current = false;
    if (isHoveringRef.current) {
      animateCurlTo(hoverPeel / 100);
    } else {
      animateCurlTo(0);
    }
  }, [hoverPeel, animateCurlTo]);

  useEffect(() => {
    const res = setupScene();
    if (res) {
      loadTexture();
    }
    return () => {
      stopRenderLoop();
      if (rendererRef.current) {
        try {
          rendererRef.current.dispose();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [setupScene, loadTexture, stopRenderLoop]);

  const offsetPercent = ((CANVAS_SCALE - 1) / 2) * 100;

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative inline-flex items-center justify-center overflow-visible select-none cursor-pointer ${className}`}
      style={{
        width: imageWidth,
        height: imageHeight,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `-${offsetPercent}%`,
          left: `-${offsetPercent}%`,
          display: "block",
          pointerEvents: "none",
          opacity: 1,
        }}
      />
    </div>
  );
}

export default StickerPeel;
