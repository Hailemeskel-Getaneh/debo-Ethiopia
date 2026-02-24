import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Monitor,
  Users,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const programs = [
  {
    icon: GraduationCap,
    title: "STEM Excellence Program",
    description:
      "Engaging students in hands-on science, technology, engineering, and math with lab kits, workshops, and competitions.",
    reach: "1,200+ students",
    sites: "15 schools",
    status: "Active",
    image: "/src/assets/images/Grade_9.jpg",
  },
  {
    icon: BookOpen,
    title: "Girls' Education Initiative",
    description:
      "Scholarships, safe transport, female mentors, and family engagement to keep girls in school through secondary level.",
    reach: "800+ students",
    sites: "10 schools",
    status: "Active",
    image: "/src/assets/images/primary_teacher.jpg",
  },
  {
    icon: Monitor,
    title: "Digital Literacy Camp",
    description:
      "Intensive 8-week programs teaching typing, internet safety, office software, and basic coding skills.",
    reach: "600+ learners",
    sites: "8 centers",
    status: "Active",
    image: "/src/assets/images/robotics1.jpg",
  },
  {
    icon: Users,
    title: "Teachers Training Program",
    description:
      "Continuous professional development for educators covering modern pedagogy, inclusive teaching, and digital tools.",
    reach: "350+ teachers",
    sites: "Nationwide",
    status: "Ongoing",
    image: "/src/assets/images/teacher.jpg",
  },
];

const outcomes = [
  "85% increase in school attendance among program participants",
  "70% of girls who joined the initiative completed secondary school",
  "500+ students placed in university or vocational programs",
  "90% of trained teachers reported improved classroom confidence",
  "Over 15,000 books and learning materials distributed",
];

export function EducationProgram() {
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
                alt="Education Program"
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#003d1a]/50 via-[#003d1a]/30 to-[#003d1a]/5 z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <a
              href="/programs"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              ← All Programs
            </a>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> Education Programs
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
              Education Is the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Foundation of Change
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-xl mb-10">
              We believe every child in Ethiopia deserves access to quality
              education. Our programs break down barriers and open doors to
              lasting opportunity.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#009639] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#007a2e] hover:shadow-xl transition-all duration-300"
            >
              Fund Education <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
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

        {/* ── IMPACT NUMBERS ── */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { value: "2,950+", label: "Students Enrolled" },
                { value: "4", label: "Active Programs" },
                { value: "33", label: "Schools & Centers" },
                { value: "85%", label: "Retention Rate" },
              ].map((s, i) => (
                <div key={i} className="py-10 text-center">
                  <p className="text-4xl font-black text-[#009639]">
                    {s.value}
                  </p>
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
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Education Initiatives
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Four focused programs designed to reach every learner, from
                primary school through teacher development.
              </p>
            </div>

            <div className="space-y-10">
              {programs.map((prog, i) => (
                <div
                  key={i}
                  className={`flex flex-col lg:flex-row gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:w-2/5 h-64 lg:h-72 overflow-hidden flex-shrink-0">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex-1">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                      <prog.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="inline-block bg-[#009639]/10 text-[#009639] text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {prog.status}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {prog.title}
                    </h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      {prog.description}
                    </p>
                    <div className="flex gap-6">
                      <div>
                        <p className="font-bold text-gray-900">{prog.reach}</p>
                        <p className="text-xs text-gray-400">Reach</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{prog.sites}</p>
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
        <section className="py-20 bg-emerald-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                Our Impact at a Glance
              </h2>
              <p className="text-gray-500">
                Measured, real, and transformative results.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {outcomes.map((o, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-[#009639] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OTHER PROGRAMS CTA ── */}
        <section className="py-16 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Other Programs
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  href: "/programs?type=health",
                  label: "Health Programs",
                  desc: "School nutrition, clean water, and mental health.",
                },
                {
                  href: "/programs?type=social",
                  label: "Social Support Programs",
                  desc: "Community empowerment and youth skills.",
                },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 hover:border-[#009639] hover:shadow-md transition-all group"
                >
                  <div>
                    <p className="font-bold text-gray-900">{link.label}</p>
                    <p className="text-sm text-gray-500">{link.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#009639] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── DONATE CTA ── */}
        <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Help a Child Learn Today
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Every dollar you give goes directly into books, teachers, and
              technology for Ethiopian children.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
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
