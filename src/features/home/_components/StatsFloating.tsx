import { motion } from "framer-motion";

export const StatsFloating = ({ stats }: { stats: any[] }) => (
  <section className="relative -mt-12 z-10 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-2 grid grid-cols-2 md:grid-cols-4 border border-zinc-200"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="py-8 text-center border-r last:border-r-0 border-zinc-100"
          >
            <div className="text-3xl font-black text-zinc-900">
              {stat.value}
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
              {stat.label || stat.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
