import React, { useState, Suspense, useEffect, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import LoadingScreen from "./components/ui/LoadingScreen";
import FloatingControls from "./components/ui/FloatingControls";

const Scene = lazy(() => import("./components/3d/Experience"));
const Overlay = lazy(() => import("./components/ui/Overlay"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.jsx"));

function App() {
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [routeHash, setRouteHash] = useState(window.location.hash || "");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onHashChange = () => setRouteHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isGalleryRoute = routeHash.startsWith("#gallery/");
  const category = isGalleryRoute ? routeHash.replace("#gallery/", "") : "";

  return (
    <>
      {!isGalleryRoute && <LoadingScreen onStarted={() => setStarted(true)} />}

      {isGalleryRoute ? (
        <Suspense fallback={null}>
          <GalleryPage category={category} />
        </Suspense>
      ) : (
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
            dpr={[1, 2]}
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
      )}

      {!isGalleryRoute && <FloatingControls started={started} />}
    </>
  );
}

export default App;
