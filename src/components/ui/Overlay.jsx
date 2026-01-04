import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "@react-three/drei";
import emailjs from "@emailjs/browser";
import {
  Camera,
  Video,
  User,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Section = ({ children, className = "" }) => {
  return (
    <section
      className={`h-[100svh] min-h-[100svh] w-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-10 xl:px-16 2xl:px-24 py-8 ${className}`}
    >
      {children}
    </section>
  );
};

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Replace these with your actual EmailJS credentials
    // You need to sign up at https://www.emailjs.com/
    const SERVICE_ID = "service_wpcdxpr";
    const TEMPLATE_ID = "template_0qb90cj";
    const PUBLIC_KEY = "n2InwfHAybV7Y7kV2";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="w-full md:w-1/2 bg-dark-accent/80 p-6 md:p-10 backdrop-blur-md border border-gray-800 rounded-lg pointer-events-auto">
      <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gold text-sm uppercase tracking-widest mb-2">
            Name
          </label>
          <input
            type="text"
            name="from_name"
            required
            className="w-full bg-transparent border-b border-gray-700 text-white focus:border-gold outline-none py-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-gold text-sm uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            type="email"
            name="from_email"
            required
            className="w-full bg-transparent border-b border-gray-700 text-white focus:border-gold outline-none py-2 transition-colors"
          />
        </div>
        <div>
          <label className="block text-gold text-sm uppercase tracking-widest mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            className="w-full bg-transparent border-b border-gray-700 text-white focus:border-gold outline-none py-2 transition-colors h-32"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gold text-dark font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
            <CheckCircle size={16} />
            <span>Message sent successfully!</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
            <AlertCircle size={16} />
            <span>Failed to send. Please try again or email directly.</span>
          </div>
        )}
      </form>
    </div>
  );
};

const SELECTED_WORKS = [
  {
    id: "featured-1",
    title: "Royal Marriage",
    location: "Udaipur, Rajasthan",
    year: "2025",
    src: "/portfolio/wedding-1.jpg",
    alt: "Bride and groom in a royal palace courtyard at sunset.",
    galleryCategory: "marriage",
    galleryIndex: 0,
  },
  {
    id: "featured-2",
    title: "Candid Laughter",
    location: "Mumbai, India",
    year: "2024",
    src: "/portfolio/wedding-2.jpg",
    alt: "Couple laughing with friends during an outdoor celebration.",
    galleryCategory: "candid",
    galleryIndex: 0,
  },
  {
    id: "featured-3",
    title: "Haldi Rituals",
    location: "Jaipur, India",
    year: "2023",
    src: "/portfolio/wedding-3.jpg",
    alt: "Close-up of haldi being applied amidst bright yellow decor.",
    galleryCategory: "haldi",
    galleryIndex: 0,
  },
  {
    id: "featured-4",
    title: "Golden Hour Vows",
    location: "Goa, India",
    year: "2024",
    src: "/portfolio/wedding-4.jpg",
    alt: "Silhouetted couple exchanging vows during sunset by the sea.",
    galleryCategory: "marriage",
    galleryIndex: 1,
  },
  {
    id: "featured-5",
    title: "After-Party",
    location: "Pune, India",
    year: "2023",
    src: "/portfolio/wedding-5.jpg",
    alt: "Guests dancing under moody, cinematic lighting.",
    galleryCategory: "celebration",
    galleryIndex: 0,
  },
  {
    id: "featured-6",
    title: "Timeless Portrait",
    location: "Hyderabad, India",
    year: "2022",
    src: "/portfolio/wedding-6.jpg",
    alt: "Elegant bridal portrait with soft studio lighting.",
    galleryCategory: "candid",
    galleryIndex: 1,
  },
];

