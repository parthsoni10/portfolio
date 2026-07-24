import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload, Float } from '@react-three/drei';
import { useTheme } from './ThemeProvider';
import * as THREE from 'three';

const ParticleSystem = () => {
  const points = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(theme === 'dark' ? '#00f0ff' : '#000000');
  const color2 = new THREE.Color(theme === 'dark' ? '#b026ff' : '#666666');

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export const CanvasContainer = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <ParticleSystem />
        
        {/* Placeholder floating geometry for background depth */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 2, -5]} rotation={[1, 1, 1]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
          </mesh>
        </Float>
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[4, -1, -8]} rotation={[0.5, 0.5, 0]}>
            <torusGeometry args={[1, 0.2, 16, 32]} />
            <meshStandardMaterial color="#b026ff" wireframe transparent opacity={0.2} />
          </mesh>
        </Float>

        <Preload all />
      </Canvas>
    </div>
  );
};
