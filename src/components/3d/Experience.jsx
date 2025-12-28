import React, { useRef } from "react";
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
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    // Smooth camera movement based on scroll
    // The scroll.offset is between 0 and 1
    // We want to move the camera down along the Y axis

    // Total scrollable height in 3D units roughly corresponds to pages * viewport height
    // But we are manually positioning sections.
    // Let's say each section is 10 units apart.
    // Total distance = 50 units (for 6 sections starting at 0 to -50)

    const targetY = -scroll.offset * 50;

    // Smoothly interpolate camera position
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.05
    );

    // Look a bit down or up depending on scroll speed (optional polish)
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

      {/* Hero Section - Position: 0 */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <CameraModel position={[0, 0, 0]} scale={0.8} />
      </Float>

      {/* Portfolio Section - Position: -10 */}
      <group position={[0, -10, 0]}>
        <PortfolioGallery />
      </group>

      {/* About Section - Position: -20 */}
      <group position={[3, -20, 0]} rotation={[0, -0.5, 0]}>
        <AboutScene />
      </group>

      {/* Services Section - Position: -30 */}
      {/* Removed 3D ServicesScene to avoid conflict with Overlay pricing table */}
      {/* <group position={[0, -30, 0]}>
        <ServicesScene />
      </group> */}
      
      {/* Testimonials - Position: -40 */}
      <group position={[0, -40, 0]}>
        {/* Simple visual for testimonials */}
         <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh rotation={[0.5, 0.5, 0]}>
                <torusGeometry args={[2, 0.05, 16, 100]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
            </mesh>
         </Float>
      </group>

      {/* Contact Section - Position: -50 */}
      <group position={[-3, -50, 0]}>
         <Float speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#111" wireframe />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[1.4, 0]} />
            <meshStandardMaterial color="#D4AF37" transparent opacity={0.1} />
          </mesh>
        </Float>
      </group>
    </>
  );
};

export default Scene;
