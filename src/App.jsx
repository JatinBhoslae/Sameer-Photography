import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Scene from "./components/3d/Experience";
import Overlay from "./components/ui/Overlay";
import LoadingScreen from "./components/ui/LoadingScreen";
import CustomCursor from "./components/ui/CustomCursor";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <CustomCursor />

      {/* Loading Screen handles the start interaction */}
      <LoadingScreen started={started} onStarted={() => setStarted(true)} />

      <div
        id="canvas-wrapper"
        className={started ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 1s ease-in-out" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]} // Optimization for high DPI screens
        >
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.3}>
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

      {/* Ambient Sound (Optional - requires user interaction first, which LoadingScreen button provides) */}
      {started && (
        <audio loop autoPlay>
          <source
            src="https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3"
            type="audio/mp3"
          />
        </audio>
      )}
    </>
  );
}

export default App;
