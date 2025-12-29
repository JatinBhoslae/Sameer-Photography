import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ServiceCard = ({ position, title, description }) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    const targetRotation = hovered ? Math.PI : 0;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotation,
      0.1
    );
  });

  return (
    <group position={position}>
      <group ref={ref}>
        {/* Front */}
        <group>
          <RoundedBox args={[2.5, 3.5, 0.1]} radius={0.1}>
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.5}
              roughness={0.5}
            />
          </RoundedBox>
          <Text
            position={[0, 0.5, 0.06]}
            fontSize={0.2}
            color="#D4AF37"
            maxWidth={2}
            textAlign="center"
          >
            {title}
          </Text>
          <Text
            position={[0, -0.5, 0.06]}
            fontSize={0.1}
            color="#aaa"
            maxWidth={2}
            textAlign="center"
          >
            Hover for details
          </Text>
        </group>

        {/* Back */}
        <group rotation={[0, Math.PI, 0]}>
          <RoundedBox args={[2.5, 3.5, 0.1]} radius={0.1}>
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.5}
              roughness={0.2}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.15}
            color="#000"
            maxWidth={2}
            textAlign="center"
          >
            {description}
          </Text>
        </group>
      </group>

      {/* Hit box for hover */}
      <mesh
        visible={false}
        onPointerOver={() => {
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[2.5, 3.5, 0.2]} />
      </mesh>
    </group>
  );
};

const ServicesScene = () => {
  return (
    <group>
      <ServiceCard
        position={[-3, 0, 0]}
        title="Wedding Shoots"
        description="Capturing your special moments with cinematic elegance."
      />
      <ServiceCard
        position={[0, 0, 0]}
        title="Portrait Sessions"
        description="Bringing out the true personality in every shot."
      />
      <ServiceCard
        position={[3, 0, 0]}
        title="Commercial"
        description="High-end product and brand photography."
      />
    </group>
  );
};

export default ServicesScene;
