import { MapPin, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useProjects } from "@/hooks/useProjects";

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

export function CompletedProjects() {
  const { projects, loading, error } = useProjects();

  // Filter only completed projects
  const completedProjects: Project[] = projects.filter(
    (p: Project) => p.status === "completed",
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
        <section className="relative pt-32 pb-20 bg-[#003d1a] overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#009639]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-[#00b359]" /> Completed
              Projects
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Our <span className="text-[#00b359]">Completed Projects</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore the successful projects we've completed and the
              communities we've transformed across Ethiopia.
            </p>
          </div>
        </section>

        {/* ── PROJECTS LIST ── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {completedProjects.length === 0 ? (
              <div className="text-center py-24">
                <CheckCircle2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 font-medium">
                  No completed projects to show.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {completedProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden opacity-75 hover:opacity-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completed
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
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
                        className="inline-flex items-center gap-2 text-[#009639] font-semibold hover:gap-3 transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
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
