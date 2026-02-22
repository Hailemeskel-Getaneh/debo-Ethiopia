import { Calendar, MapPin, Clock, Users, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const typeColors: Record<string, string> = {
    Fundraiser: "bg-rose-50 text-rose-600",
    Conference: "bg-blue-50 text-blue-600",
    Workshop: "bg-violet-50 text-violet-600",
    Ceremony: "bg-amber-50 text-amber-700",
    Community: "bg-emerald-50 text-emerald-700",
    Gala: "bg-pink-50 text-pink-600",
};

const upcomingEvents = [
    {
        title: "Annual Education Gala 2025",
        category: "Gala",
        description: "Our flagship fundraising gala celebrating education heroes and raising funds for next year's scholarships, libraries, and tech programs. Black-tie optional.",
        date: "Jun 14, 2025",
        month: "JUN", day: "14",
        time: "6:00 PM – 10:00 PM",
        location: "Sheraton Addis Ababa",
        city: "Addis Ababa",
        seats: 300, seatsLeft: 45,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&h=480&fit=crop",
        highlights: ["Awards ceremony for 10 education champions", "Live music and cultural performances", "Silent auction with exclusive lots", "3-course dinner included"],
    },
    {
        title: "STEM Summer Camp Registration Day",
        category: "Community",
        description: "Open day for parents and students to register for our 3-week summer STEM camp. Meet mentors, tour labs, and get your child enrolled for an unforgettable summer.",
        date: "May 10, 2025",
        month: "MAY", day: "10",
        time: "9:00 AM – 3:00 PM",
        location: "DeboEthiopia Learning Center",
        city: "Addis Ababa",
        seats: 120, seatsLeft: 32,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=480&fit=crop",
        highlights: ["Meet STEM mentors and program leaders", "Tour of computer labs and maker space", "Demo coding and robotics sessions", "Early bird registration discounts available"],
    },
    {
        title: "Girls in Tech Workshop",
        category: "Workshop",
        description: "A full-day interactive workshop empowering girls aged 13–18 with hands-on coding, UI design, and entrepreneurship sessions led by Ethiopia's leading women in tech.",
        date: "May 24, 2025",
        month: "MAY", day: "24",
        time: "8:30 AM – 4:00 PM",
        location: "Gondar Community Hall",
        city: "Gondar",
        seats: 80, seatsLeft: 20,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&h=480&fit=crop",
        highlights: ["Hands-on web design & coding lab", "Panel with 5 women tech leaders", "Pitch competition with prizes", "Lunch and networking included"],
    },
    {
        title: "Education Policy Symposium",
        category: "Conference",
        description: "A multi-stakeholder conference bringing together policymakers, educators, NGOs, and funders to chart the future of education access in Ethiopia.",
        date: "Jul 8, 2025",
        month: "JUL", day: "8",
        time: "8:00 AM – 5:00 PM",
        location: "Addis Ababa University",
        city: "Addis Ababa",
        seats: 500, seatsLeft: 180,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=480&fit=crop",
        highlights: ["Keynote by Ministry of Education", "4 panel discussions & breakout sessions", "Policy brief release & Q&A", "Networking lunch for all delegates"],
    },
];

export function UpcomingEvents() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0030] via-[#350060] to-[#5c00a8]" />
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-300/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <a href="/events" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">← All Events</a>
                        <div className="inline-flex items-center gap-2 bg-purple-400/20 border border-purple-400/30 text-purple-200 text-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4" /> Coming Up
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
                            Upcoming{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">Events</span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-xl">Don't miss out — register for our upcoming events and be part of the change you want to see.</p>
                    </div>
                </section>

                {/* ── STATS ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[{ value: "4", label: "Upcoming Events" }, { value: "277", label: "Seats Available" }, { value: "4", label: "Cities" }, { value: "Free–Ticketed", label: "Entry Types" }].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-purple-700">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── EVENT LIST ── */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        {upcomingEvents.map((event, i) => (
                            <div key={i} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                                {/* Image + date */}
                                <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden flex-shrink-0 relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-4 left-4 bg-white rounded-xl p-3 text-center shadow-lg">
                                        <p className="text-xs font-black text-purple-700 uppercase">{event.month}</p>
                                        <p className="text-2xl font-black text-gray-900 leading-none">{event.day}</p>
                                    </div>
                                    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full ${typeColors[event.category] ?? "bg-gray-100 text-gray-600"}`}>
                                        {event.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-8 lg:p-10">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h2>
                                    <p className="text-gray-500 leading-relaxed mb-5">{event.description}</p>

                                    <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-purple-500" /> {event.time}</span>
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> {event.date}</span>
                                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-purple-500" /> {event.location}</span>
                                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-purple-500" />
                                            <span className="font-semibold text-purple-700">{event.seatsLeft} seats left</span>
                                        </span>
                                    </div>

                                    {/* Highlights */}
                                    <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                                        <p className="text-xs font-bold text-purple-700 uppercase tracking-widest mb-3">Event Highlights</p>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {event.highlights.map((h, j) => (
                                                <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />{h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Seats progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                            <span>{event.seats - event.seatsLeft} registered</span>
                                            <span>{Math.round(((event.seats - event.seatsLeft) / event.seats) * 100)}% full</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                                                style={{ width: `${Math.round(((event.seats - event.seatsLeft) / event.seats) * 100)}%` }} />
                                        </div>
                                    </div>

                                    <a href="/contact" className="inline-flex items-center gap-2 bg-purple-700 text-white font-bold px-6 py-3 rounded-full hover:bg-purple-800 hover:shadow-lg transition-all duration-300">
                                        Register Now <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#1a0030] to-[#5c00a8] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Can't Attend? Still Make a Difference</h2>
                        <p className="text-white/75 text-lg mb-8">Your donation supports the work behind every event and program we run.</p>
                        <a href="/donate" className="inline-flex items-center gap-2 bg-[#FCDD09] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300">
                            Donate Now <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
