import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Users, Star, Globe } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const board = [
    {
        name: "Dr. Abebe Haile",
        role: "Board Chair",
        bio: "Former educator with 25 years of experience in international development and educational reform.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        email: "abebe@deboethiopia.org",
    },
    {
        name: "Tigist Alemu",
        role: "Vice Chair",
        bio: "Technology entrepreneur and passionate advocate for STEM education and gender equity in Africa.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        email: "tigist@deboethiopia.org",
    },
    {
        name: "Solomon Tekle",
        role: "Treasurer",
        bio: "Financial executive with deep expertise in non-profit management and impact investing.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        email: "solomon@deboethiopia.org",
    },
    {
        name: "Meseret Kebede",
        role: "Secretary",
        bio: "Education policy specialist, community organizer, and champion of girls' education in rural Ethiopia.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        email: "meseret@deboethiopia.org",
    },
];

const leadership = [
    {
        name: "Yohannes Desta",
        role: "Executive Director",
        bio: "Leading DeboEthiopia with vision and passion for educational equity, Yohannes brings 15 years of NGO leadership experience.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        email: "yohannes@deboethiopia.org",
    },
    {
        name: "Hirut Tadesse",
        role: "Director of Programs",
        bio: "Overseeing all educational programs and ensuring quality delivery across Ethiopia's diverse communities.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        email: "hirut@deboethiopia.org",
    },
    {
        name: "Dawit Gebru",
        role: "Director of Operations",
        bio: "Managing field operations and regional partnerships to ensure our mission reaches every corner of the country.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
        email: "dawit@deboethiopia.org",
    },
];

const advisors = [
    { name: "Prof. Almaz Gebre", org: "Addis Ababa University", domain: "Education Policy" },
    { name: "Dr. Selamawit Bekele", org: "World Bank Group", domain: "International Development" },
    { name: "Biruk Asfaw", org: "Tech4Dev Foundation", domain: "Technology & Innovation" },
    { name: "Firehiwot Mulugeta", org: "UNICEF Ethiopia", domain: "Child Rights & Welfare" },
    { name: "Dr. Habtamu Girma", org: "Harvard Extension", domain: "Education Research" },
    { name: "Mulu Bekele", org: "African Development Bank", domain: "Philanthropy & Finance" },
];

function MemberCard({ member, large = false }: { member: typeof board[0]; large?: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 ${large ? "flex flex-col" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#009639]/90 via-[#009639]/40 to-transparent flex items-end justify-start p-5 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="flex gap-3">
                        <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#FCDD09] transition-colors shadow"
                            aria-label={`Email ${member.name}`}
                        >
                            <Mail className="w-4 h-4 text-gray-700" />
                        </a>
                        <button
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#FCDD09] transition-colors shadow"
                            aria-label={`${member.name} LinkedIn`}
                        >
                            <Linkedin className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="p-6">
                <p className="text-xs font-bold text-[#009639] uppercase tracking-widest mb-1">{member.role}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009639] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}

export function BoardLeadership() {
    const [currentImage, setCurrentImage] = useState(0);

    const heroImages = [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&fit=crop",
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1400&fit=crop",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1400&fit=crop",
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
                <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={currentImage}
                                src={heroImages[currentImage]}
                                alt="Board and Leadership"
                                initial={{ x: "100%", opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-100%", opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/60 via-[#16213e]/40 to-[#0f3460]/20 z-10" />
                    </div>


                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-sm px-4 py-2 rounded-full mb-6">
                            <Users className="w-4 h-4" /> People Behind the Mission
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
                            Board &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-[#FFA500]">
                                Leadership
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Meet the dedicated individuals guiding DeboEthiopia's mission, strategy, and day-to-day operations.
                        </p>
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

                {/* ── BOARD OF DIRECTORS ── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-[#009639]/10 text-[#009639] font-semibold text-sm px-4 py-2 rounded-full mb-4">
                                <Star className="w-4 h-4" /> Governance
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Board of Directors</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Our board brings together diverse expertise in education, technology, finance, and community development.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {board.map((member, i) => (
                                <MemberCard key={i} member={member} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── LEADERSHIP TEAM ── */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-[#DA121A]/10 text-[#DA121A] font-semibold text-sm px-4 py-2 rounded-full mb-4">
                                <Users className="w-4 h-4" /> Executive
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Leadership Team</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Our executive team manages day-to-day operations and program delivery across Ethiopia.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {leadership.map((member, i) => (
                                <MemberCard key={i} member={member} large />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ADVISORY COUNCIL ── */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
                                <Globe className="w-4 h-4" /> Global Guidance
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Advisory Council</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Distinguished experts from leading universities, international organizations, and private sector companies
                                who provide strategic guidance to our mission.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {advisors.map((advisor, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-5 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-[#009639]/30 transition-all duration-300"
                                >
                                    {/* Avatar placeholder with initials */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#009639] to-[#007a2e] flex items-center justify-center text-white font-bold text-lg shadow">
                                        {advisor.name.split(" ").filter((_, i2) => i2 < 2).map(w => w[0]).join("")}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-0.5">{advisor.name}</h3>
                                        <p className="text-sm text-[#009639] font-medium mb-1">{advisor.domain}</p>
                                        <p className="text-xs text-gray-400">{advisor.org}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── JOIN CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Want to Join Our Team?</h2>
                        <p className="text-lg text-white/75 mb-8">
                            We're always looking for passionate individuals to join our board, advisory council, or leadership team.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#FCDD09] text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        >
                            Get in Touch <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
