import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowRight,
  ChevronDown,
  Target,
  Award,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Assets
import heroImg from "@/assets/images/Grade_9.jpg";
import imgAbout from "@/assets/images/IMG_20231104_083345.jpg";
import imgHero3 from "@/assets/images/teachers.jpg";
import imgHero4 from "@/assets/images/G 12.jpg";
import loginBg from "@/assets/images/login-bg.png";

// Hooks for API data
import { useStats } from "@/hooks/useStats";
// import { usePrograms } from "@/hooks/usePrograms";
import { useProjects } from "@/hooks/useProjects";
import { useNews } from "@/hooks/useNews";
import { useEvents } from "@/hooks/useEvents";

const fallbackStats = [
  { value: "200+", label: "Scholarship Students" },
  { value: "150+", label: "Graduated Students" },
  { value: "10+", label: "Active Project Sites" },
  { value: "12k", label: "Lives Impacted" },
];




const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "circOut" as const },
  },
};

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    {
      image: heroImg,
      title: "Building Stronger Communities Together",
      subtitle: "Join us in creating lasting change through sustainable education and health programs.",
    },
    {
      image: imgAbout,
      title: "Empowering Rural Ethiopia",
      subtitle: "Harnessing the ancient tradition of 'Debo' to solve modern community challenges.",
    },
    {
      image: imgHero3,
      title: "The Future of Education",
      subtitle: "More than 200 scholarship students are carving their path to success through your support.",
    },
    {
      image: loginBg,
      title: "Holistic Community Growth",
      subtitle: "Advancing education, health, clean water, and environmental sustainability in rural Ethiopia.",
    },
  ];

  const { stats, loading: statsLoading } = useStats();
  // useStats();
  // usePrograms();
  useProjects();
  const { news } = useNews();
  const { upcoming: upcomingEvents, loading: eventsLoading } = useEvents();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-brand-main/20 selection:text-brand-main">
      <NavBar />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
          {/* All slides always mounted — pure CSS opacity crossfade, no white flash */}
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === activeSlide ? 1 : 0 }}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="Banner"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/70" />
            </div>
          ))}

          <div className="container relative z-10 mx-auto px-6 pt-32 pb-40">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-4xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-white text-sm font-medium mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-brand-main animate-pulse" />
                Empowering Ethiopia Since 2005
              </motion.span>

              <h1 className="text-white text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-8 text-balance">
                {heroSlides[activeSlide].title.split('Communities').map((t, i) => i === 0 ? t : <span key={i} className="text-brand-main">Communities</span>)}
              </h1>

              <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed">
                {heroSlides[activeSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/donate">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-action px-10 py-5 rounded-2xl text-lg font-bold flex items-center gap-3"
                  >
                    <Heart className="w-6 h-6 fill-current" />
                    Donate Now
                  </motion.button>
                </Link>
                <Link to="/programs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-panel px-10 py-5 rounded-2xl text-lg font-bold text-white border-white/20 hover:bg-white/10 flex items-center gap-2"
                  >
                    Explore Impact
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-6 right-6 hidden md:flex items-end justify-between z-20">
            <div className="flex gap-4">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${activeSlide === i ? 'w-12 bg-brand-main' : 'w-6 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="relative -mt-24 z-30 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 glass-panel rounded-[2.5rem]"
            >
              {statsLoading ? (
                // Skeleton loading for stats
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-zinc-200/20 dark:bg-zinc-800/20 animate-pulse h-32" />
                ))
              ) : (stats && stats.length > 0 ? stats : fallbackStats).slice(0, 4).map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-white/40 dark:border-zinc-800/40 text-center group"
                >
                  <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 font-heading tracking-tight group-hover:text-brand-main transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
                    {'label' in stat ? stat.label : (stat as any).name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="py-32 relative overflow-hidden mesh-gradient">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-brand-action font-bold uppercase tracking-widest text-sm mb-6 block">Our Heart & Mission</span>
                <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                  Driven by <span className="text-brand-main italic">Ancient Traditions,</span> Focused on Tomorrow.
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  Established in 2005, Debo Ethiopia is a non-profit dedicated to improving life in rural Ethiopia. We are guided by "Debo" — the communal culture of working together for the greater good.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    { title: "Locally Led", desc: "Our projects originate from and are managed by the communities themselves." },
                    { title: "Sustainable Growth", desc: "We focus on long-term infrastructure and self-reliant systems." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-main/10 flex items-center justify-center shrink-0">
                        <Target className="text-brand-main w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/about">
                  <Button className="btn-gradient px-8 py-6 rounded-2xl text-lg font-bold group">
                    Our Full Story
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-brand-main/20 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0" />
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium">
                  <img src={imgAbout} className="w-full h-full object-cover" alt="About" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <Award className="w-12 h-12 mb-4 text-brand-main" />
                    <h5 className="text-3xl font-bold mb-2">Impact First</h5>
                    <p className="opacity-80">Serving 12+ Districts in rural Ethiopia</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="py-32 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-main/5 blur-[120px] rounded-full" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <span className="text-brand-main font-bold uppercase tracking-widest text-sm mb-6 block">Join Us In Person</span>
                <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight text-balance">
                  Upcoming Community <br /> Events
                </h2>
              </div>
              <Link to="/events">
                <Button variant="outline" className="px-8 py-6 rounded-2xl border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  View All Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {eventsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[450px] rounded-[3rem] bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
                ))}
              </div>
            ) : upcomingEvents?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {upcomingEvents.slice(0, 3).map((event, i) => {
                  const eventImage = event.images?.[0]?.image;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="group relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl hover:shadow-brand-main/20 transition-all duration-700"
                    >
                      {/* Background Layer */}
                      <div className="absolute inset-0 bg-zinc-950">
                        {eventImage ? (
                          <img
                            src={eventImage}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = ""; // Force fallback on error
                              (e.target as HTMLImageElement).className = "hidden";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full mesh-gradient opacity-30 group-hover:opacity-20 transition-opacity" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
                      </div>

                      {/* Floating Date Badge */}
                      <div className="absolute top-10 left-10 z-30">
                        <div className="glass-panel px-5 py-3 rounded-2xl border-white/20 flex flex-col items-center">
                          <span className="text-[10px] font-black text-brand-main uppercase tracking-[0.3em] mb-1">
                            {new Date(event.start_date).toLocaleDateString("en-US", { month: "short" })}
                          </span>
                          <span className="text-3xl font-black text-white leading-none">
                            {new Date(event.start_date).getDate()}
                          </span>
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-main shadow-[0_0_10px_#009639]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                              {event.category || "Community Gathering"}
                            </span>
                          </div>

                          <h3 className="text-4xl font-black text-white tracking-tight group-hover:text-brand-main transition-colors leading-[1.1]">
                            {event.title}
                          </h3>

                          <div className="flex flex-col gap-3 text-white/50 text-sm font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                <Clock className="w-4 h-4 text-brand-main" />
                              </div>
                              {new Date(event.start_date).toLocaleTimeString("en-US", {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                <MapPin className="w-4 h-4 text-brand-main" />
                              </div>
                              {event.location}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-white/10">
                            <Link
                              to="/events"
                              className="inline-flex items-center gap-4 group/btn"
                            >
                              <span className="text-white font-black text-lg group-hover/btn:text-brand-main transition-colors">
                                View Full Details
                              </span>
                              <div className="w-12 h-12 rounded-full bg-brand-main text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-all">
                                <ArrowRight className="w-6 h-6" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-100 dark:bg-zinc-900/40 rounded-[3rem] border border-dashed border-zinc-300 dark:border-zinc-800">
                <Calendar className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">No upcoming events scheduled</h3>
                <p className="text-zinc-500 mt-2">Check back soon for new community gatherings!</p>
              </div>
            )}
          </div>
        </section>


        {/* DONATION BANNER */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-linear-to-br from-primary-600 to-primary-900" />
          <div className="absolute inset-0 dot-pattern" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Heart className="w-20 h-20 text-brand-action mx-auto mb-10 fill-current animate-pulse" />
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Your Generosity, <br /> Their Opportunity</h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Every contribution, no matter the size, directly funds scholarship students, medical clinics, and agricultural tools in rural Ethiopia.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {['$25', '$50', '$100', '$250'].map(amt => (
                  <button key={amt} className="min-w-[100px] px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all active:scale-95">
                    {amt}
                  </button>
                ))}
              </div>
              <Link to="/donate">
                <Button size="lg" className="btn-action px-12 py-8 rounded-[2rem] text-2xl font-black shadow-2xl">
                  Start Making Impact
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* LATEST NEWS */}
        <section className="py-32 bg-zinc-50 dark:bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-20">
              <h2 className="text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">Voices of Debo</h2>
              <Link to="/news" className="text-brand-main font-bold flex items-center gap-2 hover:gap-3 transition-all">
                The Newsroom <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {(news || []).slice(0, 3).map((item, i) => (
                <motion.article
                  key={i}
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-premium transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-1.5 rounded-full glass-card text-white text-xs font-bold uppercase tracking-widest">
                        {item.category || "Updates"}
                      </span>
                    </div>
                    <img src={imgHero4} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" alt="News" />
                  </div>
                  <div className="p-10">
                    <span className="text-zinc-400 text-sm mb-4 block font-medium">{item.date || "March 1, 2026"}</span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 leading-snug group-hover:text-brand-main transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-8">
                      {item.excerpt || item.description?.substring(0, 100)}
                    </p>
                    <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold group/link">
                      Read Story
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover/link:bg-brand-main group-hover/link:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

