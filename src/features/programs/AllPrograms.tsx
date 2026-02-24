import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Heart,
  Users,
  ArrowRight,
  Search,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Activity,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

// Import local images
import imgSTEM from "@/assets/images/Grade_9.jpg";
import imgGirls from "@/assets/images/primary_teacher.jpg";
import imgDigital from "@/assets/images/robotics1.jpg";
import imgTeachers from "@/assets/images/teacher.jpg";
import imgHealth from "@/assets/images/IMG_20231104_083345.jpg";
import imgCommunity from "@/assets/images/teachers.jpg";
import imgYouth from "@/assets/images/G 12.jpg";
import imgWomen from "@/assets/images/H.mariam-1.jpg";

const categories = [
  { id: "all", label: "All Programs" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
  { id: "social", label: "Social Support" },
];

const programs = [
  {
    id: 1,
    category: "education",
    title: "STEM Excellence Program",
    description:
      "Equipping students with science, technology, engineering, and math skills to thrive in the modern economy.",
    image: imgSTEM,
    participants: "1,200+",
    schools: "15 Schools",
    icon: GraduationCap,
    color: "from-emerald-500 to-green-600",
    badge: "Flagship",
  },
  {
    id: 2,
    category: "education",
    title: "Girls' Education Initiative",
    description:
      "Breaking barriers for girls in rural Ethiopia through scholarships, mentorship, and safe learning environments.",
    image: imgGirls,
    participants: "800+",
    schools: "10 Schools",
    icon: BookOpen,
    color: "from-pink-500 to-rose-600",
    badge: "Featured",
  },
  {
    id: 3,
    category: "education",
    title: "Digital Literacy Camp",
    description:
      "Teaching children and young adults essential computer and internet skills for the 21st century.",
    image: imgDigital,
    participants: "600+",
    schools: "8 Centers",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    badge: null,
  },
  {
    id: 4,
    category: "education",
    title: "Teachers Training Program",
    description:
      "Upskilling educators with modern pedagogy, child psychology, and digital teaching tools.",
    image: imgTeachers,
    participants: "350+",
    schools: "Nationwide",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    badge: null,
  },
  {
    id: 5,
    category: "health",
    title: "School Health & Nutrition",
    description:
      "Providing nutritious meals and basic health screenings to keep children healthy and focused on learning.",
    image: imgHealth,
    participants: "2,000+",
    schools: "20 Schools",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    badge: "High Impact",
  },
  {
    id: 6,
    category: "health",
    title: "Mental Health Awareness",
    description:
      "Reducing stigma and increasing access to mental health support for students, teachers, and families.",
    image: imgCommunity,
    participants: "500+",
    schools: "12 Sites",
    icon: Activity,
    color: "from-teal-500 to-cyan-600",
    badge: null,
  },
  {
    id: 7,
    category: "health",
    title: "Clean Water & Hygiene",
    description:
      "Installing water points and hygiene facilities in schools to reduce disease and absenteeism.",
    image: imgYouth,
    participants: "3,000+",
    schools: "18 Schools",
    icon: Heart,
    color: "from-sky-500 to-blue-600",
    badge: "Life-Changing",
  },
  {
    id: 8,
    category: "social",
    title: "Community Empowerment",
    description:
      "Building local capacity through leadership training, women's groups, and community-led development projects.",
    image: imgWomen,
    participants: "1,500+",
    schools: "25 Communities",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    badge: "Featured",
  },
  {
    id: 9,
    category: "social",
    title: "Orphan & Vulnerable Children",
    description:
      "Providing food, shelter, education support, and psychosocial care to Ethiopia's most vulnerable children.",
    image: imgGirls,
    participants: "400+",
    schools: "8 Centers",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    badge: null,
  },
  {
    id: 10,
    category: "social",
    title: "Youth Skills & Employment",
    description:
      "Equipping young Ethiopians with vocational skills and entrepreneurship training to create their own livelihoods.",
    image: imgWomen,
    participants: "700+",
    schools: "6 Hubs",
    icon: GraduationCap,
    color: "from-lime-500 to-green-600",
    badge: "New",
  },
];

export function AllPrograms() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    "/src/assets/images/teachers.jpg",
    "/src/assets/images/teacher.jpg",
    "/src/assets/images/primary_teacher.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const filtered = programs.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="All Programs"
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a]/50 via-[#005c28]/30 to-[#009639]/5 z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Changing Lives
              Across Ethiopia
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Programs
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              From education to health to social empowerment — explore the
              programs that are transforming communities across Ethiopia.
            </p>

            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentImage
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── QUICK STATS ── */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { value: "10", label: "Active Programs" },
                { value: "5,000+", label: "Beneficiaries" },
                { value: "3", label: "Program Areas" },
                { value: "25+", label: "Partner Sites" },
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

        {/* ── FILTER TABS + GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Available Programs</h2>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-[#009639] text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Count */}
            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} program
              {filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Cards Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No programs match your search.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((program) => (
                  <div
                    key={program.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {program.badge && (
                        <span
                          className={`absolute top-4 left-4 bg-gradient-to-r ${program.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}
                        >
                          {program.badge}
                        </span>
                      )}
                      {/* Category chip */}
                      <span className="absolute top-4 right-4 bg-black/40 backdrop-blur text-white text-xs px-3 py-1 rounded-full capitalize">
                        {program.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 shadow`}
                      >
                        <program.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">
                        {program.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <p className="text-sm font-bold text-[#009639]">
                            {program.participants}
                          </p>
                          <p className="text-xs text-gray-400">Participants</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-[#009639]">
                            {program.schools}
                          </p>
                          <p className="text-xs text-gray-400">Reach</p>
                        </div>
                        <a
                          href={`/programs?type=${program.category}`}
                          className="ml-auto inline-flex items-center gap-1.5 text-[#009639] font-semibold text-sm hover:gap-2.5 transition-all"
                        >
                          Learn More <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
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
              Want to Support a Program?
            </h2>
            <p className="text-xl text-white/75 mb-8">
              Your donation directly funds these programs and changes children's
              lives.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
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
