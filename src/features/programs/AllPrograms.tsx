import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, Sparkles, Calendar } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { usePrograms } from "@/hooks/usePrograms";

// Backend schema: { id, name, description, created_at, updated_at }
interface Program {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function AllPrograms() {
  const { programs, loading, error } = usePrograms();
  const [search, setSearch] = useState("");

  // Use API data directly
  const displayPrograms: Program[] = programs || [];

  const filtered = displayPrograms.filter(
    (program: Program) =>
      search === "" ||
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.description.toLowerCase().includes(search.toLowerCase()),
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
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Our Programs
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Programs
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Explore our impactful programs transforming communities across
              Ethiopia through education, health, and social development.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>
        </section>

        {/* ── PROGRAMS GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} program
              {filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No programs match your search.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((program: Program, index: number) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Header with gradient */}
                    <div className="h-2 bg-gradient-to-r from-[#003d1a] to-[#009639]" />

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {program.name}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {program.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Created: {formatDate(program.created_at)}</span>
                      </div>

                      <a
                        href="/donate"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#009639] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#007a2e] transition-colors w-full"
                      >
                        Learn More <ChevronRight className="w-4 h-4" />
                      </a>
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
}
