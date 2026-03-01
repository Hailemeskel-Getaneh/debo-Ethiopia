import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useProjects } from "@/hooks/useProjects";

const statuses = [
  { id: "all", label: "All Projects" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "planned", label: "Upcoming" },
];

const statusMeta: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  active: {
    icon: PlayCircle,
    color: "text-[#009639]",
    bg: "bg-[#009639]/10",
    label: "Active",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-[#009639]",
    bg: "639]/10",
    label: "Completedbg-[#009",
  },
  planned: {
    icon: Clock,
    color: "text-[#009639]",
    bg: "bg-[#009639]/10",
    label: "Upcoming",
  },
};

// Backend schema: { name, description, location, status, budget, currency, progress_percent, start_date, end_date }
interface Project {
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

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Format budget
const formatBudget = (budget: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(budget);
};

export function AllProjects() {
  const { projects, loading, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

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
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Our Projects
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Making a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Difference
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Explore our ongoing and completed projects transforming
              communities across Ethiopia through education, health, and
              development.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                {
                  value: `${projects.filter((p: Project) => p.status === "active").length}`,
                  label: "Active Projects",
                },
                {
                  value: `${projects.filter((p: Project) => p.status === "completed").length}`,
                  label: "Completed",
                },
                {
                  value: `${projects.filter((p: Project) => p.status === "planned").length}`,
                  label: "Upcoming",
                },
                {
                  value: formatBudget(
                    projects.reduce(
                      (acc: number, p: Project) => acc + p.budget,
                      0,
                    ),
                    "USD",
                  ),
                  label: "Total Budget",
                },
              ].map((s, i) => (
                <div key={i} className="py-8 text-center">
                  <p className="text-3xl font-black text-[#009639]">
                    {s.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILTER + GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 mb-10">
              {statuses.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveFilter(s.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeFilter === s.id
                      ? "bg-[#009639] text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} project
              {filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No projects match your search.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((project, idx) => {
                  const meta = statusMeta[project.status] || statusMeta.planned;
                  const StatusIcon = meta.icon;

                  return (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      {/* Header with gradient */}
                      <div className="h-3 bg-gradient-to-r from-[#003d1a] to-[#009639]" />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Status badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${meta.bg} ${meta.color}`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {meta.label}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                          {project.description}
                        </p>

                        {/* Progress bar */}
                        {project.status !== "planned" && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{project.progress_percent}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-[#009639] h-2 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(project.progress_percent, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5 mb-4 text-xs text-gray-400">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />{" "}
                            {project.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />{" "}
                            {formatDate(project.start_date)} -{" "}
                            {formatDate(project.end_date)}
                          </span>
                          <span className="flex items-center gap-2">
                            Budget:{" "}
                            {formatBudget(project.budget, project.currency)}
                          </span>
                        </div>

                        <a
                          href="/donate"
                          className="inline-flex items-center justify-center gap-1.5 bg-[#009639] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#007a2e] transition-colors mt-auto"
                        >
                          Support This Project{" "}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
