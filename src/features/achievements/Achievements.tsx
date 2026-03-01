import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
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

// Format date for display
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

  // Get all achievements from API
  const allAchievements: Achievement[] = achievements;

  const filtered = allAchievements.filter(
    (item: Achievement) =>
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#009639] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#009639] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-[#00b359]/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#00b359]" /> Achievements
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Achievements
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Explore our achievements and milestones that showcase the impact
              we've made across communities in Ethiopia.
            </p>
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search achievements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} upcoming achievement
              {filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Award className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No upcoming achievements to show.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((achievement: Achievement, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    {achievement.image_url ? (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={achievement.image_url}
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="inline-flex items-center gap-2 bg-white/90 text-[#009639] text-xs font-bold px-3 py-1.5 rounded-full">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(achievement.achieved_at)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-[#003d1a] to-[#009639] flex items-center justify-center">
                        <Award className="w-16 h-16 text-white/30" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[#009639] mb-3">
                        <Award className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Achievement
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {achievement.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Target Date</span>
                          <span className="font-semibold text-[#009639]">
                            {formatDate(achievement.achieved_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Achievements;
