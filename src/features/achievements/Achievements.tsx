import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Award,
  Calendar,
  Search,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { NavBar, Footer } from "@/components";
import { useAchievements } from "@/hooks/useAchievements";

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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#16A34A] animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-md text-center max-w-lg border border-gray-200 shadow-sm">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 bg-[#16A34A] text-white font-medium rounded-md shadow-sm hover:bg-[#15803D] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main id="main-content">
        {/* HERO */}
        <section
          className="relative pt-28 pb-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-[#16A34A] text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" /> Debo Ethiopia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Legacy of <span className="text-[#16A34A]">Impact</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Documenting the milestones, awards, and transformative
              achievements that define our journey in empowering communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search milestones..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACHIEVEMENTS GRID */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Latest Milestones <span className="text-[#16A34A] ml-2">/</span>{" "}
                {filtered.length} Results
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-16 text-center bg-gray-100 rounded-md border border-dashed border-gray-300"
                  >
                    <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-400">
                      No records found
                    </p>
                    <p className="text-gray-500 mt-1 text-sm">
                      Try refining your search term.
                    </p>
                  </motion.div>
                ) : (
                  filtered.map((achievement, index) => (
                    <motion.div
                      key={index}
                      layout
                      variants={itemVariants}
                      className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="aspect-[16/11] overflow-hidden relative bg-gray-900">
                        {achievement.image_url ? (
                          <img
                            src={achievement.image_url}
                            alt={achievement.title}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 z-10">
                          <div className="px-3 py-1.5 rounded-sm bg-white/90 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
                            <span className="text-[10px] font-medium text-gray-900 uppercase">
                              {formatDate(achievement.achieved_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="inline-flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                            Official Recognition
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#16A34A] transition-colors">
                          {achievement.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {achievement.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                              Impact Date
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              FY{" "}
                              {new Date(achievement.achieved_at).getFullYear()}{" "}
                              Milestone
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all">
                            <Award className="w-5 h-5" />
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

        {/* FOOTER CTA */}
        <section className="py-16 bg-[#16A34A]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Support Our Growing Legacy
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Every milestone achieved is a testament to the generosity of our
              supporters. Join us in making the next achievement possible.
            </p>
            <button className="bg-white text-[#16A34A] font-medium px-8 py-3 rounded-md hover:scale-105 active:scale-95 transition-transform shadow-md flex items-center gap-2 mx-auto">
              Donate Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Achievements;
