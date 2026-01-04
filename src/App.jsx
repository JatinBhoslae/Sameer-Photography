import React, { useState, Suspense, useEffect, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import LoadingScreen from "./components/ui/LoadingScreen";
import FloatingControls from "./components/ui/FloatingControls";

// Lazy load heavy 3D components
const Scene = lazy(() => import("./components/3d/Experience"));
const Overlay = lazy(() => import("./components/ui/Overlay"));

function App() {
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Loading Screen handles the start interaction */}
      <LoadingScreen started={started} onStarted={() => setStarted(true)} />

      <div
        id="canvas-wrapper"
        className={started ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 1s ease-in-out" }}
      >
        <Canvas
          shadows
          camera={{
            position: isMobile ? [0, 0, 8] : [0, 0, 5],
            fov: isMobile ? 60 : 50,
          }}
          dpr={[1, 2]} // Optimization for high DPI screens
        >
          <Suspense fallback={null}>
            <ScrollControls
              pages={isMobile ? 10 : isTablet ? 8 : 7}
              damping={0.3}
            >
              <Scene />
              <Scroll
                html
                style={{ width: "100%", height: "100%", zIndex: 10 }}
              >
                <Overlay />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Controls (Sound + Scroll Top) */}
      <FloatingControls started={started} />
    </>
  );
}

export default App;
