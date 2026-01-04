import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, useScroll, Html } from "@react-three/drei";
import * as THREE from "three";

const images = [
  // Horizontal flow - images positioned along X axis
  { url: "/portfolio/wedding-1.jpg" },
  { url: "/portfolio/wedding-2.jpg" },
  { url: "/portfolio/wedding-3.jpg" },
  { url: "/portfolio/wedding-4.jpg" },
  { url: "/portfolio/wedding-5.jpg" },
  { url: "/portfolio/wedding-6.jpg" },
];

const Frame = ({ url, index, imageScale, ...props }) => {
  const ref = useRef();
  const imageRef = useRef();
  const [hovered, setHover] = useState(false);
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 5;

  const scale = imageScale;

  useFrame((state) => {
    if (!ref.current || !imageRef.current) return;

    // Subtle parallax wobble
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.03;
    ref.current.rotation.y = Math.sin(t * 0.2 + index) * 0.04;
  });

  return (
    <group ref={ref} position={[0, 0, 0]} {...props}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[scale[0] + 0.15, scale[1] + 0.15]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      <mesh position={[0, -0.05, -0.03]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial color="#000" transparent opacity={0.15} />
      </mesh>

      <Image
        ref={imageRef}
        url={url}
        scale={scale}
        transparent
        onPointerOver={() => {
          if (!isMobile) {
            setHover(true);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          if (!isMobile) {
            setHover(false);
            document.body.style.cursor = "auto";
          }
        }}
      />
    </group>
  );
};

// See All Work Button
const SeeAllButton = ({ progressMapped }) => {
  const buttonRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!buttonRef.current) return;

    const startX = 10;
    const centerX = 0;
    const visibleProgress = Math.max(0, (progressMapped - 0.85) / 0.15);

    buttonRef.current.position.x = THREE.MathUtils.lerp(
      startX,
      centerX,
      visibleProgress
    );
    buttonRef.current.visible = progressMapped > 0.85;

    const scale = (hovered ? 1.1 : 1) * Math.min(1, visibleProgress * 2);
    buttonRef.current.scale.x = scale;
    buttonRef.current.scale.y = scale;
  });

  return (
    <group ref={buttonRef} position={[0, 0, 0]}>
      <Html transform distanceFactor={5} position={[0, 0, 0]}>
        <button
          className="px-6 py-3 bg-dark-accent border-2 border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-xs font-bold cursor-pointer pointer-events-auto whitespace-nowrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => window.open("#portfolio", "_self")}
          style={{
            fontFamily: "Inter, sans-serif",
            backdropFilter: "blur(10px)",
          }}
        >
          See All Work
        </button>
      </Html>
    </group>
  );
};

const PortfolioGallery = () => {
  const group = useRef();
  const scroll = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const ribbonGroupRef = useRef();
  const { width } = useThree((s) => s.viewport);

  useFrame(() => {
    // Check if portfolio is locked via DOM element
    const lockElement = document.querySelector("[data-portfolio-progress]");
    if (lockElement) {
      const progress = parseFloat(
        lockElement.getAttribute("data-portfolio-progress")
      );
      setIsLocked(true);
      setScrollProgress(progress);
      return;
    }

    // Reset when unlocked
    if (isLocked) {
      setIsLocked(false);
    }

    // Normal scroll-based progress when not locked
    // Page 0: Hero, Page 1: Portfolio, Pages 2+: Rest
    // Compute total pages dynamically to support mobile/tablet different heights
    const pagesCount =
      scroll.el && window.innerHeight
        ? Math.max(1, scroll.el.scrollHeight / window.innerHeight)
        : 7;

    const isMobile = width < 5;
    const sectionDuration = isMobile ? 2 : 1;
    const sectionStart = 1 / pagesCount; // Start of portfolio section
    const sectionEnd = (1 + sectionDuration) / pagesCount; // End of portfolio section

    const currentScroll = scroll.offset;

    // Calculate progress
    const progress = Math.max(
      0,
      Math.min(1, (currentScroll - sectionStart) / (sectionEnd - sectionStart))
    );

    setScrollProgress(progress);
  });

  // Map progress through smooth easing
  const mapProgress = (p) =>
    p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const progressMapped = mapProgress(scrollProgress);

  useFrame(() => {
    if (!ribbonGroupRef.current) return;

    const isMobile = width < 5;
    const isTablet = width >= 5 && width < 8;

    // MATCHING CONSTANTS WITH RENDER LOGIC
    const imageWidth = isMobile ? 2.8 : isTablet ? 1.7 : 1.9;
    const spacing = imageWidth + (isMobile ? 0.3 : 0.5);
    const lastIndex = images.length - 1;

    // Starting slightly off-screen to the right, ending when last image centers
    const startX = isMobile ? 6 : 12;
    const endX = -lastIndex * spacing;
    ribbonGroupRef.current.position.x = THREE.MathUtils.lerp(
      startX,
      endX,
      progressMapped
    );
  });

  return (
    <group ref={group}>
      <group ref={ribbonGroupRef} position={[12, 0, 0]}>
        {/* Portfolio images laid out horizontally */}
        {images.map((img, i) => {
          const isMobile = width < 5;
          const isTablet = width >= 5 && width < 8;
          // Increase mobile image size significantly as requested
          const imageWidth = isMobile ? 2.8 : isTablet ? 1.7 : 1.9;
          const imageHeight = isMobile ? 3.8 : isTablet ? 2.3 : 2.6; // same height across all images; smaller on tablet
          const spacing = imageWidth + (isMobile ? 0.3 : 0.5);
          const x = i * spacing;
          const z = (i % 2 === 0 ? -0.1 : 0.1) + i * 0.01;
          return (
            <Frame
              key={i}
              url={img.url}
              index={i}
              imageScale={[imageWidth, imageHeight]}
              position={[x, 0, z]}
            />
          );
        })}

        {/* CTA appears after last image crosses center */}
        <SeeAllButton progressMapped={progressMapped} />
      </group>
    </group>
  );
};

export default PortfolioGallery;
