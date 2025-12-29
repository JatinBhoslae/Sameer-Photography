import React from "react";
import {
  useScroll,
  Scroll,
  Sparkles,
  Float,
  Environment,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import CameraModel from "./CameraModel";
import PortfolioGallery from "./PortfolioGallery";
import AboutScene from "./AboutScene";
import ServicesScene from "./ServicesScene";
import Overlay from "../ui/Overlay";

const Scene = () => {
  const scroll = useScroll();
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 5; // Viewport units for mobile detection
  const isSmallMobile = width < 3.5; // Extra small screens (<375px)
  const isTablet = width >= 5 && width < 8; // Approx tablet viewport units

  useFrame((state) => {
    // Smooth camera movement based on scroll
    const targetY = -scroll.offset * 49;

    // Smoothly interpolate camera position
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.05
    );
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D4AF37" />

      <Environment preset="city" />

      {/* Global Particles / Dust */}
      <Sparkles
        count={500}
        scale={[20, 100, 10]}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#D4AF37"
      />

      {/* Hero Section - Position: 0 (Camera) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <CameraModel
          position={
            isSmallMobile
              ? [0, -0.25, 0]
              : isMobile
              ? [0, -0.2, 0]
              : isTablet
              ? [0, -0.15, 0]
              : [0, 0, 0]
          }
          scale={isSmallMobile ? 0.5 : isMobile ? 0.6 : 0.8}
        />
      </Float>

      {/* Portfolio Section - Position: -8 (Gallery) */}
      <group position={[0, -8, 0]}>
        <PortfolioGallery />
      </group>

      {/* About Section - Position: -16 (Cylinder/Film Roll) */}
      <group
        position={[isMobile ? 0 : 3, -16, 0]}
        rotation={[0, -0.5, 0]}
        scale={isSmallMobile ? 0.6 : isMobile ? 0.7 : 0.9}
      >
        <AboutScene />
      </group>

      {/* Packages Section - Position: -24 (No 3D model - UI only) */}

      {/* Testimonials Section - Position: -32 (Single Ring/Torus - MUST BE VISIBLE) */}
      <group position={[0, -32, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh rotation={[0.5, 0.5, 0]}>
            <torusGeometry
              args={
                isSmallMobile
                  ? [1.5, 0.05, 16, 100]
                  : isMobile
                  ? [1.8, 0.05, 16, 100]
                  : [2, 0.05, 16, 100]
              }
            />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#D4AF37"
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      </group>

      {/* Contact Section - Position: -40 (3D Cube/Icosahedron - MUST BE VISIBLE) */}
      <group position={[isMobile ? -2 : -4, -40, 0]}>
        <Float speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh>
            <icosahedronGeometry
              args={isSmallMobile ? [1.3, 0] : isMobile ? [1.4, 0] : [1.5, 0]}
            />
            <meshStandardMaterial color="#111" wireframe />
          </mesh>
          <mesh>
            <icosahedronGeometry
              args={isSmallMobile ? [1.2, 0] : isMobile ? [1.3, 0] : [1.4, 0]}
            />
            <meshStandardMaterial color="#D4AF37" transparent opacity={0.1} />
          </mesh>
        </Float>
      </group>

      {/* Footer Section - Position: -48 to -56 (No 3D model - extra space for visibility) */}
    </>
  );
};

export default Scene;
