import {
    MapPin,
    Calendar,
    PlayCircle,
    ArrowRight,
    ChevronRight,
    TrendingUp,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const activeProjects = [
    {
        title: "Bole School Library Expansion",
        description:
            "Expanding the library at Bole Primary School with 3,000+ new books, reading corners, and a digital resource station for 600 students.",
        location: "Addis Ababa",
        region: "Addis Ababa",
        startDate: "Jan 2025",
        endDate: "Dec 2025",
        budget: "$45,000",
        raised: "$32,000",
        progress: 71,
        category: "Education",
        impact: "600+ students",
        image:
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&h=480&fit=crop",
        updates: [
            "Phase 1 shelving installed – Feb 2025",
            "2,100 books delivered and catalogued – Mar 2025",
            "Digital reading station setup in progress",
        ],
    },
    {
        title: "Hawassa Clean Water Initiative",
        description:
            "Drilling 3 boreholes and installing water purification systems to provide clean, safe drinking water to 2 rural schools and surrounding villages.",
        location: "Hawassa",
        region: "SNNPR",
        startDate: "Mar 2025",
        endDate: "Sep 2025",
        budget: "$72,000",
        raised: "$58,000",
        progress: 81,
        category: "Health",
        impact: "3,000+ people",
        image:
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=700&h=480&fit=crop",
        updates: [
            "Borehole 1 drilled and operational – Apr 2025",
            "Borehole 2 drilling underway – May 2025",
            "Hygiene education sessions launched",
        ],
    },
    {
        title: "Gondar Girls' Scholarship Fund",
        description:
            "Providing full secondary school scholarships, uniforms, school supplies, and monthly mentorship sessions for 50 girls from low-income families.",
        location: "Gondar",
        region: "Amhara",
        startDate: "Sep 2024",
        endDate: "Aug 2026",
        budget: "$30,000",
        raised: "$21,000",
        progress: 70,
        category: "Education",
        impact: "50 girls",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&h=480&fit=crop",
        updates: [
            "50 scholars enrolled and active",
            "Quarterly mentorship sessions running",
            "85% attendance rate maintained",
        ],
    },
    {
        title: "Dire Dawa Youth Tech Hub",
        description:
            "Establishing a community technology center with 30 computers, high-speed internet, and coding & digital literacy courses for youth aged 14–25.",
        location: "Dire Dawa",
        region: "Dire Dawa",
        startDate: "Feb 2025",
        endDate: "Jan 2026",
        budget: "$55,000",
        raised: "$27,000",
        progress: 49,
        category: "Education",
        impact: "300+ youth",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=480&fit=crop",
        updates: [
            "Facility renovated and ready",
            "20 computers installed",
            "Fundraising for remaining equipment ongoing",
        ],
    },
];

export function ActiveProjects() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />


                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <a href="/projects" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                            ← All Projects
                        </a>
                        <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-sm px-4 py-2 rounded-full mb-6">
                            <PlayCircle className="w-4 h-4" /> Currently In Progress
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
                            Active{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">
                                Projects
                            </span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-xl">
                            These projects are live and in full swing. Every donation made today directly
                            accelerates their progress.
                        </p>
                    </div>
                </section>

                {/* ── QUICK STATS ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[
                                { value: "4", label: "Active Projects" },
                                { value: "4,950+", label: "People Impacted" },
                                { value: "$138,000", label: "Total Raised" },
                                { value: "68%", label: "Average Completion" },
                            ].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-[#009639]">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROJECTS ── */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        {activeProjects.map((project, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                    {/* Image */}
                                    <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden flex-shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-8 lg:p-10">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">
                                                <PlayCircle className="w-3.5 h-3.5" /> Active
                                            </span>
                                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                                {project.category}
                                            </span>
                                            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                                {project.impact} impacted
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
                                        <p className="text-gray-500 leading-relaxed mb-5">{project.description}</p>

                                        <div className="flex items-center gap-5 text-sm text-gray-400 mb-6">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" /> {project.location}, {project.region}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> {project.startDate} – {project.endDate}
                                            </span>
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-bold text-gray-800">{project.raised} raised</span>
                                                <span className="font-bold text-[#009639]">{project.progress}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#009639] to-[#FCDD09] rounded-full"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Goal: {project.budget}</p>
                                        </div>

                                        {/* Updates */}
                                        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                <TrendingUp className="w-3.5 h-3.5" /> Recent Updates
                                            </p>
                                            <ul className="space-y-2">
                                                {project.updates.map((u, j) => (
                                                    <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#009639] mt-2 flex-shrink-0" />
                                                        {u}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a
                                            href="/donate"
                                            className="inline-flex items-center gap-2 bg-[#009639] text-white font-bold px-6 py-3 rounded-full hover:bg-[#007a2e] hover:shadow-lg transition-all duration-300"
                                        >
                                            Fund This Project <ChevronRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Accelerate These Projects</h2>
                        <p className="text-white/75 text-lg mb-8">
                            Additional funding helps us reach our goals faster and start the next project sooner.
                        </p>
                        <a
                            href="/donate"
                            className="inline-flex items-center gap-2 bg-[#FCDD09] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
                        >
                            Donate Now <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
