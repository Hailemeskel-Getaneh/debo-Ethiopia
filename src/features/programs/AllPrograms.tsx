import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Calendar,
  ArrowRight,
  Grid,
  LayoutList,
  X,
} from "lucide-react";
import { NavBar, Footer } from "@/components";
import { usePrograms } from "@/hooks/usePrograms";

interface Program {
  id: number;
  name: string;
  description: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function AllPrograms() {
  const { programs, loading } = usePrograms();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const displayPrograms: Program[] = programs || [];

  const filtered = displayPrograms.filter(
    (program: Program) =>
      search === "" ||
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      (program.description &&
        program.description.toLowerCase().includes(search.toLowerCase())) ||
      (program.category &&
        program.category.toLowerCase().includes(search.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand-main border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <NavBar />
      <main className="pt-20">
        {/* Header Section */}
        <section
          className="relative py-32 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#16A34A] text-sm font-bold uppercase tracking-widest mb-8">
                <Sparkles className="w-4 h-4" /> Transformative Impact
              </span>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Our <span className="text-[#16A34A]">Programs</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                Discover how we're building sustainable futures through
                community-led initiatives in education, health, and economic
                empowerment.
              </p>

              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-0 bg-[#16A34A]/10 blur-xl group-focus-within:bg-[#16A34A]/20 transition-all rounded-md" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#16A34A] transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-md bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Active Programs</h2>
              <span className="px-2.5 py-1 rounded-sm bg-gray-100 text-gray-600 text-sm font-medium">
                {filtered.length}
              </span>
            </div>

            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-sm transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#16A34A]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-sm transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#16A34A]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-md border border-dashed border-gray-300"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold mb-2">No matching programs</h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search criteria
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((program, index) => (
                  <motion.div
                    key={program.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative overflow-hidden bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer ${viewMode === "list" ? "flex flex-row items-center p-4" : "p-5"}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#16A34A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full" />

                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-md bg-[#16A34A]/10 flex items-center justify-center">
                          <Sparkles className="text-[#16A34A] w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(program.created_at)}
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-brand-main transition-colors">
                        {program.name}
                      </h3>

                      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 text-lg">
                        {program.description}
                      </p>
                    </div>

                    <div
                      className={
                        viewMode === "list" ? "ml-10 shrink-0" : "mt-auto"
                      }
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-2xl bg-zinc-950 dark:bg-brand-main text-white font-bold flex items-center justify-center gap-2 group/btn transition-colors hover:bg-brand-main"
                      >
                        Program Details
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}