const SelectedWorkCard = ({ work, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const openInGallery = () => {
    if (work.galleryCategory) {
      window.location.hash = `#gallery/${work.galleryCategory}@${work.galleryIndex ?? 0}`;
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const alignmentClass = index % 2 === 0 ? "md:pr-10" : "md:pl-10";

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col gap-4 transform-gpu transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-[0.97]"
      } ${alignmentClass}`}
    >
      {/* Image without heavy outer frame, larger and cleaner */}
      <div className="relative w-full overflow-hidden rounded-3xl">
        <button
          type="button"
          onClick={openInGallery}
          className="w-full max-h-[26rem] sm:max-h-[30rem] md:max-h-[32rem] bg-black flex items-center justify-center focus:outline-none"
        >
          <img
            src={work.src}
            alt={work.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transform-gpu transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
          />
        </button>

        {/* Hover overlay with fullscreen button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-4 flex justify-end px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={openInGallery}
            className="px-4 py-2 bg-dark/80 border border-gold text-gold text-[11px] sm:text-xs uppercase tracking-[0.18em] hover:bg-gold hover:text-dark transition-all duration-300"
          >
            View Fullscreen
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-left">
        <span className="text-[10px] uppercase tracking-[0.24em] text-gold/70">
          Selected Work {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif">
          {work.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">
          {work.location}, {work.year}
        </p>
      </div>
    </article>
  );
};

const SelectedWorksStrip = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 md:mt-10 space-y-8 pointer-events-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {SELECTED_WORKS.map((work, index) => (
          <SelectedWorkCard key={work.id} work={work} index={index} />
        ))}
      </div>
    </div>
  );
};

const Overlay = () => {
  const scroll = useScroll();

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-50 text-white">
      {/* Hero Section */}
      <Section className="items-center lg:items-start lg:pl-10 px-4 sm:px-6 md:px-8 safe-top hero-pad tablet-hero-pad">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-[90rem] gap-6 sm:gap-8 lg:gap-4">
          {/* Text Content - Order 1 on all screens */}
          <div className="flex-1 text-center lg:text-left order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-white mb-3 md:mb-4 tracking-tighter px-4 sm:px-0">
              Sameer <br />
              <span className="text-gold italic">Photography</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl text-gray-300 font-light max-w-4xl mb-6 md:mb-8 mx-auto lg:mx-0 px-4 sm:px-0">
              Turning moments into stories.
            </p>
            <button
              onClick={() =>
                scroll.el.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
              className="px-6 sm:px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm pointer-events-auto cursor-pointer z-50"
            >
              View Portfolio
            </button>
          </div>

          {/* 3D Camera Window - Order 2 (middle in row, middle in column) */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[28rem] 2xl:h-[28rem] relative flex-shrink-0 order-2 pointer-events-none">
            {/* This is a transparent window for the 3D camera to show through */}
            <div className="w-full h-full"></div>
          </div>

          {/* Sameer Photo - Order 3 on all screens (right in row, bottom in column) */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-80 xl:w-80 xl:h-96 2xl:w-[26rem] 2xl:h-[32rem] relative flex-shrink-0 order-3">
            <div className="absolute inset-0 border border-gold/30 rounded-full translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 lg:translate-x-4 lg:translate-y-4"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border border-gray-800 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
              <img
                src="/sameer.jpg"
                alt="Sameer - Owner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Portfolio / Selected Works Section */}
      <Section className="items-start justify-start pt-8 md:pt-12 px-6 md:px-12 relative !h-auto min-h-screen">
        <div className="mb-6 md:mb-10 relative z-30 bg-dark/80 backdrop-blur-sm px-4 py-2 rounded-lg md:bg-transparent md:backdrop-blur-0 md:px-0 md:py-0 md:rounded-none">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 md:mb-6 text-left">
                Selected <span className="text-gold">Works</span>
              </h2>
              <p className="text-gray-400 text-left max-w-xl text-sm sm:text-base md:text-lg">
                Six flagship stories from across weddings, haldi, candid moments and
                late-night celebrations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                // Navigate to primary gallery (marriage); other occasions available there
                window.location.hash = "#gallery/marriage";
              }}
              className="self-start md:self-auto px-6 sm:px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm pointer-events-auto"
            >
              See All Work
            </button>
          </div>
        </div>

        <SelectedWorksStrip />
      </Section>

      {/* About Section - now flows clearly below Selected Works */}
      <Section className="items-center md:items-start md:pl-20 !h-auto min-h-screen pt-16 md:pt-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 text-center md:text-left">
          The <span className="text-gold">Artist</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light max-w-2xl leading-relaxed text-center md:text-left">
          "I capture emotions, not just photos.{" "}
          <br className="hidden sm:block" />
          5+ years of telling human stories through light and shadow."
        </p>
      </Section>

      {/* Pricing Packages Section */}
      <Section className="items-center !h-auto min-h-screen py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-8 md:mb-12 text-center">
          Wedding <span className="text-gold">Packages</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl pointer-events-auto">
          {/* Silver Package */}
          <div className="bg-dark-accent/80 border border-gray-800 p-6 md:p-8 rounded-lg hover:border-gold transition-all duration-300 flex flex-col group backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2 text-center uppercase tracking-widest">
              Silver
            </h3>
            <p className="text-gold text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              ₹44,999/-
            </p>
            <ul className="text-gray-300 space-y-2 md:space-y-3 text-xs sm:text-sm flex-1 mb-6 md:mb-8">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Traditional
                Photography
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Traditional Video
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Candid Photography
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Wedding Smartphone
                Reel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Indigo album
                (Glossy/Matte) <br /> 12x36 (35 pages) 280 photos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Album bag, Minibook
                album, Calendar
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Pendrive with case
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> 8x12 Frame
              </li>
            </ul>
            <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-colors uppercase tracking-widest text-xs cursor-pointer">
              Choose Silver
            </button>
          </div>

          {/* Gold Package */}
          <div className="bg-dark-accent/90 border border-gold p-6 md:p-8 rounded-lg transform lg:-translate-y-4 shadow-2xl shadow-gold/10 flex flex-col relative group backdrop-blur-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-dark px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 text-center uppercase tracking-widest pt-2">
              Gold
            </h3>
            <p className="text-gold text-center text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              ₹67,999/-
            </p>
            <ul className="text-gray-300 space-y-2 md:space-y-3 text-xs sm:text-sm flex-1 mb-6 md:mb-8">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Traditional
                Photography
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Traditional Video
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Candid Photography
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Cinematic Video
                (Wedding Day)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Wedding Smartphone
                Reel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Indigo album
                (Glossy/Matte) <br /> 12x36 (40 pages) 320 photos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Album bag, Minibook
                album, Calendar
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Pendrive with case
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> 10x12 Frame
              </li>
            </ul>
            <button className="w-full py-3 md:py-4 bg-gold text-dark hover:bg-white transition-colors uppercase tracking-widest text-xs md:text-sm font-bold cursor-pointer">
              Choose Gold
            </button>
          </div>

          {/* Platinum Package */}
          <div className="bg-dark-accent/80 border border-gray-800 p-6 md:p-8 rounded-lg hover:border-gold transition-all duration-300 flex flex-col group backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2 text-center uppercase tracking-widest">
              Platinum
            </h3>
            <p className="text-gold text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              ₹95,999/-
            </p>
            <ul className="text-gray-300 space-y-2 md:space-y-3 text-xs sm:text-sm flex-1 mb-6 md:mb-8">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Traditional
                Photography & Video
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Candid Photography
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Cinematic Video
                (Wedding Day)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Cinematic 2nd Angle
                (Wedding Day)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Drone (Wedding Day)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Wedding Smartphone
                Reel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Indigo album
                (Glossy/Matte) <br /> 12x36 (45 pages) 360 photos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> Album bag, Minibook,
                Calendar, Pendrive
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✦</span> 16x20 Frame
              </li>
            </ul>
            <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-colors uppercase tracking-widest text-xs cursor-pointer">
              Choose Platinum
            </button>
          </div>
        </div>
      </Section>

      {/* Testimonials (Optional extra section) */}
      <Section className="!h-auto min-h-screen py-16 md:py-20 px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gold italic mb-6 md:mb-8 leading-relaxed px-4">
            "Photography is the story I fail to put into words."
          </p>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6 font-light max-w-2xl mx-auto px-4">
            When I cannot describe my feelings, experiences, or stories using
            language, I express them through photography.
          </p>
          <p className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm md:text-base">
            - Destin Sparks
          </p>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="flex-col md:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-8 md:gap-12 !h-auto min-h-screen py-16 md:py-20 px-6 md:px-8">
        <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-4 md:mb-6">
            Let's Create <br />
            <span className="text-gold">Magic</span>
          </h2>
        </div>
        <ContactForm />
      </Section>

      {/* Footer */}
      <footer className="w-full min-h-[100svh] py-16 md:py-20 text-center text-gray-600 text-xs sm:text-sm pointer-events-auto flex flex-col items-center justify-center gap-6 md:gap-8 px-6 md:px-8">
        <div className="flex flex-col items-center gap-3 mb-4">
          <p className="text-gold text-lg sm:text-xl md:text-2xl tracking-widest font-serif">
            Contact Us
          </p>
          <p className="text-gray-300 hover:text-gold transition-colors text-xl sm:text-2xl md:text-3xl font-light">
            <a href="tel:+919096534384" className="cursor-pointer">
              +91 90965 34384
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-8 justify-center items-center max-w-md">
          <a
            href="https://instagram.com/sameer_photography96k"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Instagram size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm md:text-base">
              @sameer_photography96k
            </span>
          </a>

          <a
            href="mailto:contact@sameerphotography.com"
            className="hover:text-gold transition-colors cursor-pointer"
          >
            <Mail size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>
        <p className="text-sm sm:text-base mt-4">
          &copy; {new Date().getFullYear()} Sameer Photography. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Overlay;


