import { Float, Sparkles, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Color, Group, MathUtils, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from "three";

const asset = (file: string) => `${import.meta.env.BASE_URL}models/${file}`;

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current = MathUtils.clamp(window.scrollY / maximum, 0, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return progress;
}

function IslandDestination() {
  const island = useGLTF(asset("island-foundations.glb"));
  const scene = useMemo(() => island.scene.clone(true), [island.scene]);
  const group = useRef<Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material instanceof MeshStandardMaterial) {
          material.roughness = 0.86;
          material.metalness = 0;
        }
      });
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = -1.04 + Math.sin(clock.elapsedTime * 0.28) * 0.025;
  });

  return <group ref={group} position={[1.8, -1.04, -16]} rotation={[0, -0.48, 0]} scale={15}><primitive object={scene} /></group>;
}

function CanoeVoyage({ progress }: { progress: MutableRefObject<number> }) {
  const closed = useGLTF(asset("canoe-closed.glb"));
  const open = useGLTF(asset("canoe-open.glb"));
  const closedScene = useMemo(() => closed.scene.clone(true), [closed.scene]);
  const openScene = useMemo(() => open.scene.clone(true), [open.scene]);
  const group = useRef<Group>(null);
  const closedGroup = useRef<Group>(null);
  const openGroup = useRef<Group>(null);

  useEffect(() => {
    [closedScene, openScene].forEach((scene) => scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }));
  }, [closedScene, openScene]);

  useFrame(({ clock }, delta) => {
    if (!group.current || !closedGroup.current || !openGroup.current) return;
    const p = progress.current;
    const sailOpen = MathUtils.smoothstep(p, 0.025, 0.13);
    closedGroup.current.visible = sailOpen < 0.55;
    openGroup.current.visible = sailOpen >= 0.55;
    const journey = Math.min(p / 0.22, 1);
    group.current.position.x = MathUtils.damp(group.current.position.x, MathUtils.lerp(-2.8, 0.2, journey), 4, delta);
    group.current.position.z = MathUtils.damp(group.current.position.z, MathUtils.lerp(-2.8, -10.2, journey), 4, delta);
    group.current.position.y = -0.56 + Math.sin(clock.elapsedTime * 1.2) * 0.08;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.018;
  });

  return (
    <group ref={group} position={[-2.8, -0.56, -2.8]} rotation={[0, 0.55, 0]}>
      <group ref={closedGroup} scale={3.1}><primitive object={closedScene} /></group>
      <group ref={openGroup} visible={false} scale={3.1}><primitive object={openScene} /></group>
    </group>
  );
}

function Ocean({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<Mesh<PlaneGeometry>>(null);
  const initial = useMemo<number[]>(() => [], []);
  useEffect(() => {
    const positions = mesh.current?.geometry.attributes.position;
    if (positions) for (let index = 0; index < positions.count; index += 1) initial[index] = positions.getZ(index);
  }, [initial]);
  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const positions = mesh.current?.geometry.attributes.position;
    if (!positions) return;
    const time = clock.elapsedTime;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      positions.setZ(index, (initial[index] ?? 0) + Math.sin(x * 0.3 + time * 0.7) * 0.12 + Math.cos(y * 0.25 + time * 0.48) * 0.08);
    }
    positions.needsUpdate = true;
  });
  return <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.13, -23]} receiveShadow><planeGeometry args={[90, 120, 36, 48]} /><meshPhysicalMaterial color="#087f9b" roughness={0.23} metalness={0.04} clearcoat={0.8} clearcoatRoughness={0.2} /></mesh>;
}

function CameraVoyage({ progress }: { progress: MutableRefObject<number> }) {
  const { camera } = useThree();
  const position = useRef(new Vector3());
  const lookAt = useRef(new Vector3());
  useFrame((_, delta) => {
    const p = progress.current;
    const journey = Math.min(p / 0.36, 1);
    position.current.set(Math.sin(p * Math.PI * 1.3) * 2.4, MathUtils.lerp(3.3, 4.6, journey), MathUtils.lerp(9, -8, journey));
    camera.position.lerp(position.current, 1 - Math.exp(-delta * 2.8));
    lookAt.current.set(1.2, 1.4, -16);
    camera.lookAt(lookAt.current);
  });
  return null;
}

function World({ reducedMotion }: { reducedMotion: boolean }) {
  const progress = useScrollProgress();
  return <><color attach="background" args={[new Color("#79ddd6")]} /><fog attach="fog" args={["#70d5d0", 25, 72]} /><ambientLight intensity={1.35} /><directionalLight position={[-8, 15, 9]} intensity={3.8} color="#fff0c2" castShadow={!reducedMotion} /><hemisphereLight args={["#d2fff2", "#07475d", 1.8]} /><Ocean reducedMotion={reducedMotion} /><Suspense fallback={null}><IslandDestination /><Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={0.015} floatIntensity={0.04}><CanoeVoyage progress={progress} /></Float></Suspense>{!reducedMotion && <Sparkles count={32} scale={[25, 8, 40]} position={[0, 5, -20]} size={1.1} speed={0.12} color="#fff1bd" />}<CameraVoyage progress={progress} /></>;
}

export function OceanWorld({ reducedMotion }: { reducedMotion: boolean }) {
  return <div className="ocean-world" aria-hidden="true"><Canvas dpr={[0.75, 1.35]} camera={{ position: [0, 3.3, 9], fov: 47 }} shadows={!reducedMotion} frameloop={reducedMotion ? "demand" : "always"} gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}><World reducedMotion={reducedMotion} /></Canvas><div className="ocean-world__haze" /><div className="ocean-world__status"><span>01</span> First landfall</div></div>;
}

useGLTF.preload(asset("island-foundations.glb"));
useGLTF.preload(asset("canoe-closed.glb"));
useGLTF.preload(asset("canoe-open.glb"));
