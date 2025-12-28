import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, Text, useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const images = [
  // Weddings
  {
    url: "/portfolio/wedding-1.jpg",
    // category: "Weddings",
    position: [-2, 0, 1.5],
    rotation: [0, 0.3, 0],
  },
  {
    url: "/portfolio/wedding-2.jpg",
    // category: "Weddings",
    position: [2, 1, 0],
    rotation: [0, -0.3, 0],
  },
  // Portraits
  {
    url: "/portfolio/wedding-3.jpg",
    // category: "Portraits",
    position: [-3, -1.5, 0],
    rotation: [0, 0.2, 0],
  },
  {
    url: "/portfolio/wedding-4.jpg",
    // category: "Portraits",
    position: [1.5, -1, 2],
    rotation: [0, -0.2, 0],
  },
  // Street
  {
    url: "/portfolio/wedding-5.jpg",
    // category: "Street",
    position: [-1.5, 2, 1],
    rotation: [0, 0.1, 0],
  },
  // Travel
  {
    url: "/portfolio/wedding-6.jpg",
    // category: "Travel",
    position: [3, 2, -1],
    rotation: [0, -0.4, 0],
  },
];

const Frame = ({ url, position, rotation, category, ...props }) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    // Subtle float
    ref.current.position.y +=
      Math.sin(state.clock.elapsedTime + position[0]) * 0.002;

    // Hover effect
    const targetScale = hovered ? 1.2 : 1;
    ref.current.scale.x = THREE.MathUtils.lerp(
      ref.current.scale.x,
      targetScale,
      0.1
    );
    ref.current.scale.y = THREE.MathUtils.lerp(
      ref.current.scale.y,
      targetScale,
      0.1
    );

    // Material grayscale to color on hover
    ref.current.material.grayscale = THREE.MathUtils.lerp(
      ref.current.material.grayscale,
      hovered ? 0 : 1,
      0.1
    );
  });

  return (
    <group position={position} rotation={rotation} {...props}>
      <Image
        ref={ref}
        url={url}
        scale={[2, 3]}
        transparent
        onPointerOver={() => {
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
        onClick={() => setActive(!active)}
      />
      {/* {hovered && (
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.2}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
        >
          {category}
        </Text>
      )} */}
    </group>
  );
};

const PortfolioGallery = () => {
  const group = useRef();
  const { width, height } = useThree((state) => state.viewport);

  return (
    <group ref={group}>
      {images.map((img, i) => (
        <Frame key={i} {...img} />
      ))}
    </group>
  );
};

export default PortfolioGallery;
