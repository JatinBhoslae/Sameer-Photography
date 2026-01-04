import React from "react";

const CATEGORY_MAP = {
  wedding: { title: "Wedding" },
  engagement: { title: "Engagement" },
  haldi: { title: "Haldi" },
  festival: { title: "Festival" },
  celebration: { title: "Celebration" },
  portrait: { title: "Portrait" },
};

const DUMMY_IMAGES = [
  "/portfolio/wedding-1.jpg",
  "/portfolio/wedding-2.jpg",
  "/portfolio/wedding-3.jpg",
  "/portfolio/wedding-4.jpg",
  "/portfolio/wedding-5.jpg",
  "/portfolio/wedding-6.jpg",
];

const GalleryPage = ({ category }) => {
  const meta = CATEGORY_MAP[category] || CATEGORY_MAP.wedding;
  return (
    <div className="min-h-screen w-full bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            {meta.title} <span className="text-gold">Gallery</span>
          </h1>
          <a
            href="#"
            className="px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-dark transition-all uppercase tracking-widest text-xs cursor-pointer"
          >
            Back to Home
          </a>
        </div>
        <p className="text-gray-400 mb-8">
          Explore {meta.title.toLowerCase()} moments. Dummy photos for now.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="bg-dark-accent/70 border border-gray-800 rounded-lg overflow-hidden hover:border-gold transition-all duration-300"
            >
              <div className="h-56 md:h-64 w-full overflow-hidden">
                <img src={src} alt={`${meta.title} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;

