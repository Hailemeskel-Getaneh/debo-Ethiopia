import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const HERO_IMAGES = [
  "/src/assets/images/teachers.jpg",
  "/src/assets/images/teacher.jpg",
  "/src/assets/images/primary_teacher.jpg",
];

export const AboutHero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGES[currentImage]}
            className="w-full h-full object-cover"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#16A34A] text-sm font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4" /> Rooted in Tradition
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Our Story: <span className="text-brand-main">The Debo Way</span>
          </h1>
          <a
            href="/donate"
            className="btn-action px-10 py-5 rounded-2xl text-lg font-bold w-fit"
          >
            Support Our Case
          </a>
        </motion.div>
      </div>
    </section>
  );
};
