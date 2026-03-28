import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate generic particle coords from text on offline canvas
function generateTextParticles(text: string, width: number, height: number, isMobile: boolean) {
  if (typeof document === 'undefined') return [];
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const fontSize = Math.min(width * 0.25, 220); 
  ctx.font = `900 ${fontSize}px "Inter", "Montserrat", "Arial Black", sans-serif`;
  ctx.letterSpacing = "8px";
  
  ctx.fillText(text, width / 2, height / 2);

  const imgData = ctx.getImageData(0, 0, width, height).data;
  const particles = [];
  
  // Drastically reduce particle count on mobile to drop CPU/GPU load
  const step = isMobile ? 6 : 3; 
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      if (imgData[idx] > 128) {
        const u = (x / width) * 2 - 1;   
        const v = -(y / height) * 2 + 1; 
        particles.push(new THREE.Vector3(u * 18, v * 18 * (height/width), 0)); 
      }
    }
  }

  return particles;
}

function ParticleText({ scrollProgress, isMobile }: { scrollProgress: number, isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const { viewport } = useThree();
  
  const basePositions = useRef<Float32Array>(new Float32Array());
  const randomPositions = useRef<Float32Array>(new Float32Array());
  const currentPositions = useRef<Float32Array>(new Float32Array());
  
  // Calculate dynamic scale to ensure it fits mobile screens (approx 20 units wide originally)
  const responsiveScale = Math.min(1.0, (viewport.width * 0.85) / 20);
  
  // Create circular particle texture
  const circleTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      // Draw a solid circle
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  useEffect(() => {
    const pts = generateTextParticles("NIOH", 1024, 512, isMobile);
    const base = new Float32Array(pts.length * 3);
    const rand = new Float32Array(pts.length * 3);
    const curr = new Float32Array(pts.length * 3);
    
    pts.forEach((p, i) => {
      base[i*3] = p.x;
      base[i*3+1] = p.y;
      base[i*3+2] = p.z;
      rand[i*3] = (Math.random() - 0.5) * 80;
      rand[i*3+1] = (Math.random() - 0.5) * 80;
      rand[i*3+2] = (Math.random() - 0.5) * 80;

      curr[i*3] = rand[i*3];
      curr[i*3+1] = rand[i*3+1];
      curr[i*3+2] = rand[i*3+2];
    });
    
    basePositions.current = base;
    randomPositions.current = rand;
    currentPositions.current = curr;
    
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(curr, 3));
    }
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!geometryRef.current?.attributes?.position) return;
    
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    
    const targetProgress = scrollProgress;
    
    // Scale down mouse hover forces based on scale so the interaction feels the same
    const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vec.unproject(state.camera);
    vec.sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / vec.z;
    const mousePos = state.camera.position.clone().add(vec.multiplyScalar(dist));
    
    // Adjust mouse pos inversely by scale to match unscaled coordinates
    mousePos.x /= responsiveScale;
    mousePos.y /= responsiveScale;

    const hoverRadius = 1.8; 
    const hoverForce = 0.5;  

    for (let i = 0; i < positions.length / 3; i++) {
        const bx = basePositions.current[i*3];
        const by = basePositions.current[i*3+1];
        const bz = basePositions.current[i*3+2];
        
        let targetX = bx;
        let targetY = by;
        let targetZ = bz;

        if (targetProgress > 0.8) {
           const dx = bx - mousePos.x;
           const dy = by - mousePos.y;
           const d = Math.sqrt(dx*dx + dy*dy);
           if (d < hoverRadius && d > 0.01) {
              const force = Math.pow(1 - d / hoverRadius, 1.5) * hoverForce;
              targetX += (dx / d) * force;
              targetY += (dy / d) * force;
              targetZ += force * 4.0; 
           }
        }

        const tx = randomPositions.current[i*3] + (targetX - randomPositions.current[i*3]) * targetProgress;
        const ty = randomPositions.current[i*3+1] + (targetY - randomPositions.current[i*3+1]) * targetProgress;
        const tz = randomPositions.current[i*3+2] + (targetZ - randomPositions.current[i*3+2]) * targetProgress;
        
        let wave = 0;
        if (targetProgress > 0.8) {
           wave = Math.sin(state.clock.elapsedTime * 1.5 + bx * 0.5) * 0.15;
        }
        
        currentPositions.current[i*3] += (tx - currentPositions.current[i*3]) * delta * 5;
        currentPositions.current[i*3+1] += (ty + wave - currentPositions.current[i*3+1]) * delta * 5;
        currentPositions.current[i*3+2] += (tz - currentPositions.current[i*3+2]) * delta * 5;
        
        positions[i*3] = currentPositions.current[i*3];
        positions[i*3+1] = currentPositions.current[i*3+1];
        positions[i*3+2] = currentPositions.current[i*3+2];
    }
    
    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial 
        size={isMobile ? 0.14 : 0.08} 
        map={circleTexture}
        alphaTest={0.01}
        color="#FFE066" 
        transparent 
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Start false to match SSR

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches); // Hydrate immediate client width
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: () => "+=" + (window.innerHeight * 7), // forms over 700vh 
      scrub: true,
      onUpdate: (self) => {
        // Exaggerate curve strictly on mobile so the particles stay scattered longer and form at the very end
        const power = isMobile ? 3.5 : 1.2;
        setProgress(Math.pow(self.progress, power)); 
      }
    });

    return () => st.kill();
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-20"
      style={{
        backgroundColor: progress > 0.8 ? `rgba(0,0,0,${Math.min(0.5, (progress - 0.8) * 2.5)})` : 'transparent',
        backdropFilter: (!isMobile && progress > 0.8) ? `blur(${Math.min(12, (progress - 0.8) * 60)}px)` : 'none',
        WebkitBackdropFilter: (!isMobile && progress > 0.8) ? `blur(${Math.min(12, (progress - 0.8) * 60)}px)` : 'none',
        pointerEvents: progress > 0.95 ? 'auto' : 'none'
      }}
    >
      <div 
        className="absolute bottom-[20%] w-full text-center pointer-events-none"
        style={{ 
          opacity: progress > 0.9 ? Math.min(1, (progress - 0.9) * 10) : 0, 
          transform: `translateY(${progress > 0.9 ? Math.max(0, 20 - (progress - 0.9) * 200) : 20}px)` 
        }}
      >
        <div className="font-heading text-[1.2rem] md:text-[1.5rem] tracking-[0.4em] text-[#FFD700] uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
          NCS In Out Hacks
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ParticleText scrollProgress={progress} isMobile={isMobile} />
        </Canvas>
      </div>
    </div>
  );
}
