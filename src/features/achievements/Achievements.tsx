import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Search, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useAchievements } from "@/hooks/useAchievements";

// Backend schema: { title, description, image_url, achieved_at }
interface Achievement {
  title: string;
  description: string;
  image_url: string;
  achieved_at: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const Achievements: React.FC = () => {
  const { achievements, loading, error } = useAchievements();
  const [search, setSearch] = useState("");

  const filtered = (achievements || []).filter(
    (item: Achievement) =>
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-main animate-spin mb-4" />
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Loading Impact...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="glass-panel p-12 rounded-[3rem] text-center max-w-lg border-red-500/20">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Award className="w-10 h-10 text-red-500 opacity-50" />
          </div>
          <h2 className="text-2xl font-black text-white mb-4">Connection Interrupted</h2>
          <p className="text-zinc-400 mb-10 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-5 bg-brand-main text-white font-black rounded-2xl shadow-xl shadow-brand-main/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Reconnect to Debo
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 selection:bg-brand-main/30">
      <NavBar />

      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-40 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/50 to-zinc-50 dark:via-zinc-950/50 dark:to-zinc-950" />

          <div className="relative container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-main" /> Debo Ethopia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-zinc-950 dark:text-white mb-8 tracking-tighter"
            >
              Legacy of <span className="text-brand-main">Impact</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
            >
              Documenting the milestones, awards, and transformative achievements that define our journey in empowering communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto relative group"
            >
              <div className="absolute inset-0 bg-brand-main/20 blur-3xl group-focus-within:bg-brand-main/40 transition-all duration-500" />
              <div className="relative glass-panel p-2 pl-8 rounded-[2rem] border-zinc-200 dark:border-zinc-800 flex items-center shadow-premium group-focus-within:border-brand-main/50 transition-all">
                <Search className="w-6 h-6 text-zinc-400 group-focus-within:text-brand-main transition-colors shrink-0" />
                <input
                  type="text"
                  placeholder="Search milestones..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 font-bold focus:outline-none"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS GRID ── */}
        <section className="pb-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest">
                Latest Milestones <span className="text-brand-main ml-2 opacity-50">/</span> {filtered.length} Results
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-32 text-center glass-panel rounded-[3rem] border-dashed border-zinc-300 dark:border-zinc-800"
                  >
                    <Award className="w-20 h-20 mx-auto mb-6 text-zinc-300 dark:text-zinc-700 opacity-40" />
                    <p className="text-2xl font-black text-zinc-400 dark:text-zinc-600">No records found</p>
                    <p className="text-zinc-500 mt-2 font-medium">Try refining your search term to find specific achievements.</p>
                  </motion.div>
                ) : (
                  filtered.map((achievement: Achievement, index: number) => (
                    <motion.div
                      key={index}
                      layout
                      variants={itemVariants}
                      className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-premium transition-all duration-700"
                    >
                      {/* Image Layer */}
                      <div className="aspect-[16/11] overflow-hidden relative shrink-0">
                        <div className="absolute inset-0 bg-zinc-950">
                          {achievement.image_url ? (
                            <img
                              src={achievement.image_url}
                              alt={achievement.title}
                              className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
                            />
                          ) : (
                            <div className="w-full h-full mesh-gradient opacity-30 group-hover:opacity-20 transition-opacity" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
                        </div>

                        <div className="absolute bottom-6 left-6 z-20">
                          <div className="glass-panel px-4 py-2 rounded-xl border-white/20 flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-brand-main" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">
                              {formatDate(achievement.achieved_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-10 flex flex-col flex-1">
                        <div className="inline-flex items-center gap-2 mb-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-main" />
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Official Recognition</span>
                        </div>

                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 leading-tight group-hover:text-brand-main transition-colors">
                          {achievement.title}
                        </h3>

                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3 mb-10 text-sm">
                          {achievement.description}
                        </p>

                        <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Impact Date Indicator</span>
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">FY {new Date(achievement.achieved_at).getFullYear()} Milestone</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-brand-main group-hover:text-white transition-all duration-500">
                            <Award className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-24 bg-brand-main relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/mesh-pattern.svg')] bg-cover" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Support Our Growing Legacy</h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              Every milestone achieved is a testament to the generosity of our supporters. Join us in making the next achievement possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="bg-white text-zinc-950 font-black px-12 py-5 rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3">
                Donate Now <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Achievements;

