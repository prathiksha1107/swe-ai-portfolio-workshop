import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AnimationAction, AnimationClip, Bone, Box3, Group, LoopOnce, LoopRepeat, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

type PointerTarget = { x: number; y: number; active: boolean; scroll: number };
type BoneTarget = { bone: Bone; influence: number; appliedX: number; appliedY: number };

const clipNamed = (clips: AnimationClip[], names: string[]) =>
  clips.find((clip) => names.some((name) => clip.name.toLowerCase().includes(name)));

const normalized = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");

function findBone(root: Object3D, names: string[]) {
  let result: Bone | undefined;
  root.traverse((object) => {
    if (result || !(object instanceof Bone)) return;
    const boneName = normalized(object.name);
    if (names.some((name) => boneName === name || boneName.endsWith(name))) result = object;
  });
  return result;
}

export function ChibiModel({ url, pointer, cursorEnabled, reducedMotion, activeSection }: { url: string; pointer: React.MutableRefObject<PointerTarget>; cursorEnabled: boolean; reducedMotion: boolean; activeSection: string }) {
  const source = useGLTF(url);
  const model = useMemo(() => {
    const instance = clone(source.scene);
    instance.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      const cleanMaterials = materials.map((material) => {
        const cleanMaterial = material.clone();
        if (cleanMaterial instanceof MeshStandardMaterial) {
          // The generated normal atlas has a visible UV seam across the brow.
          // The base-color atlas already carries the stylized surface detail.
          cleanMaterial.normalMap = null;
          cleanMaterial.needsUpdate = true;
        }
        return cleanMaterial;
      });
      object.material = Array.isArray(object.material) ? cleanMaterials : cleanMaterials[0];
    });
    return instance;
  }, [source.scene]);
  // Tripo's generated Head tracks deform the dense single-mesh face and can pull
  // hair/eyelid vertices across the eyes. The neck still carries natural head
  // movement, so omit only those direct Head tracks while preserving each clip.
  const faceSafeAnimations = useMemo(() => source.animations.map((clip) => {
    const safeClip = clip.clone();
    safeClip.tracks = safeClip.tracks.filter((track) => {
      const nodeName = track.name.slice(0, track.name.lastIndexOf("."));
      return !normalized(nodeName).endsWith("head");
    });
    return safeClip;
  }), [source.animations]);
  const framing = useMemo(() => {
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    return {
      scale: size.y > 0 ? 2.85 / size.y : 1,
      position: [-center.x, -bounds.min.y, -center.z] as [number, number, number],
    };
  }, [model]);
  const root = useRef<Group>(null);
  const look = useRef({ x: 0, y: 0 });
  const scrollPose = useRef({ lean: 0, lift: 0 });
  const activeAction = useRef<AnimationAction | undefined>(undefined);
  const previousSection = useRef(activeSection);
  const { mixer } = useAnimations(faceSafeAnimations, model);

  const responsiveBones = useMemo<BoneTarget[]>(() => {
    const candidates = [
      { bone: findBone(model, ["neck"]), influence: 0.52 },
      { bone: findBone(model, ["upperchest", "chest", "spine2"]), influence: 0.16 },
    ];
    return candidates.filter((item): item is { bone: Bone; influence: number } => Boolean(item.bone)).map((item) => ({ ...item, appliedX: 0, appliedY: 0 }));
  }, [model]);

  useEffect(() => {
    const clips = faceSafeAnimations;
    const greetClip = clipNamed(clips, ["greet", "wave", "hello"]);
    const idleClip = clipNamed(clips, ["idle"]);
    const greet = greetClip ? mixer.clipAction(greetClip, model) : undefined;
    const idle = idleClip ? mixer.clipAction(idleClip, model) : undefined;
    let active: AnimationAction | undefined;

    const playIdle = () => {
      if (!idle) return;
      idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).fadeIn(0.35).play();
      active = idle;
      activeAction.current = idle;
    };
    const finishGreet = (event: { action: AnimationAction }) => {
      if (event.action !== greet) return;
      greet?.fadeOut(0.35);
      playIdle();
    };

    if (reducedMotion && idle && idleClip) {
      // Use a representative Idle frame instead of exposing the rig's T-pose.
      idle.reset().play();
      idle.time = Math.min(idleClip.duration * 0.25, 0.5);
      mixer.update(0);
      idle.paused = true;
      active = idle;
      activeAction.current = idle;
    } else if (greet) {
      greet.reset().setLoop(LoopOnce, 1).setEffectiveWeight(1).fadeIn(0.2).play();
      greet.clampWhenFinished = true;
      active = greet;
      activeAction.current = greet;
      mixer.addEventListener("finished", finishGreet);
    } else {
      playIdle();
    }

    return () => {
      mixer.removeEventListener("finished", finishGreet);
      active?.stop();
      activeAction.current = undefined;
    };
  }, [faceSafeAnimations, mixer, model, reducedMotion]);

  useEffect(() => {
    const previous = previousSection.current;
    previousSection.current = activeSection;
    if (reducedMotion) return;
    const bowClip = clipNamed(faceSafeAnimations, ["bow"]);
    const greetClip = clipNamed(faceSafeAnimations, ["greet", "wave", "hello"]);
    const idleClip = clipNamed(faceSafeAnimations, ["idle"]);
    const idle = idleClip ? mixer.clipAction(idleClip, model) : undefined;
    const isGestureSection = activeSection === "about" || activeSection === "contact";
    const wasGestureSection = previous === "about" || previous === "contact";

    if (!isGestureSection) {
      if (wasGestureSection && idle) {
        activeAction.current?.fadeOut(0.25);
        idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).fadeIn(0.35).play();
        activeAction.current = idle;
      }
      return;
    }
    const gestureClip = activeSection === "contact" ? greetClip : bowClip;
    if (!gestureClip) return;
    const gesture = mixer.clipAction(gestureClip, model);

    activeAction.current?.fadeOut(0.25);
    gesture.reset().setLoop(LoopOnce, 1).setEffectiveWeight(1).fadeIn(0.25).play();
    gesture.clampWhenFinished = true;
    activeAction.current = gesture;

    const finishGesture = (event: { action: AnimationAction }) => {
      if (event.action !== gesture) return;
      gesture.fadeOut(0.35);
      if (idle) {
        idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).fadeIn(0.35).play();
        activeAction.current = idle;
      }
    };
    mixer.addEventListener("finished", finishGesture);
    return () => mixer.removeEventListener("finished", finishGesture);
  }, [activeSection, faceSafeAnimations, mixer, model, reducedMotion]);

  useFrame((_, delta) => {
    const enabled = cursorEnabled && !reducedMotion && pointer.current.active;
    const targetX = enabled ? pointer.current.x : 0;
    const targetY = enabled ? pointer.current.y : 0;
    const damping = 1 - Math.exp(-delta * 7);
    look.current.x += (targetX - look.current.x) * damping;
    look.current.y += (targetY - look.current.y) * damping;

    const yaw = look.current.x * (Math.PI / 20); // maximum 9 degrees
    const pitch = -look.current.y * (Math.PI / 48); // maximum 3.75 degrees
    const scrollPhase = reducedMotion ? 0 : pointer.current.scroll * 0.0042;
    const targetLean = Math.sin(scrollPhase) * (Math.PI / 90);
    const targetLift = Math.sin(scrollPhase * 0.72) * 0.035;
    scrollPose.current.lean += (targetLean - scrollPose.current.lean) * damping;
    scrollPose.current.lift += (targetLift - scrollPose.current.lift) * damping;
    if (responsiveBones.length) {
      responsiveBones.forEach((target) => {
        target.bone.rotation.x -= target.appliedX;
        target.bone.rotation.y -= target.appliedY;
        target.appliedX = pitch * target.influence;
        target.appliedY = yaw * target.influence;
        target.bone.rotation.x += target.appliedX;
        target.bone.rotation.y += target.appliedY;
      });
      // Let the complete character turn with the pointer while the head and spine
      // add smaller, natural-looking follow-through on top of that movement.
      if (root.current) {
        root.current.rotation.y = yaw * 0.9 + scrollPose.current.lean * 0.45;
        root.current.rotation.z = scrollPose.current.lean;
        root.current.position.y = scrollPose.current.lift;
      }
    } else if (root.current) {
      root.current.rotation.y = yaw + scrollPose.current.lean * 0.45;
      root.current.rotation.x = pitch;
      root.current.rotation.z = scrollPose.current.lean;
      root.current.position.y = scrollPose.current.lift;
    }
  });

  return <group ref={root} scale={framing.scale}><primitive object={model} position={framing.position} castShadow receiveShadow /></group>;
}
