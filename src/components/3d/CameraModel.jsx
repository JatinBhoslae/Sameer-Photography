import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CameraModel = (props) => {
  const group = useRef();
  const lensRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle floating
    group.current.position.y = Math.sin(t / 2) * 0.1;
    group.current.rotation.z = Math.sin(t / 4) * 0.05;
    
    // Mouse interaction for lens
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;
    
    lensRef.current.rotation.x = THREE.MathUtils.lerp(lensRef.current.rotation.x, mouseY * 0.2, 0.1);
    lensRef.current.rotation.y = THREE.MathUtils.lerp(lensRef.current.rotation.y, mouseX * 0.2, 0.1);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Body */}
      <RoundedBox args={[3, 2, 1]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </RoundedBox>
      
      {/* Top Grip */}
      <RoundedBox args={[1, 0.5, 0.8]} radius={0.1} position={[0.8, 1.2, 0]}>
         <meshStandardMaterial color="#111" roughness={0.8} />
      </RoundedBox>

      {/* Shutter Button */}
      <Cylinder args={[0.15, 0.15, 0.2]} position={[1, 1.1, 0.2]}>
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </Cylinder>

      {/* Lens Group */}
      <group ref={lensRef} position={[0, 0, 0.6]}>
        {/* Outer Ring */}
        <Cylinder args={[0.9, 0.9, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#111" roughness={0.5} />
        </Cylinder>
        
        {/* Gold Ring */}
        <Cylinder args={[0.85, 0.85, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </Cylinder>

        {/* Glass Element */}
        <Cylinder args={[0.8, 0.8, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
            bg="black"
          />
        </Cylinder>
        
        {/* Inner Glass Reflection */}
         <Cylinder args={[0.6, 0.6, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
             <meshBasicMaterial color="#000" />
         </Cylinder>
      </group>
      
      {/* Viewfinder Bump */}
      <RoundedBox args={[1.2, 0.8, 1]} radius={0.1} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </RoundedBox>

    </group>
  );
};

export default CameraModel;
