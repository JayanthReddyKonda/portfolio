"use client";

/**
 * @file Character.tsx
 * @description 3D Avatar Rig using Three.js AnimationMixer & Bone Parallax.
 * Source GLB: public/models/character-transformed.glb
 *
 * Capabilities:
 * - Real-time skeletal head and neck look-at tracking following the cursor.
 * - Smooth AnimationMixer crossfading across GLB animations.
 * - Compliant with React Compiler and React 19 immutability guidelines.
 */

import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useGraph, type ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName =
  | "Bow RT"
  | "Idle_FoldArms RT"
  | "Idle_TalkingPhone RT"
  | "Walk_Formal RT";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    AvatarBody: THREE.SkinnedMesh;
    AvatarEyelashes: THREE.SkinnedMesh;
    AvatarHead: THREE.SkinnedMesh;
    AvatarLeftCornea: THREE.SkinnedMesh;
    AvatarLeftEyeball: THREE.SkinnedMesh;
    AvatarRightCornea: THREE.SkinnedMesh;
    AvatarRightEyeball: THREE.SkinnedMesh;
    AvatarTeethLower: THREE.SkinnedMesh;
    AvatarTeethUpper: THREE.SkinnedMesh;
    outfit_bottom: THREE.SkinnedMesh;
    outfit_shoes: THREE.SkinnedMesh;
    outfit_top: THREE.SkinnedMesh;
    pelvis: THREE.Bone;
  };
  materials: {
    AvatarBody: THREE.MeshStandardMaterial;
    AvatarEyelashes: THREE.MeshStandardMaterial;
    AvatarHead: THREE.MeshStandardMaterial;
    AvatarLeftCornea: THREE.MeshStandardMaterial;
    AvatarLeftEyeball: THREE.MeshStandardMaterial;
    AvatarTeethLower: THREE.MeshStandardMaterial;
    outfit_bottom: THREE.MeshStandardMaterial;
    outfit_shoes: THREE.MeshStandardMaterial;
    outfit_top: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

const HEAD_BONE_CANDIDATES = ["mixamorigHead", "head", "Head"] as const;
const NECK_BONE_CANDIDATES = ["mixamorigNeck", "neck_01", "Neck1"] as const;

const HEAD_LOOK = { x: 0.18, y: 0.32 };
const NECK_LOOK = { x: 0.08, y: 0.14 };
const LOOK_DAMPING = 4.5;

const MODEL_PATH = "/models/character-transformed.glb";

export function Character(props: ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

  // Dedicated Three.js animation mixer for smooth clip transitions
  const mixer = useMemo(() => new THREE.AnimationMixer(clone), [clone]);

  const clipActions = useMemo(() => {
    const map = new Map<ActionName, THREE.AnimationAction>();
    for (const clip of animations) {
      map.set(clip.name as ActionName, mixer.clipAction(clip));
    }
    return map;
  }, [animations, mixer]);

  const bonesRef = useRef<{ head?: THREE.Bone; neck?: THREE.Bone }>(null);
  const basePoses = useRef(new Map<THREE.Bone, THREE.Euler>());

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const resolveBone = (candidates: readonly string[]): THREE.Bone | undefined => {
    for (const name of candidates) {
      const bone = clone.getObjectByName(name);
      if (bone) return bone as THREE.Bone;
    }
    return undefined;
  };

  // Start initial confident idle animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialAction = clipActions.get("Idle_FoldArms RT");
    if (initialAction) {
      initialAction.setLoop(THREE.LoopRepeat, Infinity);
      initialAction.fadeIn(0.8).play();
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [clipActions, mixer]);

  // Update Animation Mixer and Cursor Parallax each frame
  useFrame((state, delta) => {
    mixer.update(delta);

    if (prefersReducedMotion) return;

    if (bonesRef.current === null) {
      bonesRef.current = {
        head: resolveBone(HEAD_BONE_CANDIDATES),
        neck: resolveBone(NECK_BONE_CANDIDATES),
      };
    }
    const { head, neck } = bonesRef.current;

    const alpha = 1 - Math.exp(-LOOK_DAMPING * delta);
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const applyLook = (bone: THREE.Bone | undefined, limit: { x: number; y: number }) => {
      if (!bone) return;

      let base = basePoses.current.get(bone);
      if (!base) {
        base = new THREE.Euler(
          bone.rotation.x,
          bone.rotation.y,
          bone.rotation.z,
        );
        basePoses.current.set(bone, base);
      }

      bone.rotation.y = THREE.MathUtils.lerp(
        bone.rotation.y,
        base.y + pointerX * limit.y,
        alpha,
      );
      bone.rotation.x = THREE.MathUtils.lerp(
        bone.rotation.x,
        base.x - pointerY * limit.x,
        alpha,
      );
    };

    applyLook(head, HEAD_LOOK);
    applyLook(neck, NECK_LOOK);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="AuxScene">
        <group name="AvatarRoot">
          <primitive object={nodes.pelvis} />
        </group>
        <skinnedMesh
          name="AvatarBody"
          geometry={nodes.AvatarBody.geometry}
          material={materials.AvatarBody}
          skeleton={nodes.AvatarBody.skeleton}
        />
        <skinnedMesh
          name="AvatarEyelashes"
          geometry={nodes.AvatarEyelashes.geometry}
          material={materials.AvatarEyelashes}
          skeleton={nodes.AvatarEyelashes.skeleton}
        />
        <skinnedMesh
          name="AvatarHead"
          geometry={nodes.AvatarHead.geometry}
          material={materials.AvatarHead}
          skeleton={nodes.AvatarHead.skeleton}
        />
        <skinnedMesh
          name="AvatarLeftCornea"
          geometry={nodes.AvatarLeftCornea.geometry}
          material={materials.AvatarLeftCornea}
          skeleton={nodes.AvatarLeftCornea.skeleton}
        />
        <skinnedMesh
          name="AvatarLeftEyeball"
          geometry={nodes.AvatarLeftEyeball.geometry}
          material={materials.AvatarLeftEyeball}
          skeleton={nodes.AvatarLeftEyeball.skeleton}
        />
        <skinnedMesh
          name="AvatarRightCornea"
          geometry={nodes.AvatarRightCornea.geometry}
          material={materials.AvatarLeftCornea}
          skeleton={nodes.AvatarRightCornea.skeleton}
        />
        <skinnedMesh
          name="AvatarRightEyeball"
          geometry={nodes.AvatarRightEyeball.geometry}
          material={materials.AvatarLeftEyeball}
          skeleton={nodes.AvatarRightEyeball.skeleton}
        />
        <skinnedMesh
          name="AvatarTeethLower"
          geometry={nodes.AvatarTeethLower.geometry}
          material={materials.AvatarTeethLower}
          skeleton={nodes.AvatarTeethLower.skeleton}
        />
        <skinnedMesh
          name="AvatarTeethUpper"
          geometry={nodes.AvatarTeethUpper.geometry}
          material={materials.AvatarTeethLower}
          skeleton={nodes.AvatarTeethUpper.skeleton}
        />
        <skinnedMesh
          name="outfit_bottom"
          geometry={nodes.outfit_bottom.geometry}
          material={materials.outfit_bottom}
          skeleton={nodes.outfit_bottom.skeleton}
        />
        <skinnedMesh
          name="outfit_shoes"
          geometry={nodes.outfit_shoes.geometry}
          material={materials.outfit_shoes}
          skeleton={nodes.outfit_shoes.skeleton}
        />
        <skinnedMesh
          name="outfit_top"
          geometry={nodes.outfit_top.geometry}
          material={materials.outfit_top}
          skeleton={nodes.outfit_top.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default Character;
