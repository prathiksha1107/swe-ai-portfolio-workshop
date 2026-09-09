import { ContactShadows } from "@react-three/drei";
import type { MutableRefObject } from "react";
import { ChibiModel } from "./ChibiModel";
import { Lighting } from "./Lighting";
import { ModelFallback } from "./ModelFallback";

type PointerTarget = { x: number; y: number; active: boolean; scroll: number };

export function ChibiScene({ modelAvailable, modelUrl, pointer, cursorEnabled, reducedMotion, activeSection }: { modelAvailable: boolean; modelUrl: string; pointer: MutableRefObject<PointerTarget>; cursorEnabled: boolean; reducedMotion: boolean; activeSection: string }) {
  return (
    <>
      <Lighting />
      <group position={[0, -1.65, 0]}>
        {modelAvailable ? <ChibiModel url={modelUrl} pointer={pointer} cursorEnabled={cursorEnabled} reducedMotion={reducedMotion} activeSection={activeSection} /> : <ModelFallback reducedMotion={reducedMotion} />}
      </group>
      <ContactShadows position={[0, -1.65, 0]} opacity={0.24} scale={4.5} blur={2.5} far={4} frames={1} />
    </>
  );
}
