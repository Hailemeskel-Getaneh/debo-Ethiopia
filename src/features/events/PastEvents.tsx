import { Calendar, MapPin, Clock, CheckCircle2, Sparkles } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useEvents } from "@/hooks/useEvents";

// Backend schema: { program_id, title, description, location, start_date, end_date }
interface Event {
  program_id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
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

export function PastEvents() {
  const { events, loading, error } = useEvents();

  // Filter only past events
  const pastEvents: Event[] = events.filter(
    (event: Event) => new Date(event.start_date) <= new Date(),
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
              <CheckCircle2 className="w-4 h-4 text-[#00b359]" /> Past Events
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Our <span className="text-[#00b359]">Past Events</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore the impactful events we've hosted and the communities
              we've touched across Ethiopia.
            </p>
          </div>
        </section>

        {/* ── EVENTS LIST ── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {pastEvents.length === 0 ? (
              <div className="text-center py-24">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 font-medium">
                  No past events to show.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {pastEvents.map((event) => (
                  <div
                    key={event.program_id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden opacity-75 hover:opacity-100"
                  >
                    <div className="md:flex">
                      {/* Date Box */}
                      <div className="md:w-32 bg-gray-600 text-white p-4 flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold uppercase">
                          {formatDate(event.start_date).split(" ")[0]}
                        </span>
                        <span className="text-4xl font-black">
                          {formatDate(event.start_date)
                            .split(" ")[1]
                            .replace(",", "")}
                        </span>
                        <span className="text-sm">
                          {formatDate(event.start_date).split(" ")[2]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>
                          <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.start_date, event.end_date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
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
