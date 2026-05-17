import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Highly detailed abstract futuristic object
function AbstractCore({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  
  // Track mouse and scroll for profound parallax
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const { camera } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse(new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      ));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!active) return;
    
    // Calculate scroll offset
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // Camera dive effect (Move forward into the scene as you scroll)
    const targetZ = 10 - (scrollProgress * 8); 
    const targetY = -(scrollProgress * 4);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, delta);
    camera.lookAt(0, 0, 0);

    // Smooth damp rotation towards mouse + continuous
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, mouse.y * 0.3 + scrollProgress * Math.PI, 3, delta);
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, mouse.x * 0.3 + state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI * 2, 3, delta);
      
      // Scale pulse based on scroll
      const scaleTarget = 1 + scrollProgress * 0.5;
      meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, scaleTarget, 2, delta));
    }
    
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.8;
      crystalRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        {/* Outer Tech Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 0.03, 32, 100]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} emissive="#00d2ff" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]} scale={0.8}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0.1} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} scale={1.2}>
          <torusGeometry args={[3.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#00d2ff" metalness={1} roughness={0} emissive="#00d2ff" emissiveIntensity={1.5} />
        </mesh>

        {/* Inner Glass Core */}
        <mesh ref={crystalRef} scale={1.8}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={3}
            resolution={512}
            thickness={2.5}
            chromaticAberration={1.5}
            anisotropy={0.3}
            distortion={0.8}
            distortionScale={0.5}
            temporalDistortion={0.2}
            color="#00d2ff"
            transmission={1}
            roughness={0.05}
            ior={1.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Core lighting */}
        <pointLight position={[0, 0, 0]} intensity={100} color="#00d2ff" distance={15} />
      </Float>
    </group>
  );
}

// Background Canvas that stays fixed but reacts to scroll deeply
export function GlobalCanvas({ active }: { active: boolean }) {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-brand-black overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 5, 20]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -20, -10]} intensity={6} color="#00d2ff" />
        <spotLight position={[0, 10, 0]} intensity={10} angle={0.8} penumbra={1} color="#00d2ff" />
        
        <Environment preset="studio" />

        {active && (
          <>
            <AbstractCore active={active} />
            <Sparkles count={150} scale={25} size={4} speed={0.5} opacity={0.5} color="#00d2ff" />
            <Sparkles count={80} scale={15} size={2} speed={0.3} opacity={0.2} color="#ffffff" />
            <ContactShadows frames={1} resolution={256} position={[0, -5, 0]} opacity={0.6} scale={30} blur={2.5} far={15} color="#00d2ff" />
          </>
        )}
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black opacity-90 mix-blend-multiply"></div>
      
      {/* Noise overlay for cinematic texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
