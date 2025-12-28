import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Text } from '@react-three/drei';

const AboutScene = (props) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group {...props}>
      <Cylinder ref={meshRef} args={[1, 1, 2, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        {/* Film strips simulation rings */}
        <group>
           <Cylinder args={[1.01, 1.01, 0.2, 32]} position={[0, 0.8, 0]}>
             <meshStandardMaterial color="#D4AF37" />
           </Cylinder>
           <Cylinder args={[1.01, 1.01, 0.2, 32]} position={[0, -0.8, 0]}>
             <meshStandardMaterial color="#D4AF37" />
           </Cylinder>
        </group>
      </Cylinder>
    </group>
  );
};

export default AboutScene;
