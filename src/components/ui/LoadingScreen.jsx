import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [progress]);

  const handleStart = () => {
    const tl = gsap.timeline({
      onComplete: () => onStarted()
    });

    // Shutter animation
    tl.to('.shutter-blade', {
      height: '0%',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.inOut'
    })
    .to('.loading-overlay', {
      opacity: 0,
      duration: 0.5,
      display: 'none'
    });
  };

  return (
    <div className="loading-overlay fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      {/* Shutter Blades Overlay */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="shutter-blade bg-dark-accent w-full h-1/2 border-b border-gold/20"></div>
        <div className="shutter-blade bg-dark-accent w-full h-1/2 border-t border-gold/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-gold font-serif text-3xl mb-4 tracking-widest uppercase">
            Sameer Photography
        </div>
        
        {!showButton ? (
            <div className="w-48 h-1 bg-gray-800 rounded overflow-hidden">
                <div 
                    className="h-full bg-gold transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        ) : (
            <button 
                onClick={handleStart}
                className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-sm"
            >
                Enter Gallery
            </button>
        )}
        
        <div className="mt-4 text-gray-500 text-xs tracking-widest">
            {progress.toFixed(0)}% LOADED
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
