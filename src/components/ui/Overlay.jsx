import React, { useRef, useState } from "react";
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
      className={`h-screen w-screen flex flex-col justify-center items-center p-10 ${className}`}
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
    <div className="w-1/2 bg-dark-accent/80 p-10 backdrop-blur-md border border-gray-800 rounded-lg pointer-events-auto">
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
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

const Overlay = () => {
  const scroll = useScroll();

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-50 text-white">
      {/* Hero Section */}
      <Section className="items-start pl-20">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-4 tracking-tighter">
              Sameer <br />
              <span className="text-gold italic">Photography</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg mb-8">
              Turning moments into stories.
            </p>
            <button
              onClick={() =>
                scroll.el.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 uppercase tracking-widest text-sm pointer-events-auto cursor-pointer z-50"
            >
              View Portfolio
            </button>
          </div>

          <div className="hidden md:block w-80 h-[500px] relative mt-10 md:mt-0 mr-20">
            <div className="absolute inset-0 border border-gold/30 rounded-full translate-x-4 translate-y-4"></div>
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

      {/* Portfolio Section */}
      <Section className="items-end pr-20">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 text-right">
          Selected <span className="text-gold">Works</span>
        </h2>
        <p className="text-gray-400 text-right max-w-md">
          A collection of moments captured in time. <br />
          From intimate weddings to vibrant street scenes.
        </p>
      </Section>

      {/* About Section */}
      <Section className="items-start pl-20">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
          The <span className="text-gold">Artist</span>
        </h2>
        <p className="text-2xl md:text-3xl text-gray-200 font-light max-w-2xl leading-relaxed">
          "I capture emotions, not just photos. <br />
          5+ years of telling human stories through light and shadow."
        </p>
      </Section>

      {/* Pricing Packages Section */}
      <Section className="items-center pt-20 h-auto min-h-screen py-20">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-12 text-center">
          Wedding <span className="text-gold">Packages</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-4 pointer-events-auto">
          {/* Silver Package */}
          <div className="bg-dark-accent/80 border border-gray-800 p-8 rounded-lg hover:border-gold transition-all duration-300 flex flex-col group backdrop-blur-sm">
            <h3 className="text-2xl font-serif text-white mb-2 text-center uppercase tracking-widest">
              Silver
            </h3>
            <p className="text-gold text-center text-3xl font-bold mb-6">
              ₹44,999/-
            </p>
            <ul className="text-gray-300 space-y-3 text-sm flex-1 mb-8">
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
            <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-colors uppercase tracking-widest text-xs">
              Choose Silver
            </button>
          </div>

          {/* Gold Package */}
          <div className="bg-dark-accent/90 border border-gold p-8 rounded-lg transform md:-translate-y-4 shadow-2xl shadow-gold/10 flex flex-col relative group backdrop-blur-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-dark px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </div>
            <h3 className="text-3xl font-serif text-white mb-2 text-center uppercase tracking-widest">
              Gold
            </h3>
            <p className="text-gold text-center text-4xl font-bold mb-6">
              ₹67,999/-
            </p>
            <ul className="text-gray-300 space-y-3 text-sm flex-1 mb-8">
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
            <button className="w-full py-4 bg-gold text-dark hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold">
              Choose Gold
            </button>
          </div>

          {/* Platinum Package */}
          <div className="bg-dark-accent/80 border border-gray-800 p-8 rounded-lg hover:border-gold transition-all duration-300 flex flex-col group backdrop-blur-sm">
            <h3 className="text-2xl font-serif text-white mb-2 text-center uppercase tracking-widest">
              Platinum
            </h3>
            <p className="text-gold text-center text-3xl font-bold mb-6">
              ₹95,999/-
            </p>
            <ul className="text-gray-300 space-y-3 text-sm flex-1 mb-8">
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
            <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-dark transition-colors uppercase tracking-widest text-xs">
              Choose Platinum
            </button>
          </div>
        </div>
      </Section>

      {/* Testimonials (Optional extra section) */}
      <Section>
        <div className="text-center max-w-4xl px-4">
          <p className="text-3xl md:text-5xl font-serif text-gold italic mb-8 leading-relaxed">
            "Photography is the story I fail to put into words."
          </p>
          <p className="text-gray-300 text-lg mb-6 font-light max-w-2xl mx-auto">
            When I cannot describe my feelings, experiences, or stories using
            language, I express them through photography.
          </p>
          <p className="text-gray-400 uppercase tracking-widest text-sm">
            - Destin Sparks
          </p>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="flex-row justify-between items-center max-w-6xl mx-auto w-full">
        <div className="w-1/2">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Let's Create <br />
            <span className="text-gold">Magic</span>
          </h2>
        </div>
        <ContactForm />
      </Section>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-gray-600 text-sm pointer-events-auto flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 mb-4">
          <p className="text-gold text-lg tracking-widest font-serif">
            Contact Us
          </p>
          <p className="text-gray-300 hover:text-gold transition-colors text-xl font-light">
            <a href="tel:+919096534384">+91 90965 34384</a>
          </p>
        </div>
        <div className="flex gap-6 justify-center">
          <a
            href="https://instagram.com/sameer_photography96k"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors flex items-center gap-2"
          >
            <Instagram size={20} />
            <span className="hidden md:inline">@sameer_photography96k</span>
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:contact@sameerphotography.com"
            className="hover:text-gold transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Sameer Photography. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Overlay;
