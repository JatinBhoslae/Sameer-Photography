import React, { useEffect, useMemo, useState } from "react";

// Static gallery data kept JSON-like for future CMS mapping
const GALLERY_DATA = {
  marriage: {
    key: "marriage",
    title: "Marriage",
    description:
      "Epic ceremonies and timeless vows captured with a cinematic, editorial lens.",
    cover: "/portfolio/wedding-1.jpg",
    coverAlt: "Bride and groom framed in warm golden-hour light.",
    images: [
      {
        id: "marriage-1",
        src: "/portfolio/wedding-1.jpg",
        alt: "Intimate portrait of a bride and groom sharing a quiet moment.",
      },
      {
        id: "marriage-2",
        src: "/portfolio/wedding-2.jpg",
        alt: "Wide shot of a marriage ceremony under a beautifully lit mandap.",
      },
      {
        id: "marriage-3",
        src: "/portfolio/wedding-3.jpg",
        alt: "Bride walking down the aisle surrounded by family.",
      },
    ],
  },
  candid: {
    key: "candid",
    title: "Candid",
    description:
      "Unposed, unscripted frames that reveal the real energy of your celebration.",
    cover: "/portfolio/wedding-2.jpg",
    coverAlt: "Friends laughing together during a candid moment at a wedding.",
    images: [
      {
        id: "candid-1",
        src: "/portfolio/wedding-2.jpg",
        alt: "Candid laughter between the couple surrounded by friends.",
      },
      {
        id: "candid-2",
        src: "/portfolio/wedding-4.jpg",
        alt: "Guests reacting joyfully during the ceremony.",
      },
      {
        id: "candid-3",
        src: "/portfolio/wedding-5.jpg",
        alt: "Children playing during the celebrations, captured mid-motion.",
      },
    ],
  },
  haldi: {
    key: "haldi",
    title: "Haldi",
    description:
      "Vibrant haldi rituals drenched in color, laughter and turmeric.",
    cover: "/portfolio/wedding-3.jpg",
    coverAlt: "Haldi ceremony with hands applying turmeric to the groom.",
    images: [
      {
        id: "haldi-1",
        src: "/portfolio/wedding-3.jpg",
        alt: "Close-up of haldi being applied on the groom's face.",
      },
      {
        id: "haldi-2",
        src: "/portfolio/wedding-6.jpg",
        alt: "Family laughing as they apply haldi together.",
      },
      {
        id: "haldi-3",
        src: "/portfolio/wedding-4.jpg",
        alt: "Wide-angle view of a haldi ceremony filled with yellow tones.",
      },
    ],
  },
  celebration: {
    key: "celebration",
    title: "Celebration",
    description:
      "Receptions, parties and everything in between — where the night truly begins.",
    cover: "/portfolio/wedding-4.jpg",
    coverAlt: "Dance floor packed with guests enjoying the celebration.",
    images: [
      {
        id: "celebration-1",
        src: "/portfolio/wedding-4.jpg",
        alt: "Couple sharing a first dance surrounded by lights.",
      },
      {
        id: "celebration-2",
        src: "/portfolio/wedding-5.jpg",
        alt: "Guests dancing energetically at a reception.",
      },
      {
        id: "celebration-3",
        src: "/portfolio/wedding-6.jpg",
        alt: "Fireworks lighting up the sky above the venue.",
      },
    ],
  },

  // Backwards-compatible keys used by the existing 3D gallery routes
  wedding: null,
  engagement: null,
  festival: null,
  portrait: null,
};

const CATEGORY_ORDER = ["marriage", "candid", "haldi", "celebration"];

const resolveCategoryKey = (rawCategory) => {
  if (!rawCategory) return "marriage";

  // Normalize and map old keys to the new structure
  switch (rawCategory) {
    case "wedding":
      return "marriage";
    case "engagement":
      return "candid";
    case "festival":
      return "celebration";
    case "portrait":
      return "candid";
    default:
      return CATEGORY_ORDER.includes(rawCategory) ? rawCategory : "marriage";
  }
};

const GalleryPage = ({ category }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const resolvedKey = useMemo(() => resolveCategoryKey(category), [category]);
  const meta = GALLERY_DATA[resolvedKey];

  const handleBackHome = () => {
    // Reset hash so App switches back to the main 3D experience
    window.location.hash = "";
  };

  const openLightbox = (index) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev + 1) % meta.images.length);
  };

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev - 1 + meta.images.length) % meta.images.length);
  };

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <div className="min-h-screen w-full bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif">
              {meta.title} <span className="text-gold">Gallery</span>
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl text-sm sm:text-base">
              {meta.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBackHome}
            className="self-start sm:self-auto px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-dark transition-all uppercase tracking-widest text-xs cursor-pointer"
          >
            Back to Home
          </button>
        </div>

        {/* Occasion-based category navigation */}
        <section aria-label="Browse galleries by occasion" className="mb-10">
          <h2 className="sr-only">Gallery occasions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORY_ORDER.map((slug) => {
              const cat = GALLERY_DATA[slug];
              const isActive = slug === resolvedKey;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => {
                    window.location.hash = `#gallery/${slug}`;
                  }}
                  className={`group relative overflow-hidden rounded-xl border transition-colors duration-500 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
                    isActive ? "border-gold" : "border-gray-800 hover:border-gold/70"
                  }`}
                >
                  <div className="h-28 sm:h-32 md:h-36 w-full overflow-hidden">
                    <img
                      src={cat.cover}
                      alt={cat.coverAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform-gpu scale-105 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold/80">
                      Occasion
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {cat.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main gallery grid */}
        <section
          aria-label={`${meta.title} photo gallery`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {meta.images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="group bg-dark-accent/70 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark cursor-pointer"
            >
              <div className="h-56 md:h-64 w-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform-gpu scale-105 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                />
              </div>
            </button>
          ))}
        </section>
      </div>

      {/* Lightbox modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label={meta.images[activeIndex].alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl cursor-pointer"
            aria-label="Close gallery"
          >
             d7
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl cursor-pointer"
            aria-label="Previous image"
          >
             ab
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl cursor-pointer"
            aria-label="Next image"
          >
             bb
          </button>

          <div
            className="max-w-4xl w-full max-h-[80vh] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={meta.images[activeIndex].src}
                alt={meta.images[activeIndex].alt}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-300 text-center">
              {meta.images[activeIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
