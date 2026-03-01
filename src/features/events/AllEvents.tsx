import { useState } from "react";
import { Search, MapPin, Clock, Sparkles, ChevronRight } from "lucide-react";
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

export function AllEvents() {
  const { events, loading, error } = useEvents();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Add type property to events for filtering
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
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Events &
              Gatherings
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Events
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              From fundraising galas to community workshops — join us at events
              that inspire, connect, and drive change across Ethiopia.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name or location..."
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
                  value: `${eventsWithType.filter((e) => e.type === "upcoming").length}`,
                  label: "Upcoming Events",
                },
                {
                  value: `${eventsWithType.filter((e) => e.type === "past").length}`,
                  label: "Past Events",
                },
                { value: "6+", label: "Cities Reached" },
                { value: "5,000+", label: "Total Attendees" },
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
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeFilter === f.id
                      ? "bg-[#009639] text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No events match your search.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((event) => (
                  <div
                    key={event.program_id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] to-[#009639] flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-white/20" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Date badge */}
                      <div className="absolute top-4 left-4 bg-white rounded-xl p-2 text-center shadow-md min-w-[48px]">
                        <p className="text-xs font-bold text-[#009639] uppercase leading-tight">
                          {formatDate(event.start_date).split(" ")[0]}
                        </p>
                        <p className="text-xl font-black text-gray-900 leading-tight">
                          {formatDate(event.start_date)
                            .split(" ")[1]
                            .replace(",", "")}
                        </p>
                      </div>
                      {event.type === "past" && (
                        <span className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Past Event
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[#009639] mb-3">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {event.type === "past" ? "Completed" : "Upcoming"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-1.5 mb-4 text-xs text-gray-400">
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {formatDate(event.start_date)} ·{" "}
                          {formatTime(event.start_date, event.end_date)}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" /> {event.location}
                        </span>
                      </div>

                      {event.type === "upcoming" ? (
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center gap-1.5 bg-[#009639] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#007a2e] transition-colors"
                        >
                          Register Now <ChevronRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center text-sm text-gray-400 font-medium py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                          Event Concluded
                        </span>
                      )}
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
