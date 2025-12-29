import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice] = useState(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0
  );

  useEffect(() => {
    if (isTouchDevice) return; // Don't run on touch devices

    // Use gsap.quickTo for better performance
    const cursorX = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const cursorY = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });
    const followerX = gsap.quickTo(followerRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const followerY = gsap.quickTo(followerRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });

    const moveCursor = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    window.addEventListener("mousemove", moveCursor);

    // Add event listeners for hoverable elements
    const hoverables = document.querySelectorAll("a, button, .hoverable");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Observer to attach listeners to new elements
    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll("a, button, .hoverable");
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300 ${
          hovered ? "scale-[0.5]" : "scale-100"
        }`}
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          hovered
            ? "scale-150 border-gold-light opacity-50"
            : "scale-100 opacity-30"
        }`}
      />
    </>
  );
};

export default CustomCursor;
