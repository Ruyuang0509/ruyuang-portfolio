import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  Mesh,
  Points,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
} from "three";
import LeanR3FCanvas from "./LeanR3FCanvas.jsx";

extend({
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Mesh,
  Points,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
});

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormal;

  void main() {
    vNormal = normal;
    float wave = sin(position.y * 4.2 + uTime * 1.25) * 0.13;
    float crossWave = sin(position.x * 3.1 - uTime * 0.9) * 0.08;
    float pointerPull = length(uPointer) * 0.18;
    vec3 displaced = position + normal * (wave + crossWave + pointerPull);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;

  void main() {
    float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 color = mix(uColorA, uColorB, fresnel);
    gl_FragColor = vec4(color, 0.78);
  }
`;

function FluidOrb({ active, segments, radius }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uColorA: { value: new Color("#c2d873") },
      uColorB: { value: new Color("#b45f77") },
    }),
    [],
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!active) return;
    if (document.hidden) return;
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.lerp(pointer, 0.08);
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.18, 0.08);
  });
  // Codex-Fix: R3F plus native shader uniforms create a free interactive fluid orb.

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[radius, segments, segments]} />
      {/* Codex-Fix: Scale shader geometry density by device class so mobile GPUs do less work. */}
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleField({ active, count }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 9;
      values[index * 3 + 1] = (Math.random() - 0.5) * 5.2;
      values[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    return values;
  }, [count]);

  useFrame(({ pointer }, delta) => {
    if (!active) return;
    if (document.hidden) return;
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x = MathUtils.lerp(pointsRef.current.rotation.x, pointer.y * 0.05, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#efe9dc" transparent opacity={0.42} />
    </points>
  );
}

export default function HeroScene({ active = true, eventSource }) {
  const sceneQuality = useMemo(() => {
    const isCompact = window.matchMedia("(max-width: 767px)").matches;
    const isLowPower = (navigator.hardwareConcurrency ?? 8) <= 4;

    return {
      maxDpr: isCompact || isLowPower ? 1.12 : 1.35,
      particles: isCompact || isLowPower ? 120 : 180,
      sphereSegments: isCompact || isLowPower ? 44 : 56,
      sphereRadius: isCompact ? 1.22 : 1.58,
      antialias: !(isCompact || isLowPower),
    };
  }, []);
  // Codex-Fix: Adapt R3F quality for mobile and low-core devices instead of removing the 3D identity.

  return (
    <LeanR3FCanvas
      active={active}
      maxDpr={sceneQuality.maxDpr}
      antialias={sceneQuality.antialias}
      eventSource={eventSource}
    >
      <ambientLight intensity={0.22} />
      <FluidOrb active={active} segments={sceneQuality.sphereSegments} radius={sceneQuality.sphereRadius} />
      <ParticleField active={active} count={sceneQuality.particles} />
    </LeanR3FCanvas>
  );
}
// Codex-Fix: Accept an active flag from IntersectionObserver so offscreen WebGL does not burn frames.
