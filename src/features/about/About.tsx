import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Heart,
  Globe,
  Sparkles,
  Award,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { NavBar, Footer } from "@/components";
import { useStats } from "@/hooks/useStats";

const fallbackStats = [
  { label: "Students Served", value: 5000, suffix: "+" },
  { label: "Active Programs", value: 50, suffix: "+" },
  { label: "Project Sites", value: 12, suffix: "+" },
  { label: "Community Partners", value: 100, suffix: "+" },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We care deeply about the communities we serve and approach our work with empathy and genuine concern.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of partnership and working together for greater, lasting impact.",
    gradient: "from-brand-main to-primary-700",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    description:
      "We operate with honesty and complete transparency to our donors and the communities we serve.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Sustainability",
    description:
      "We focus on long-term infrastructure and systems that empower communities to be self-reliant.",
    gradient: "from-blue-500 to-indigo-600",
  },
];

const timeline = [
  {
    year: "2015",
    event:
      "Debo Ethiopia founded in Addis Ababa with a focus on local community development.",
    icon: "🏠",
  },
  {
    year: "2017",
    event: "Launched first education pilot program in 5 rural schools.",
    icon: "📚",
  },
  {
    year: "2019",
    event:
      "Expanded to 3 regional offices; served 1,000+ students for the first time.",
    icon: "🌍",
  },
  {
    year: "2021",
    event: "Implemented the 'Debo' agricultural methodology at scale.",
    icon: "🌾",
  },
  {
    year: "2023",
    event: "Reached 5,000+ students across 25+ partner districts nationwide.",
    icon: "🎓",
  },
];

export function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const { stats } = useStats();

  const heroImages = [
    "/src/assets/images/teachers.jpg",
    "/src/assets/images/teacher.jpg",
    "/src/assets/images/primary_teacher.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <NavBar />
      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentImage]}
                className="w-full h-full object-cover"
                alt="Hero"
              />
              {/* Semi-transparent dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
            </motion.div>
          </AnimatePresence>

          <div className="container relative z-10 mx-auto px-6 pt-32 pb-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#16A34A] text-sm font-bold uppercase tracking-widest mb-8">
                <Sparkles className="w-4 h-4" /> Rooted in Tradition
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Our Story: <span className="text-brand-main">The Debo Way</span>
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-2xl leading-relaxed mb-12">
                Empowering Ethiopian communities through collective action,
                sustainable development, and a commitment to the next
                generation.
              </p>
              <div className="flex gap-4">
                <a
                  href="/donate"
                  className="btn-action px-10 py-5 rounded-2xl text-lg font-bold"
                >
                  Support Our Case
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FLOATING STATS ── */}
        <section className="relative -mt-12 z-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-md shadow-lg p-2 grid grid-cols-2 md:grid-cols-4 border border-gray-200">
              {(stats && stats.length > 0 ? stats : fallbackStats)
                .slice(0, 4)
                .map((stat) => (
                  <div
                    key={"label" in stat ? stat.label : stat.name}
                    className="py-6 px-3 text-center group hover:bg-gray-50 transition-colors rounded-sm"
                  >
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {"suffix" in stat ? stat.suffix || "" : ""}
                      {"+"}
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">
                      {"label" in stat ? stat.label : stat.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* CORE STORY */}
        <section className="py-32 relative overflow-hidden bg-zinc-900">
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#16A34A]/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#16A34A]/10 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-[#16A34A] font-bold uppercase tracking-widest text-sm mb-6">
                  <Award className="w-5 h-5" /> Who We Are
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                  A Mission Born from{" "}
                  <span className="text-[#16A34A] italic underline decoration-zinc-200">
                    Collective Purpose
                  </span>
                </h2>
                <div className="space-y-6 text-xl text-white leading-relaxed">
                  <p className="text-white">
                    Established in 2005, Debo Ethiopia is a non-profit
                    organization dedicated to improving the quality of life for
                    rural Ethiopian communities through holistic development.
                  </p>
                  <p className="text-white">
                    We are guided by the ancient Ethiopian tradition of "Debo" —
                    a culture of communal cooperation where neighbors gather to
                    complete large tasks for the benefit of all.
                  </p>
                  <p className="text-white">
                    Today, we apply this philosophy to education, healthcare,
                    and sustainable agriculture, ensuring that development is
                    locally led and universally beneficial.
                  </p>
                </div>
              </motion.div>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#16A34A] via-[#16A34A] to-transparent opacity-30" />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4 }}
                      className="relative pl-16 group"
                    >
                      {/* Timeline dot with icon */}
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#16A34A] to-[#15803D] flex items-center justify-center shadow-lg z-10 group-hover:scale-110 group-hover:shadow-xl transition-all">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      {/* Year badge */}
                      <div className="absolute left-14 top-1">
                        <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                          {item.year}
                        </span>
                      </div>
                      {/* Card */}
                      <div className="pt-8">
                        <div className="p-5 rounded-xl bg-white shadow-sm border-l-4 border-[#16A34A] hover:shadow-lg hover:border-[#16A34A] transition-all cursor-pointer">
                          <p className="text-base text-gray-900 font-medium leading-relaxed">
                            {item.event}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 bg-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="group p-8 rounded-md bg-gradient-to-br from-[#16A34A] to-green-800 text-white relative overflow-hidden cursor-pointer"
              >
                <Target className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Our Mission
                </h3>
                <p className="text-white/80 leading-relaxed">
                  To empower rural communities through sustainable development
                  that respects local traditions while harnessing modern
                  innovation for a better tomorrow.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="group p-8 rounded-md bg-zinc-800 text-white relative overflow-hidden border border-zinc-700 hover:border-[#16A34A]/50 transition-all"
              >
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-main/10 rounded-full -mr-32 -mb-32 blur-3xl" />
                <Globe className="w-12 h-12 mb-6 text-brand-main opacity-80" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Our Vision
                </h3>
                <p className="text-white leading-relaxed">
                  A resilient Ethiopia where every community has the resources,
                  skills, and infrastructure to build its own flourishing
                  future.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-32">
          <div className="container mx-auto px-6 text-center">
            <span className="text-[#16A34A] font-bold uppercase tracking-wider text-xs mb-4 block">
              Our DNA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              What Drives Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-md ${value.gradient} flex items-center justify-center text-white mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 bg-brand-main relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 to-transparent" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <Heart className="w-20 h-20 text-brand-action mx-auto mb-10 animate-pulse fill-current" />
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">
              Become Part of the Story
            </h2>
            <p className="text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
              Your support empowers thousands of families. Join our mission to
              build a more resilient Ethiopia today.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="/donate"
                className="btn-action px-12 py-6 rounded-2xl text-2xl font-black"
              >
                Support Now
              </a>
              <a
                href="/contact"
                className="px-12 py-6 rounded-2xl border-2 border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
