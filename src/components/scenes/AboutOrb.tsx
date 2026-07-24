import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/constants';
import * as THREE from 'three';

const InteractiveOrb = ({ isHovered, setHovered }: { isHovered: boolean, setHovered: (v: boolean) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere 
        ref={meshRef} 
        args={[1, 64, 64]} 
        scale={isHovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial 
          color={isHovered ? "#b026ff" : "#00f0ff"} 
          attach="material" 
          distort={isHovered ? 0.6 : 0.4} 
          speed={isHovered ? 4 : 2} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const AboutOrb = () => {
  const [isHovered, setHovered] = useState(false);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-20 px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="h-[400px] w-full relative interactive cursor-pointer">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#00f0ff" intensity={1} />
            <InteractiveOrb isHovered={isHovered} setHovered={setHovered} />
          </Canvas>
          
          <AnimatePresence>
            {!isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-sm font-medium tracking-widest text-text/50 uppercase">Hover the Orb</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glassmorphism p-8 rounded-2xl"
              >
                <p className="text-lg leading-relaxed text-text">
                  {PORTFOLIO_DATA.about}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glassmorphism p-8 rounded-2xl opacity-50"
              >
                <div className="h-4 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full mb-4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
