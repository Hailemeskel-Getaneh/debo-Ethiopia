import { motion } from "framer-motion";
import { Award } from "lucide-react";

const StoryCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 text-[#16A34A] font-bold uppercase tracking-widest text-sm mb-6">
        <Award className="w-5 h-5" /> Who We Are
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
        A Mission Born from{" "}
        <span className="text-[#16A34A] italic underline decoration-zinc-200">
          Collective Purpose
        </span>
      </h2>
      <div className="space-y-6 text-xl text-white leading-relaxed">
        <p className="text-white">
          Established in 2005, Debo Ethiopia is a non-profit organization
          dedicated to improving the quality of life for rural Ethiopian
          communities through holistic development.
        </p>
        <p className="text-white">
          We are guided by the ancient Ethiopian tradition of "Debo" — a culture
          of communal cooperation where neighbors gather to complete large tasks
          for the benefit of all.
        </p>
        <p className="text-white">
          Today, we apply this philosophy to education, healthcare, and
          sustainable agriculture, ensuring that development is locally led and
          universally beneficial.
        </p>
      </div>
    </motion.div>
  );
};

export default StoryCard;
