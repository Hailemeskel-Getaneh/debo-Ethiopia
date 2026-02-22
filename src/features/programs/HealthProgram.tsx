import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Activity,
    Droplets,
    Apple,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const programs = [
    {
        icon: Apple,
        title: "School Nutrition Program",
        description:
            "Providing daily nutritious meals to over 2,000 students across 20 schools, reducing hunger and improving concentration.",
        reach: "2,000+ students",
        sites: "20 schools",
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
        color: "bg-orange-100 text-orange-600",
    },
    {
        icon: Activity,
        title: "Mental Health & Wellbeing",
        description:
            "Trained counselors, peer-support groups, and awareness campaigns to address the rising mental health needs in schools.",
        reach: "500+ students",
        sites: "12 sites",
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
        color: "bg-teal-100 text-teal-600",
    },
    {
        icon: Droplets,
        title: "Clean Water & Hygiene",
        description:
            "Borehole drilling, water purification systems, and hygiene education to bring safe drinking water to schools and communities.",
        reach: "3,000+ people",
        sites: "18 schools",
        status: "Active",
        image:
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=400&fit=crop",
        color: "bg-sky-100 text-sky-600",
    },
    {
        icon: Heart,
        title: "Health Screenings & Referrals",
        description:
            "Annual health checkups for students covering vision, dental, malnutrition, and basic health screenings with referral pathways.",
        reach: "1,800+ students",
        sites: "15 schools",
        status: "Annual",
        image:
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
        color: "bg-rose-100 text-rose-600",
    },
];

const outcomes = [
    "40% reduction in school absenteeism in nutrition program schools",
    "3,000+ people now have access to clean, safe drinking water",
    "300+ students referred to health services for early intervention",
    "Mental health awareness reached 12 school communities",
    "Zero waterborne disease outbreaks in partner school communities",
];

export function HealthProgram() {
    const [currentImage, setCurrentImage] = useState(0);
    const heroImages = [
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&fit=crop",
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1400&fit=crop",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={currentImage}
                                src={heroImages[currentImage]}
                                alt="Health Program"
                                initial={{ x: "100%", opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-100%", opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0000]/50 via-[#5a0000]/30 to-[#DA121A]/5 z-10" />
                    </div>


                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <a href="/programs" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                            ← All Programs
                        </a>
                        <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 text-rose-200 text-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4" /> Health Programs
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
                            Healthy Children,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">
                                Brighter Futures
                            </span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-xl mb-10">
                            A child who is well-fed, healthy, and emotionally supported learns better.
                            Our health programs address the full spectrum of child wellbeing.
                        </p>
                        <a
                            href="/donate"
                            className="inline-flex items-center gap-2 bg-[#DA121A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#b00e14] hover:shadow-xl transition-all duration-300"
                        >
                            Support Health <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-white scale-125" : "bg-white/40 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {/* ── IMPACT NUMBERS ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[
                                { value: "7,300+", label: "People Reached" },
                                { value: "4", label: "Health Programs" },
                                { value: "65", label: "Partner Sites" },
                                { value: "40%", label: "Absenteeism Drop" },
                            ].map((s, i) => (
                                <div key={i} className="py-10 text-center">
                                    <p className="text-4xl font-black text-[#DA121A]">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROGRAMS GRID ── */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Health Initiatives</h2>
                            <p className="text-lg text-gray-500 max-w-xl mx-auto">
                                Four targeted programs addressing nutrition, mental health, clean water,
                                and preventive healthcare.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {programs.map((prog, i) => (
                                <div
                                    key={i}
                                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="h-52 overflow-hidden">
                                        <img
                                            src={prog.image}
                                            alt={prog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-7">
                                        <div className={`w-12 h-12 ${prog.color} rounded-2xl flex items-center justify-center mb-4`}>
                                            <prog.icon className="w-6 h-6" />
                                        </div>
                                        <span className="inline-block bg-rose-50 text-[#DA121A] text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            {prog.status}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{prog.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-5">{prog.description}</p>
                                        <div className="flex gap-6 pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{prog.reach}</p>
                                                <p className="text-xs text-gray-400">Reach</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{prog.sites}</p>
                                                <p className="text-xs text-gray-400">Locations</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OUTCOMES ── */}
                <section className="py-20 bg-rose-50">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Health Outcomes</h2>
                            <p className="text-gray-500">Evidence-based results from our community health work.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {outcomes.map((o, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-[#DA121A] mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-700 text-sm leading-relaxed">{o}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OTHER PROGRAMS ── */}
                <section className="py-16 bg-white border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Programs</h2>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                { href: "/programs?type=education", label: "Education Programs", desc: "STEM, girls' education, digital literacy, and teacher training." },
                                { href: "/programs?type=social", label: "Social Support Programs", desc: "Community empowerment, orphan support, and youth skills." },
                            ].map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 hover:border-[#DA121A] hover:shadow-md transition-all group"
                                >
                                    <div>
                                        <p className="font-bold text-gray-900">{link.label}</p>
                                        <p className="text-sm text-gray-500">{link.desc}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#DA121A] group-hover:translate-x-1 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DONATE CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#5a0000] to-[#DA121A] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Help a Child Stay Healthy</h2>
                        <p className="text-white/75 text-lg mb-8">
                            Your donation funds meals, clean water, and health screenings for thousands of children.
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
