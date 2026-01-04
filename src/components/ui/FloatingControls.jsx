import React, { useState, useEffect, useRef } from 'react';

const FloatingControls = ({ started }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.volume = 0.4; // Moderate volume for background
      // Try to play automatically
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
          // If auto-play is prevented, we might want to show muted state
          setIsMuted(true);
        });
      }
    }
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [started]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const scrollToTop = () => {
    // Try window scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Also try to scroll R3F container if it exists
    const r3fScrollContainer = document.querySelector('#canvas-wrapper div[style*="overflow"]');
    if (r3fScrollContainer) {
      r3fScrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (!started) return null;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-4 items-center">
      
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                   border border-gold/30 text-gold bg-dark/20 backdrop-blur-sm
                   hover:bg-gold hover:text-dark hover:border-gold 
                   transition-all duration-300 shadow-lg shadow-black/20
                   ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to Top"
        title="Scroll to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                   border border-gold/30 text-gold bg-dark/20 backdrop-blur-sm
                   hover:bg-gold hover:text-dark hover:border-gold 
                   transition-all duration-300 shadow-lg shadow-black/20"
        aria-label={isMuted ? "Unmute Background Music" : "Mute Background Music"}
        title={isMuted ? "Turn Sound On" : "Turn Sound Off"}
      >
        {isMuted ? (
           // Muted Icon
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
           </svg>
        ) : (
           // Playing Icon
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
           </svg>
        )}
      </button>
      
      {/* 
        Background Music: Kai Engel - Sentinel
        License: CC BY (Attribution) - Suitable for personal portfolio
        Source: Free Music Archive
      */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source 
          src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3" 
          type="audio/mp3" 
        />
      </audio>
    </div>
  );
};

export default FloatingControls;
