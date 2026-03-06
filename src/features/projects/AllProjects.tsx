import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  PlayCircle,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const statuses = [
  { id: "all", label: "All Projects", icon: LayoutGrid },
  { id: "active", label: "Active", icon: PlayCircle },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
  { id: "planned", label: "Upcoming", icon: Clock },
];

const statusMeta: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    label: string;
  }
> = {
  active: {
    icon: PlayCircle,
    color: "text-[#009639]",
    bg: "bg-[#009639]/10",
    border: "border-[#009639]/20",
    label: "Active",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    label: "Completed",
  },
  planned: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    label: "Upcoming",
  },
};

interface Project {
  id: number;
  name: string;
  description: string;
  location: string;
  status: "active" | "completed" | "planned";
  budget: number;
  currency: string;
  progress_percent: number;
  start_date: string;
  end_date: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const formatBudget = (budget: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(budget);
};

export function AllProjects() {
  const { projects, active, completed, upcoming, loading, error } =
    useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("status") || "all";
  const [search, setSearch] = useState("");

  const handleFilterChange = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (id === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", id);
    }
    setSearchParams(newParams);
  };

  const filtered = projects.filter((p: Project) => {
    const matchStatus = activeFilter === "all" || p.status === activeFilter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#009639]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#009639] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Loading amazing projects...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 text-red-500 p-6 rounded-3xl mb-6 shadow-sm">
            <p className="text-lg font-semibold mb-2">
              Oops! Something went wrong
            </p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#009639] text-white rounded-2xl font-bold shadow-lg shadow-[#009639]/20 hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Safe budget calculation
  const totalBudget = projects.reduce(
    (acc: number, p: Project) => acc + (Number(p.budget) || 0),
    0,
  );

  const statCards = [
    {
      value: active.length,
      label: "Active Now",
      icon: PlayCircle,
      color: "text-[#009639]",
      bgColor: "bg-[#009639]/10",
    },
    {
      value: completed.length,
      label: "Completed",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      value: upcoming.length,
      label: "Upcoming",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      value: totalBudget,
      label: "Wealth Impact",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      isBudget: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavBar />
      <main id="main-content">
        {/* ── PREMIUM HERO ── */}
        <section
          className="relative min-h-[60vh] flex items-center overflow-hidden pt-20"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#16A34A_0%,transparent_50%)]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#16A34A] blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#16A34A] blur-[100px]"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium px-5 py-2 rounded-full mb-8 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-[#16A34A] animate-pulse" /> DEBO
              Ethiopia Initiatives
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
            >
              Building a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16A34A] via-emerald-300 to-[#16A34A]">
                Better Ethiopia
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              From education to infrastructure, we're dedicated to sustainable
              development and community empowerment across the nation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto relative group"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#009639] group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Find a project by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-400 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all text-lg font-medium border-0"
              />
            </motion.div>
          </div>
        </section>

        {/* ── FLOATING STATS ── */}
        <section className="relative -mt-12 z-10 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-md shadow-lg p-2 grid grid-cols-2 md:grid-cols-4 border border-gray-200"
            >
              {statCards.map((s, i) => (
                <div
                  key={i}
                  className="py-6 px-3 text-center group hover:bg-gray-50 transition-colors rounded-sm"
                >
                  <div
                    className={`w-10 h-10 ${s.color} ${s.bgColor} rounded-md flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {s.isBudget
                      ? formatBudget(s.value as number, "USD").replace(
                          ".00",
                          "",
                        )
                      : s.value}
                  </p>
                  <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FILTER + GRID ── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div className="flex flex-wrap items-center gap-3">
                {statuses.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleFilterChange(s.id)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      activeFilter === s.id
                        ? "bg-[#009639] text-white shadow-xl shadow-[#009639]/20"
                        : "bg-white text-gray-500 hover:bg-white hover:shadow-lg border border-gray-100"
                    }`}
                  >
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="text-sm font-bold text-gray-400 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
                PROJECTS FOUND:{" "}
                <span className="text-[#009639] ml-1">{filtered.length}</span>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-32"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500">
                    We couldn't find any projects matching your criteria.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filtered.map((project, idx) => {
                    const meta =
                      statusMeta[project.status] || statusMeta.planned;
                    const StatusIcon = meta.icon;

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.05 }}
                        key={project.id || idx}
                        className="group bg-white rounded-md border border-gray-200 p-2 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col relative overflow-hidden"
                      >
                        <div className="p-5 md:p-6 flex flex-col flex-1">
                          {/* Top Info */}
                          <div className="flex items-center justify-between mb-5">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-sm border ${meta.bg} ${meta.color} ${meta.border}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {meta.label}
                            </span>
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#16A34A] transition-colors">
                              <Sparkles className="w-4 h-4" />
                            </div>
                          </div>

                          <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#009639] transition-colors leading-tight">
                            {project.name}
                          </h3>
                          <p className="text-gray-500 font-medium leading-[1.6] mb-8 line-clamp-3">
                            {project.description}
                          </p>

                          {/* Progress section */}
                          {project.status !== "planned" && (
                            <div className="mb-8">
                              <div className="flex justify-between items-end mb-3">
                                <span className="text-xs font-black uppercase text-gray-400 tracking-widest">
                                  Impact Progress
                                </span>
                                <span className="text-lg font-black text-gray-900">
                                  {project.progress_percent}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: `${Math.min(project.progress_percent, 100)}%`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full rounded-full ${project.status === "completed" ? "bg-blue-500" : "bg-[#009639]"}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Details List */}
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-900">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <span className="truncate">
                                {project.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-900">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <span>{formatDate(project.start_date)}</span>
                            </div>
                          </div>

                          <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                Project Budget
                              </p>
                              <p className="text-lg font-black text-gray-900">
                                {formatBudget(project.budget, project.currency)}
                              </p>
                            </div>

                            <a
                              href="/donate"
                              className="w-14 h-14 bg-[#009639] text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg shadow-[#009639]/20 transition-all"
                            >
                              <ChevronRight className="w-6 h-6" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
