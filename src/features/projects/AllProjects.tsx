import { useState } from "react";
import {
    Search,
    MapPin,
    Calendar,
    ChevronRight,
    Sparkles,
    ArrowRight,
    Clock,
    CheckCircle2,
    PlayCircle,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const statuses = [
    { id: "all", label: "All Projects" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "upcoming", label: "Upcoming" },
];

const statusMeta: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    active: { icon: PlayCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    completed: { icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    upcoming: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
};

const projects = [
    {
        id: 1,
        status: "active",
        title: "Bole School Library Expansion",
        description:
            "Expanding the library at Bole Primary School with 3,000+ new books, reading corners, and a digital resource station.",
        location: "Addis Ababa",
        region: "Addis Ababa",
        startDate: "Jan 2025",
        endDate: "Dec 2025",
        budget: "$45,000",
        raised: "$32,000",
        progress: 71,
        category: "Education",
        image:
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
    },
    {
        id: 2,
        status: "active",
        title: "Hawassa Clean Water Initiative",
        description:
            "Drilling 3 boreholes and installing water purification systems to provide clean water to 2 rural schools and surrounding villages.",
        location: "Hawassa",
        region: "SNNPR",
        startDate: "Mar 2025",
        endDate: "Sep 2025",
        budget: "$72,000",
        raised: "$58,000",
        progress: 81,
        category: "Health",
        image:
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=400&fit=crop",
    },
    {
        id: 3,
        status: "active",
        title: "Gondar Girls' Scholarship Fund",
        description:
            "Providing full secondary school scholarships, uniforms, and mentorship to 50 girls from low-income families in Gondar.",
        location: "Gondar",
        region: "Amhara",
        startDate: "Sep 2024",
        endDate: "Aug 2026",
        budget: "$30,000",
        raised: "$21,000",
        progress: 70,
        category: "Education",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    },
    {
        id: 4,
        status: "active",
        title: "Dire Dawa Youth Tech Hub",
        description:
            "Establishing a community technology center with computers, internet, and coding courses for youth aged 14–25.",
        location: "Dire Dawa",
        region: "Dire Dawa",
        startDate: "Feb 2025",
        endDate: "Jan 2026",
        budget: "$55,000",
        raised: "$27,000",
        progress: 49,
        category: "Education",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    },
    {
        id: 5,
        status: "completed",
        title: "Jimma School Nutrition Program",
        description:
            "Delivered 180,000 nutritious school meals to 1,200 students over 18 months, reducing absenteeism by 40%.",
        location: "Jimma",
        region: "Oromia",
        startDate: "Jan 2023",
        endDate: "Jun 2024",
        budget: "$60,000",
        raised: "$60,000",
        progress: 100,
        category: "Health",
        image:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    },
    {
        id: 6,
        status: "completed",
        title: "Mekelle Teachers Training",
        description:
            "Trained 200 teachers in modern pedagogy, digital tools, and inclusive education across 15 schools in Tigray.",
        location: "Mekelle",
        region: "Tigray",
        startDate: "Mar 2023",
        endDate: "Dec 2023",
        budget: "$28,000",
        raised: "$28,000",
        progress: 100,
        category: "Education",
        image:
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    },
    {
        id: 7,
        status: "completed",
        title: "Adama Women's Empowerment",
        description:
            "Supported 150 women to establish savings groups, complete skills training, and launch micro-enterprises in Adama.",
        location: "Adama",
        region: "Oromia",
        startDate: "Jan 2023",
        endDate: "Dec 2023",
        budget: "$35,000",
        raised: "$35,000",
        progress: 100,
        category: "Social",
        image:
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
    },
    {
        id: 8,
        status: "upcoming",
        title: "Bahir Dar Solar School Project",
        description:
            "Installing solar power systems in 8 off-grid schools to enable evening study sessions and power computers.",
        location: "Bahir Dar",
        region: "Amhara",
        startDate: "Jul 2025",
        endDate: "Dec 2025",
        budget: "$80,000",
        raised: "$12,000",
        progress: 15,
        category: "Education",
        image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
        id: 9,
        status: "upcoming",
        title: "Harar Mental Health Pilot",
        description:
            "Launching Ethiopia's first school-based mental health pilot with trained counselors in 5 urban schools.",
        location: "Harar",
        region: "Harari",
        startDate: "Aug 2025",
        endDate: "Jul 2026",
        budget: "$42,000",
        raised: "$5,000",
        progress: 12,
        category: "Health",
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
    },
];

export function AllProjects() {
    const [activeStatus, setActiveStatus] = useState("all");
    const [search, setSearch] = useState("");

    const filtered = projects.filter((p) => {
        const matchStatus = activeStatus === "all" || p.status === activeStatus;
        const matchSearch =
            search === "" ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f1729] via-[#1a2d55] to-[#243b6e]" />
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f1729]/90 to-[#243b6e]/60" />


                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-[#FCDD09]" /> Projects Across Ethiopia
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">
                                Projects
                            </span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
                            From school libraries to clean water systems — discover the on-the-ground projects
                            that are transforming communities across every region of Ethiopia.
                        </p>

                        {/* Search */}
                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, location, or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FCDD09]"
                            />
                        </div>
                    </div>
                </section>

                {/* ── STATS BAR ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[
                                { value: `${projects.filter((p) => p.status === "active").length}`, label: "Active Projects" },
                                { value: `${projects.filter((p) => p.status === "completed").length}`, label: "Completed" },
                                { value: `${projects.filter((p) => p.status === "upcoming").length}`, label: "Upcoming" },
                                { value: "9", label: "Regions Covered" },
                            ].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-[#243b6e]">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FILTER + GRID ── */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {statuses.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveStatus(s.id)}
                                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeStatus === s.id
                                        ? "bg-[#243b6e] text-white shadow-md scale-105"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {s.id !== "all" && (() => {
                                        const M = statusMeta[s.id];
                                        return <M.icon className="w-4 h-4" />;
                                    })()}
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-gray-400 mb-8">
                            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                        </p>

                        {filtered.length === 0 ? (
                            <div className="text-center py-24 text-gray-400">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                                <p className="text-lg font-medium">No projects match your search.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {filtered.map((project) => {
                                    const M = statusMeta[project.status];
                                    const StatusIcon = M.icon;
                                    return (
                                        <div
                                            key={project.id}
                                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                        >
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                {/* Status badge */}
                                                <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 ${M.bg} ${M.color} text-xs font-bold px-3 py-1.5 rounded-full shadow`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </span>
                                                {/* Category */}
                                                <span className="absolute top-4 right-4 bg-black/40 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                                                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{project.description}</p>

                                                {/* Meta */}
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                                    <span className="inline-flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5" /> {project.location}, {project.region}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" /> {project.startDate} – {project.endDate}
                                                    </span>
                                                </div>

                                                {/* Progress bar */}
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                                                        <span className="font-semibold text-gray-700">{project.raised} raised</span>
                                                        <span>{project.progress}%</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#009639] to-[#007a2e] rounded-full transition-all duration-1000"
                                                            style={{ width: `${project.progress}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1">Goal: {project.budget}</p>
                                                </div>

                                                <a
                                                    href={`/projects?status=${project.status}`}
                                                    className="inline-flex items-center justify-center gap-1.5 text-[#009639] font-semibold text-sm border border-[#009639]/30 rounded-xl py-2 hover:bg-[#009639] hover:text-white transition-all duration-200"
                                                >
                                                    View Details <ChevronRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#0f1729] to-[#243b6e] text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Fund a Project</h2>
                        <p className="text-xl text-white/75 mb-8">
                            Your donation directly enables the next school library, water borehole, or scholarship.
                        </p>
                        <a
                            href="/donate"
                            className="inline-flex items-center gap-2 bg-[#FCDD09] text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
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
