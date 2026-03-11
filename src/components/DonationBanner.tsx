import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const DonationBanner = () => (
  <section className="py-32 relative bg-primary-950 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-primary-600 to-primary-950 opacity-90" />
    <div className="container relative z-10 mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Heart className="w-20 h-20 text-brand-action mx-auto mb-10 fill-current animate-pulse" />
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
          Your Generosity, <br /> Their Opportunity
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["$25", "$50", "$100", "$250"].map((amt) => (
            <button
              key={amt}
              className="px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all"
            >
              {amt}
            </button>
          ))}
        </div>
        <Link
          to="/donate"
          className="btn btn-lg bg-white text-primary-950 hover:bg-zinc-100 border-none rounded-2xl px-12 h-20 text-2xl font-black shadow-2xl"
        >
          Start Making Impact
        </Link>
      </motion.div>
    </div>
  </section>
);
