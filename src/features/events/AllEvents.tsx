import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Users,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const filters = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

const typeColors: Record<string, string> = {
  Fundraiser: "bg-[#009639]/10 text-[#009639]",
  Conference: "bg-[#009639]/10 text-[#009639]",
  Workshop: "bg-[#009639]/10 text-[#009639]",
  Ceremony: "bg-[#009639]/10 text-[#009639]",
  Community: "bg-[#009639]/10 text-[#009639]",
  Gala: "bg-[#009639]/10 text-[#009639]",
};

const events = [
  {
    id: 1,
    type: "upcoming",
    title: "Annual Education Gala 2025",
    category: "Gala",
    description:
      "Our flagship annual fundraising gala celebrating education heroes and raising funds for the next year's scholarships and programs.",
    date: "Jun 14, 2025",
    time: "6:00 PM – 10:00 PM",
    location: "Sheraton Addis Ababa",
    city: "Addis Ababa",
    seats: 300,
    seatsLeft: 45,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=480&fit=crop",
    registration: true,
  },
  {
    id: 2,
    type: "upcoming",
    title: "STEM Summer Camp Registration Day",
    category: "Community",
    description:
      "Open registration day for our 3-week summer STEM camp for students aged 10–17. Meet mentors, tour the facilities, and sign up your child.",
    date: "May 10, 2025",
    time: "9:00 AM – 3:00 PM",
    location: "DeboEthiopia Learning Center",
    city: "Addis Ababa",
    seats: 120,
    seatsLeft: 32,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=480&fit=crop",
    registration: true,
  },
  {
    id: 3,
    type: "upcoming",
    title: "Girls in Tech Workshop",
    category: "Workshop",
    description:
      "A one-day interactive workshop empowering girls aged 13–18 with coding, design, and tech entrepreneurship skills led by women in tech.",
    date: "May 24, 2025",
    time: "8:30 AM – 4:00 PM",
    location: "Gondar Community Hall",
    city: "Gondar",
    seats: 80,
    seatsLeft: 20,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&h=480&fit=crop",
    registration: true,
  },
  {
    id: 4,
    type: "upcoming",
    title: "Education Policy Symposium",
    category: "Conference",
    description:
      "A multi-stakeholder conference bringing together policymakers, educators, and NGOs to discuss the future of education in Ethiopia.",
    date: "Jul 8, 2025",
    time: "8:00 AM – 5:00 PM",
    location: "Addis Ababa University",
    city: "Addis Ababa",
    seats: 500,
    seatsLeft: 180,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=480&fit=crop",
    registration: true,
  },
  {
    id: 5,
    type: "past",
    title: "Year-End Scholarship Ceremony 2024",
    category: "Ceremony",
    description:
      "Celebrated 50 scholarship recipients from the Gondar Girls' Initiative with their families, mentors, and school principals.",
    date: "Dec 12, 2024",
    time: "10:00 AM – 1:00 PM",
    location: "Gondar City Hall",
    city: "Gondar",
    seats: 250,
    seatsLeft: 0,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=480&fit=crop",
    registration: false,
  },
  {
    id: 6,
    type: "past",
    title: "Community Health Fair 2024",
    category: "Community",
    description:
      "Free health screenings, nutrition workshops, and hygiene education for 2,000+ community members across 3 neighborhoods in Hawassa.",
    date: "Nov 5, 2024",
    time: "8:00 AM – 4:00 PM",
    location: "Hawassa Stadium Grounds",
    city: "Hawassa",
    seats: 2000,
    seatsLeft: 0,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=480&fit=crop",
    registration: false,
  },
  {
    id: 7,
    type: "past",
    title: "Teachers Innovation Hackathon",
    category: "Workshop",
    description:
      "48-hour hackathon where 80 teachers co-designed new classroom teaching tools and digital lesson plans now used in 15 schools.",
    date: "Oct 18, 2024",
    time: "9:00 AM (2 days)",
    location: "Mekelle University",
    city: "Mekelle",
    seats: 100,
    seatsLeft: 0,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=480&fit=crop",
    registration: false,
  },
  {
    id: 8,
    type: "past",
    title: "Annual Fundraising Gala 2024",
    category: "Gala",
    description:
      "Raised over $120,000 in a single evening to fund the Bole Library Expansion and Hawassa Water Initiative. 400 guests attended.",
    date: "Jun 8, 2024",
    time: "6:00 PM – 11:00 PM",
    location: "Hilton Addis Ababa",
    city: "Addis Ababa",
    seats: 400,
    seatsLeft: 0,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&h=480&fit=crop",
    registration: false,
  },
];

export function AllEvents() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    const matchType = activeFilter === "all" || e.type === activeFilter;
    const matchSearch =
      search === "" ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

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
                placeholder="Search events by name, city, or type..."
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
                  value: `${events.filter((e) => e.type === "upcoming").length}`,
                  label: "Upcoming Events",
                },
                {
                  value: `${events.filter((e) => e.type === "past").length}`,
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
                    key={event.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Date badge */}
                      <div className="absolute top-4 left-4 bg-white rounded-xl p-2 text-center shadow-md min-w-[48px]">
                        <p className="text-xs font-bold text-[#009639] uppercase leading-tight">
                          {event.date.split(" ")[0]}
                        </p>
                        <p className="text-xl font-black text-gray-900 leading-tight">
                          {event.date.split(" ")[1].replace(",", "")}
                        </p>
                      </div>
                      {/* Type badge */}
                      <span
                        className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full ${typeColors[event.category] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {event.category}
                      </span>
                      {event.type === "past" && (
                        <span className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Past Event
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-1.5 mb-4 text-xs text-gray-400">
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" /> {event.date} ·{" "}
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" /> {event.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          {event.type === "upcoming"
                            ? `${event.seatsLeft} seats remaining`
                            : `${event.seats} attended`}
                        </span>
                      </div>

                      {event.registration ? (
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

        {/* ── CTA ── */}
        <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Want to Partner on an Event?
            </h2>
            <p className="text-xl text-white/75 mb-8">
              We welcome sponsors, volunteers, and community partners who want
              to help make our events impactful.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
