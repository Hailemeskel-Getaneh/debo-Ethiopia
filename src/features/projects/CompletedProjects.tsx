import { MapPin, Calendar, CheckCircle2, ArrowRight, Star, Users } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const completedProjects = [
    {
        title: "Jimma School Nutrition Program",
        description: "Delivered 180,000 nutritious meals to 1,200 students over 18 months, reducing absenteeism by 40%.",
        location: "Jimma", region: "Oromia",
        startDate: "Jan 2023", endDate: "Jun 2024",
        budget: "$60,000", category: "Health", impact: "1,200 students",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=700&h=480&fit=crop",
        outcomes: [
            "180,000 meals served over 18 months",
            "40% reduction in school absenteeism",
            "Program replicated in 3 additional schools",
        ],
        quote: { text: "The meal program changed everything. My children stay in school the whole day.", author: "Aster Bekele, Parent – Jimma" },
    },
    {
        title: "Mekelle Teachers Training Program",
        description: "Trained 200 teachers across 15 schools in modern pedagogy, digital tools, and inclusive classroom practices.",
        location: "Mekelle", region: "Tigray",
        startDate: "Mar 2023", endDate: "Dec 2023",
        budget: "$28,000", category: "Education", impact: "200 teachers",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=480&fit=crop",
        outcomes: [
            "200 teachers completed 80-hour training",
            "90% reported improved classroom confidence",
            "Digital tools integrated in 15 schools",
        ],
        quote: { text: "I now use creative methods I never learned in college. My students are excited to learn.", author: "Mulugeta Haile, Teacher – Mekelle" },
    },
    {
        title: "Adama Women's Empowerment Project",
        description: "Supported 150 women to form savings groups, complete skills training, and launch micro-enterprises.",
        location: "Adama", region: "Oromia",
        startDate: "Jan 2023", endDate: "Dec 2023",
        budget: "$35,000", category: "Social", impact: "150 women",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&h=480&fit=crop",
        outcomes: [
            "150 women trained in vocational skills",
            "120+ women launched their own businesses",
            "Average monthly income increased by 65%",
        ],
        quote: { text: "The training gave me skills and the group gave me courage. Now I run my own tailoring shop.", author: "Frehiwot Alemu – Adama" },
    },
];

export function CompletedProjects() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f2044] via-[#1a3569] to-[#243b8a]" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <a href="/projects" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">← All Projects</a>
                        <div className="inline-flex items-center gap-2 bg-blue-400/20 border border-blue-400/30 text-blue-200 text-sm px-4 py-2 rounded-full mb-6">
                            <CheckCircle2 className="w-4 h-4" /> Successfully Delivered
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
                            Completed{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">Projects</span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-xl">Every completed project is a promise kept — to a child, a family, or a community.</p>
                    </div>
                </section>

                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[{ value: "3", label: "Completed" }, { value: "1,550+", label: "Beneficiaries" }, { value: "$123,000", label: "Invested" }, { value: "100%", label: "Goals Met" }].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-blue-700">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                        {completedProjects.map((project, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                    <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden flex-shrink-0 relative">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8 lg:p-10">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">{project.category}</span>
                                            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {project.impact}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
                                        <p className="text-gray-500 leading-relaxed mb-5">{project.description}</p>
                                        <div className="flex items-center gap-5 text-sm text-gray-400 mb-6">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}, {project.region}</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {project.startDate} – {project.endDate}</span>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-bold text-gray-800">{project.budget} — Fully Funded</span>
                                                <span className="font-bold text-blue-600">100%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-2xl p-5 mb-6">
                                            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">Key Outcomes</p>
                                            <ul className="space-y-2">
                                                {project.outcomes.map((o, j) => (
                                                    <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" /> {o}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <blockquote className="border-l-4 border-[#FCDD09] pl-4 italic text-gray-600 text-sm">
                                            <p className="mb-1">"{project.quote.text}"</p>
                                            <footer className="text-xs text-gray-400 not-italic font-semibold flex items-center gap-1">
                                                <Star className="w-3 h-3 text-[#FCDD09]" /> {project.quote.author}
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-br from-[#0f2044] to-[#243b8a] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Help Us Write the Next Story</h2>
                        <p className="text-white/75 text-lg mb-8">Your contribution starts the next chapter for a community in Ethiopia.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/donate" className="inline-flex items-center gap-2 bg-[#FCDD09] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300">
                                Donate Now <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="/projects?status=upcoming" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                                See Upcoming Projects
                            </a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
