import { MapPin, Calendar, Clock, ArrowRight, Target, ChevronRight } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const upcomingProjects = [
    {
        title: "Bahir Dar Solar School Project",
        description: "Installing solar power systems in 8 off-grid schools to enable evening study sessions, power computers, and provide reliable electricity to rural communities.",
        location: "Bahir Dar", region: "Amhara",
        startDate: "Jul 2025", endDate: "Dec 2025",
        budget: "$80,000", raised: "$12,000", progress: 15,
        category: "Education", impact: "2,400+ students",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=480&fit=crop",
        goals: ["Install solar panels in 8 schools", "Power 30 computers per school", "Enable 4-hour evening study sessions", "Train local maintenance teams"],
    },
    {
        title: "Harar Mental Health Pilot",
        description: "Launching Ethiopia's first school-based mental health pilot program with trained counselors, peer-support networks, and teacher mental health training in 5 urban schools.",
        location: "Harar", region: "Harari",
        startDate: "Aug 2025", endDate: "Jul 2026",
        budget: "$42,000", raised: "$5,000", progress: 12,
        category: "Health", impact: "1,500+ students",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&h=480&fit=crop",
        goals: ["Train 20 school counselors", "Establish peer-support groups in 5 schools", "Provide teacher mental health workshops", "Create referral pathways to community services"],
    },
    {
        title: "Arba Minch Safe Housing Initiative",
        description: "Partnering with local communities to build or rehabilitate 50 safe, durable homes for families living in extreme poverty in Arba Minch district.",
        location: "Arba Minch", region: "SNNPR",
        startDate: "Oct 2025", endDate: "Sep 2026",
        budget: "$95,000", raised: "$8,000", progress: 8,
        category: "Social", impact: "50 families",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=480&fit=crop",
        goals: ["Construct or rehabilitate 50 homes", "Engage community members as builders", "Provide ownership deeds to families", "Install basic sanitation in each home"],
    },
];

export function UpcomingProjects() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2d1800] via-[#5c3600] to-[#b37000]" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FCDD09]/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <a href="/projects" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">← All Projects</a>
                        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-200 text-sm px-4 py-2 rounded-full mb-6">
                            <Clock className="w-4 h-4" /> Coming Soon
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
                            Upcoming{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-300">Projects</span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-xl">These projects are funded and ready to launch. Your support today ensures they start on schedule.</p>
                    </div>
                </section>

                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[{ value: "3", label: "Upcoming Projects" }, { value: "3,950+", label: "Future Beneficiaries" }, { value: "$217,000", label: "Budget Needed" }, { value: "$25,000", label: "Raised So Far" }].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-amber-600">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        {upcomingProjects.map((project, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                    <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden flex-shrink-0 relative">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" /> Upcoming
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8 lg:p-10">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">{project.category}</span>
                                            <span className="bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">{project.impact} will benefit</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
                                        <p className="text-gray-500 leading-relaxed mb-5">{project.description}</p>
                                        <div className="flex items-center gap-5 text-sm text-gray-400 mb-6">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}, {project.region}</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Starts {project.startDate}</span>
                                        </div>

                                        {/* Fundraising progress */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-bold text-gray-800">{project.raised} raised</span>
                                                <span className="font-bold text-amber-600">{project.progress}% of {project.budget}</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${project.progress}%` }} />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Goal: {project.budget}</p>
                                        </div>

                                        {/* Project goals */}
                                        <div className="bg-amber-50 rounded-2xl p-5 mb-6">
                                            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                <Target className="w-3.5 h-3.5" /> Project Goals
                                            </p>
                                            <ul className="space-y-2">
                                                {project.goals.map((g, j) => (
                                                    <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" /> {g}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a href="/donate" className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold px-6 py-3 rounded-full hover:bg-amber-600 hover:shadow-lg transition-all duration-300">
                                            Fund This Project <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-[#2d1800] to-[#b37000] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Be a Founding Donor</h2>
                        <p className="text-white/75 text-lg mb-8">Be among the first to fund these projects and make them a reality for Ethiopian communities.</p>
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
