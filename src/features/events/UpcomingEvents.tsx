import { Calendar, MapPin, Clock, ChevronRight, Sparkles } from "lucide-react";
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

export function UpcomingEvents() {
  const { events, loading, error } = useEvents();

  // Filter only upcoming events
  const upcomingEvents: Event[] = events.filter(
    (event: Event) => new Date(event.start_date) > new Date(),
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
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Upcoming Events
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Join Our <span className="text-[#00b359]">Upcoming Events</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Be part of transformative events that bring together communities,
              educators, and change-makers across Ethiopia.
            </p>
          </div>
        </section>

        {/* ── EVENTS LIST ── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-24">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 font-medium">
                  No upcoming events at the moment.
                </p>
                <p className="text-gray-400 mt-2">
                  Check back soon for new events!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.program_id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="md:flex">
                      {/* Date Box */}
                      <div className="md:w-32 bg-[#009639] text-white p-4 flex flex-col items-center justify-center">
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
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.start_date, event.end_date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>

                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 text-[#009639] font-semibold hover:gap-3 transition-all"
                        >
                          Register Now <ChevronRight className="w-4 h-4" />
                        </a>
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
