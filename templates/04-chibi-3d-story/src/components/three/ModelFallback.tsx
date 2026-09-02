import { Float } from "@react-three/drei";

export function ModelFallback({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group position={[0, -1.25, 0]}>
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={reducedMotion ? 0 : 0.08} floatIntensity={reducedMotion ? 0 : 0.12}>
        <mesh castShadow position={[0, 1.85, 0]}>
          <sphereGeometry args={[0.72, 32, 24]} />
          <meshStandardMaterial color="#c48fa3" roughness={0.5} metalness={0.05} />
        </mesh>
        <mesh castShadow position={[0, 0.65, 0]}>
          <capsuleGeometry args={[0.63, 1.2, 12, 24]} />
          <meshStandardMaterial color="#5d4057" roughness={0.58} />
        </mesh>
        <mesh position={[-0.22, 1.96, 0.65]}><sphereGeometry args={[0.055, 16, 12]} /><meshStandardMaterial color="#33262f" /></mesh>
        <mesh position={[0.22, 1.96, 0.65]}><sphereGeometry args={[0.055, 16, 12]} /><meshStandardMaterial color="#33262f" /></mesh>
      </Float>
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.45, 48]} />
        <shadowMaterial transparent opacity={0.16} />
      </mesh>
    </group>
  );
}
