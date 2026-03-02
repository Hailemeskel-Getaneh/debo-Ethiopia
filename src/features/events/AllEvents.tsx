import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Sparkles, Calendar, Filter, ArrowRight } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useEvents } from "@/hooks/useEvents";

const filters = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

// Backend schema: { program_id, title, description, location, start_date, end_date }
interface Event {
  program_id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
}

// Helper to determine if event is upcoming or past
const getEventType = (startDate: string): "upcoming" | "past" => {
  return new Date(startDate) > new Date() ? "upcoming" : "past";
};

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Format time for display
const formatTime = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return `${start.toLocaleTimeString("en-US", timeOptions)} - ${end.toLocaleTimeString("en-US", timeOptions)}`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function AllEvents() {
  const { events, loading, error } = useEvents();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const eventsWithType: (Event & { type: "upcoming" | "past" })[] = events.map(
    (event: Event) => ({
      ...event,
      type: getEventType(event.start_date),
    }),
  );

  const filtered = eventsWithType.filter((e) => {
    const matchType = activeFilter === "all" || e.type === activeFilter;
    const matchSearch =
      search === "" ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-main border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,150,57,0.3)]"></div>
        <p className="text-zinc-500 font-medium animate-pulse">Gathering voices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center glass-panel p-10 rounded-[2.5rem] border-red-500/20">
          <p className="text-red-400 mb-6 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-action px-8 py-3 rounded-xl font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-brand-main/20 selection:text-brand-main">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-20 mesh-gradient">
          <div className="container relative z-10 mx-auto px-6 pt-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-main text-sm font-bold mb-8 uppercase tracking-widest border border-brand-main/20"
              >
                <Sparkles className="w-4 h-4" />
                Events & Gatherings
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8"
              >
                Our <span className="text-brand-main italic">Collective</span> Moments
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                From grassroots community workshops to global fundraising galas — witness the power of "Debo" in action.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl mx-auto relative group"
              >
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400 group-focus-within:text-brand-main transition-colors" />
                <input
                  type="text"
                  placeholder="Search events by name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/40 shadow-2xl focus:outline-none focus:ring-4 focus:ring-brand-main/20 focus:border-brand-main/40 transition-all text-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FILTER & IMPACT ── */}
        <section className="relative z-20 py-10 bg-white/50 dark:bg-zinc-900 shadow-premium border-y border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mr-4 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" /> Filter by
                </span>
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeFilter === f.id
                      ? "bg-brand-main text-white shadow-lg shadow-brand-main/20 scale-105"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-12 divide-x dark:divide-zinc-800">
                <div className="text-center pl-0">
                  <div className="text-3xl font-black text-brand-main leading-none mb-1">
                    {eventsWithType.filter(e => e.type === 'upcoming').length}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Upcoming</div>
                </div>
                <div className="text-center pl-12">
                  <div className="text-3xl font-black text-zinc-400 leading-none mb-1">
                    {eventsWithType.filter(e => e.type === 'past').length}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Past</div>
                </div>
                <div className="text-center pl-12">
                  <div className="text-3xl font-black text-zinc-900 dark:text-white leading-none mb-1">6+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {activeFilter === 'all' ? 'All Gatherings' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Events`}
                <span className="ml-4 text-sm font-medium text-zinc-400">({filtered.length})</span>
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-32 text-center bg-zinc-100 dark:bg-zinc-900/40 rounded-[3rem] border border-dashed border-zinc-300 dark:border-zinc-800"
                  >
                    <Calendar className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">No events found matching your criteria</h3>
                    <p className="text-zinc-500 mt-2">Try adjusting your filters or search term.</p>
                  </motion.div>
                ) : (
                  filtered.map((event) => (
                    <motion.div
                      key={event.program_id}
                      layout
                      variants={itemVariants}
                      className="group bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-premium transition-all duration-500 relative"
                    >
                      {/* Visual Header */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <div className="absolute inset-0 bg-zinc-950">
                          {event.images?.[0]?.image ? (
                            <img
                              src={event.images[0].image}
                              alt={event.title}
                              className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "";
                                (e.target as HTMLImageElement).className = "hidden";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full mesh-gradient opacity-40 group-hover:opacity-30 transition-opacity" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                        </div>

                        {/* Status Tag */}
                        <div className="absolute top-6 left-6 z-20">
                          <span className={`px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-black uppercase tracking-widest ${event.type === 'upcoming'
                            ? 'bg-brand-main/20 border-brand-main/30 text-brand-main'
                            : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-400'
                            }`}>
                            {event.type}
                          </span>
                        </div>

                        {/* Date Float */}
                        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex flex-col items-center justify-center shadow-xl border border-white/20">
                            <span className="text-[10px] font-bold text-brand-main uppercase tracking-tighter">
                              {formatDate(event.start_date).split(" ")[0]}
                            </span>
                            <span className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                              {formatDate(event.start_date).split(" ")[1].replace(",", "")}
                            </span>
                          </div>
                          <div className="text-white">
                            <div className="text-xs font-bold opacity-60 uppercase tracking-widest">
                              {formatDate(event.start_date).split(" ")[2]}
                            </div>
                            <div className="text-sm font-medium">Starts {formatTime(event.start_date, event.end_date).split(' - ')[0]}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-10">
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 leading-snug group-hover:text-brand-main transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-8 text-sm font-medium">
                          {event.description}
                        </p>

                        <div className="space-y-4 mb-10 text-xs font-bold text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-brand-main/60" />
                            </div>
                            <span>Full Duration: {formatTime(event.start_date, event.end_date)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-brand-main/60" />
                            </div>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.type === 'upcoming' ? (
                          <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-4 w-full bg-brand-main text-white font-black py-6 rounded-2xl shadow-xl shadow-brand-main/20 hover:brightness-110 active:scale-95 transition-all group/btn"
                          >
                            Reserve Your Spot
                            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-3 w-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 font-black py-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            Gathering Completed
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-main" />
          <div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Can't Make It? <br /> Still Want to Help?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Your donations fuel these very events and the programs they support. Every bit counts.
            </p>
            <Link to="/donate">
              <button className="bg-white text-zinc-950 font-black px-12 py-6 rounded-2xl text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Support via Donation
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

