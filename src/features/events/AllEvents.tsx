import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  Filter,
  ArrowRight,
} from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../home/Footer";
import { useEvents } from "@/hooks/useEvents";

const filters = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

interface Event {
  program_id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  images?: { id: number; image: string }[];
}

const getEventType = (startDate: string): "upcoming" | "past" => {
  return new Date(startDate) > new Date() ? "upcoming" : "past";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-10 bg-white rounded-md border border-gray-200 shadow-sm">
          <p className="text-red-500 mb-6 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#16A34A] text-white rounded-md font-bold hover:bg-[#15803D] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar />
      <main id="main-content">
        {/* HERO */}
        <section
          className="relative min-h-[50vh] flex items-center overflow-hidden pt-28 pb-16"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#16A34A] text-sm font-bold mb-6 uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4" />
                Events & Gatherings
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                Our <span className="text-[#16A34A]">Collective</span> Moments
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-xl md:text-xl max-w-2xl mx-auto mb-10"
              >
                From grassroots community workshops to global fundraising galas
                — witness the power of "Debo" in action.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl mx-auto relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-white border border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-all"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FILTER & IMPACT */}
        <section className="py-6 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" /> Filter by
                </span>
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeFilter === f.id
                        ? "bg-[#16A34A] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-8 divide-x divide-gray-200">
                <div className="text-center pl-0">
                  <div className="text-2xl font-bold text-[#16A34A]">
                    {eventsWithType.filter((e) => e.type === "upcoming").length}
                  </div>
                  <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                    Upcoming
                  </div>
                </div>
                <div className="text-center pl-8">
                  <div className="text-2xl font-bold text-gray-500">
                    {eventsWithType.filter((e) => e.type === "past").length}
                  </div>
                  <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                    Past
                  </div>
                </div>
                <div className="text-center pl-8">
                  <div className="text-2xl font-bold text-gray-900">6+</div>
                  <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                    Cities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {activeFilter === "all"
                  ? "All Events"
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Events`}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  ({filtered.length})
                </span>
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-20 text-center bg-gray-100 rounded-md border border-dashed border-gray-300"
                  >
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-400">
                      No events found
                    </h3>
                    <p className="text-gray-500 mt-1 text-sm">
                      Try adjusting your filters or search term.
                    </p>
                  </motion.div>
                ) : (
                  filtered.map((event) => (
                    <motion.div
                      key={event.program_id}
                      layout
                      variants={itemVariants}
                      className="group bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative bg-gray-900">
                        {event.images?.[0]?.image ? (
                          <img
                            src={event.images[0].image}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "";
                              (e.target as HTMLImageElement).className =
                                "hidden";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                              event.type === "upcoming"
                                ? "bg-[#16A34A] text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md bg-white flex flex-col items-center justify-center shadow">
                            <span className="text-[9px] font-bold text-[#16A34A] uppercase">
                              {formatDate(event.start_date).split(" ")[0]}
                            </span>
                            <span className="text-lg font-bold text-gray-900 leading-none">
                              {formatDate(event.start_date)
                                .split(" ")[1]
                                .replace(",", "")}
                            </span>
                          </div>
                          <div className="text-white">
                            <div className="text-[10px] font-medium opacity-70 uppercase tracking-wider">
                              {formatDate(event.start_date).split(" ")[2]}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#16A34A] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {event.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#16A34A]" />
                            <span className="text-gray-600">
                              {formatTime(event.start_date, event.end_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#16A34A]" />
                            <span className="text-gray-600">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        {event.type === "upcoming" ? (
                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 w-full bg-[#16A34A] text-white font-medium py-2.5 rounded-md shadow-sm hover:bg-[#15803D] transition-colors"
                          >
                            Reserve Your Spot
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <div className="flex items-center justify-center w-full bg-gray-100 text-gray-500 font-medium py-2.5 rounded-md border border-gray-200">
                            Event Completed
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

        {/* FOOTER CTA */}
        <section className="py-12 relative overflow-hidden bg-[#16A34A]">
          <div className="container relative z-10 mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Can't Make It? Still Want to Help?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">
              Your donations fuel these very events and the programs they
              support. Every bit counts.
            </p>
            <Link to="/donate">
              <button className="bg-white text-[#16A34A] font-bold px-8 py-3 rounded-md hover:scale-105 active:scale-95 transition-transform shadow-md">
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
