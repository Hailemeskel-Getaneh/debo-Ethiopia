import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

export const Hero = ({ slides }: { slides: HeroSlide[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/70" />
        </div>
      ))}

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-brand-main animate-pulse" />
            Empowering Ethiopia Since 2005
          </motion.span>

          <h1 className="text-white text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-8 text-balance">
            {slides[activeSlide].title.split("Communities").map((t, i) =>
              i === 0 ? (
                t
              ) : (
                <span key={i} className="text-brand-main">
                  Communities
                </span>
              ),
            )}
          </h1>

          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed">
            {slides[activeSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/donate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-action px-10 py-5 rounded-2xl text-lg font-bold flex items-center gap-3"
              >
                <Heart className="w-5 h-4 fill-current" />
                Donate Now
              </motion.button>
            </Link>
            <Link to="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-panel px-10 py-5 rounded-2xl text-lg font-bold text-white border-white/20 hover:bg-white/10 flex items-center gap-2"
              >
                Explore Impact
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
