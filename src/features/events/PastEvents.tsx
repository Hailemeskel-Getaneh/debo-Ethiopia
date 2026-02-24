import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const typeColors: Record<string, string> = {
  Fundraiser: "bg-[#009639]/10 text-[#009639]",
  Conference: "bg-[#009639]/10 text-[#009639]",
  Workshop: "bg-[#009639]/10 text-[#009639]",
  Ceremony: "bg-[#009639]/10 text-[#009639]",
  Community: "bg-[#009639]/10 text-[#009639]",
  Gala: "bg-[#009639]/10 text-[#009639]",
};

const pastEvents = [
  {
    title: "Year-End Scholarship Ceremony 2024",
    category: "Ceremony",
    description:
      "Celebrated 50 scholarship recipients from the Gondar Girls' Initiative alongside their families, mentors, and school principals.",
    date: "Dec 12, 2024",
    month: "DEC",
    day: "12",
    time: "10:00 AM – 1:00 PM",
    location: "Gondar City Hall",
    city: "Gondar",
    attendees: 250,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=480&fit=crop",
    outcomes: [
      "50 girls received full scholarship awards",
      "Community leaders and 15 schools represented",
      "Girls shared testimonials of educational journeys",
    ],
    quote: {
      text: "Receiving this scholarship was a turning point. I now believe I can become a doctor.",
      author: "Tigist, Scholarship Recipient – Gondar",
    },
  },
  {
    title: "Community Health Fair 2024",
    category: "Community",
    description:
      "Free health screenings, nutrition workshops, and hygiene education sessions for 2,000+ community members across 3 Hawassa neighborhoods.",
    date: "Nov 5, 2024",
    month: "NOV",
    day: "5",
    time: "8:00 AM – 4:00 PM",
    location: "Hawassa Stadium Grounds",
    city: "Hawassa",
    attendees: 2000,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=480&fit=crop",
    outcomes: [
      "2,000+ people received free health screenings",
      "500 children vaccinated",
      "300 households educated on nutrition & hygiene",
    ],
    quote: {
      text: "This was the first time many in our neighborhood had ever seen a doctor. The event was life-changing.",
      author: "Community Leader – Hawassa",
    },
  },
  {
    title: "Teachers Innovation Hackathon",
    category: "Workshop",
    description:
      "A 48-hour hackathon where 80 teachers co-designed new classroom teaching tools and digital lesson plans now used in 15 schools.",
    date: "Oct 18, 2024",
    month: "OCT",
    day: "18",
    time: "9:00 AM (48 hrs)",
    location: "Mekelle University",
    city: "Mekelle",
    attendees: 100,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=480&fit=crop",
    outcomes: [
      "12 new teaching tools co-created",
      "Adopted in 15 schools across Tigray",
      "80 teachers trained in collaborative design",
    ],
    quote: {
      text: "I never thought I could design a learning app. The hackathon proved I was wrong.",
      author: "Bereket, Participating Teacher – Mekelle",
    },
  },
  {
    title: "Annual Fundraising Gala 2024",
    category: "Gala",
    description:
      "Raised over $120,000 in a single evening to fund the Bole Library Expansion and Hawassa Water Initiative. 400 guests attended.",
    date: "Jun 8, 2024",
    month: "JUN",
    day: "8",
    time: "6:00 PM – 11:00 PM",
    location: "Hilton Addis Ababa",
    city: "Addis Ababa",
    attendees: 400,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&h=480&fit=crop",
    outcomes: [
      "$120,000 raised in one evening",
      "Funded 2 major projects in full",
      "100+ new recurring donors acquired",
    ],
    quote: {
      text: "The energy in the room was extraordinary. Every dollar raised went to a real child's future.",
      author: "Event Sponsor, Addis Ababa",
    },
  },
];

export function PastEvents() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <a
              href="/events"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              ← All Events
            </a>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-sm px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4" /> Event Archive
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
              Past{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Events
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-xl">
              Every event we hosted left a lasting mark. Here's a look back at
              the moments that shaped our mission.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { value: "4", label: "Past Events" },
                { value: "2,750+", label: "Total Attendees" },
                { value: "$120,000+", label: "Funds Raised" },
                { value: "4", label: "Cities Visited" },
              ].map((s, i) => (
                <div key={i} className="py-8 text-center">
                  <p className="text-3xl font-black text-gray-700">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENT LIST ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {pastEvents.map((event, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
              >
                <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden flex-shrink-0 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl p-3 text-center shadow-lg">
                    <p className="text-xs font-black text-gray-500 uppercase">
                      {event.month}
                    </p>
                    <p className="text-2xl font-black text-gray-900 leading-none">
                      {event.day}
                    </p>
                  </div>
                  <span
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full ${typeColors[event.category] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {event.category}
                  </span>
                  <span className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Concluded
                  </span>
                </div>

                <div className="flex-1 p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />{" "}
                      {event.attendees.toLocaleString()} attended
                    </span>
                  </div>

                  {/* Outcomes */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                      Event Outcomes
                    </p>
                    <ul className="space-y-2">
                      {event.outcomes.map((o, j) => (
                        <li
                          key={j}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#009639] mt-0.5 flex-shrink-0" />{" "}
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-[#00b359] pl-4 italic text-gray-600 text-sm">
                    <p className="mb-1">"{event.quote.text}"</p>
                    <footer className="text-xs text-gray-400 not-italic font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#00b359]" />{" "}
                      {event.quote.author}
                    </footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Join Us at Our Next Event
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Don't miss the upcoming events. Register today and be part of our
              story.
            </p>
            <a
              href="/events?type=upcoming"
              className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
            >
              See Upcoming Events <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
