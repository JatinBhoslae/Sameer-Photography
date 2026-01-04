import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, useScroll, Html } from "@react-three/drei";
import * as THREE from "three";

const images = [
  {
    url: "/portfolio/wedding-1.jpg",
    title: "Wedding",
    route: "#gallery/wedding",
  },
  {
    url: "/portfolio/wedding-2.jpg",
    title: "Engagement",
    route: "#gallery/engagement",
  },
  { url: "/portfolio/wedding-3.jpg", title: "Haldi", route: "#gallery/haldi" },
  {
    url: "/portfolio/wedding-4.jpg",
    title: "Festival",
    route: "#gallery/festival",
  },
  {
    url: "/portfolio/wedding-5.jpg",
    title: "Celebration",
    route: "#gallery/celebration",
  },
  {
    url: "/portfolio/wedding-6.jpg",
    title: "Portrait",
    route: "#gallery/portrait",
  },
];

const Frame = ({ url, index, imageScale, title, route, ...props }) => {
  const ref = useRef();
  const imageRef = useRef();
  // hover state removed for stable alignment
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 5;

  const scale = imageScale;

  useFrame(() => {
    if (!ref.current || !imageRef.current) return;
    ref.current.position.y = 0;
    ref.current.rotation.y = 0;
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
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          if (!isMobile) {
            document.body.style.cursor = "auto";
          }
        }}
      />

      <Html
        transform
        distanceFactor={6}
        position={[0, scale[1] / 2 + 0.05, 0.1]}
        className="pointer-events-auto"
      >
        <div className="flex items-center gap-3 bg-dark-accent/80 border border-gold px-4 py-2 rounded backdrop-blur-sm">
          <span className="text-gold text-xs uppercase tracking-widest">
            {title}
          </span>
          <a
            href={route}
            className="px-3 py-1 border border-gold text-gold hover:bg-gold hover:text-dark transition-all uppercase tracking-widest text-[10px] cursor-pointer"
          >
            Explore
          </a>
        </div>
      </Html>
    </group>
  );
};

// See All Work Button
const SeeAllButton = ({ progressMapped }) => {
  const buttonRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!buttonRef.current) return;

    // Always visible, centered button; only hover affects scale
    buttonRef.current.position.x = 0;
    buttonRef.current.visible = true;

    const baseScale = hovered ? 1.1 : 1;
    buttonRef.current.scale.x = baseScale;
    buttonRef.current.scale.y = baseScale;
  });

  return (
    <group ref={buttonRef} position={[0, 0, 0]}>
      <Html transform distanceFactor={5} position={[0, 0, 0]}>
        <button
          className="px-6 py-3 bg-dark-accent border-2 border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-xs font-bold cursor-pointer pointer-events-auto whitespace-nowrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => (window.location.hash = "#gallery/wedding")}
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

    // Disable horizontal scroll animation; keep ribbon centered/stable
    ribbonGroupRef.current.position.x = 0;
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
              title={img.title}
              route={img.route}
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
