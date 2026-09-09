export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#fff7f0", "#593d52", 1.25]} />
      <directionalLight castShadow position={[4, 6, 5]} intensity={2.4} color="#fff2e3" shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 1, 3]} intensity={16} distance={9} color="#c890a4" />
    </>
  );
}
