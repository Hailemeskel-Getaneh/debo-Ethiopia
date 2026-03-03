import { useState, useEffect, useRef } from "react";
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
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, themeColors } = useTheme();
  const heroSlides = [
    {
      image: heroImg,
      title: "Building Stronger Communities Together",
      subtitle:
        "Join us in creating lasting change through sustainable education and health programs.",
    },
    {
      image: imgAbout,
      title: "Empowering Rural Ethiopia",
      subtitle:
        "Harnessing the ancient tradition of 'Debo' to solve modern community challenges.",
    },
    {
      image: imgHero3,
      title: "The Future of Education",
      subtitle:
        "More than 200 scholarship students are carving their path to success through your support.",
    },
    {
      image: loginBg,
      title: "Holistic Community Growth",
      subtitle:
        "Advancing education, health, clean water, and environmental sustainability in rural Ethiopia.",
    },
  ];

  const { stats, loading: statsLoading } = useStats();
  // useStats();
  // usePrograms();
  useProjects();
  const { news } = useNews();
  const { upcoming: upcomingEvents, loading: eventsLoading } = useEvents();

  const impactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div
      className={`min-h-screen ${themeColors[theme]} dark:bg-zinc-950 font-sans selection:bg-brand-main/20 selection:text-brand-main`}
    >
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-brand-main animate-pulse" />
                Empowering Ethiopia Since 2005
              </motion.span>

              <h1 className="text-white text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-8 text-balance">
                {heroSlides[activeSlide].title
                  .split("Communities")
                  .map((t, i) =>
                    i === 0 ? (
                      t
                    ) : (
                      <span key={i} className="text-brand-main">
                        Communities
                      </span>
                    ),
                  )}
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
                    <Heart className="w-5 h-4 fill-current" />
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
                  className={`h-1.5 rounded-full transition-all duration-500 ${activeSlide === i ? "w-12 bg-brand-main" : "w-6 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Scroll
              </span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </section>

        {/* ── FLOATING STATS ── */}
        <section className="relative -mt-12 z-10 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-md shadow-lg p-2 grid grid-cols-2 md:grid-cols-4 border border-gray-200"
            >
              {(stats && stats.length > 0 ? stats : fallbackStats)
                .slice(0, 4)
                .map((stat, i) => (
                  <div
                    key={i}
                    className="py-6 px-3 text-center group hover:bg-gray-50 transition-colors rounded-sm"
                  >
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">
                      {"label" in stat
                        ? stat.label
                        : (stat as { name: string }).name}
                    </p>
                  </div>
                ))}
            </motion.div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="py-32 relative overflow-hidden bg-zinc-900">
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-main/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-action/20 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="text-brand-main font-bold uppercase tracking-widest text-sm mb-6 block">
                  Our Heart & Mission
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                  Driven by{" "}
                  <span className="text-brand-main italic">
                    Ancient Traditions,
                  </span>{" "}
                  Focused on Tomorrow.
                </h2>
                <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                  Established in 2005, Debo Ethiopia is a non-profit dedicated
                  to improving life in rural Ethiopia. We are guided by "Debo" —
                  the communal culture of working together for the greater good.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    {
                      title: "Locally Led",
                      desc: "Our projects originate from and are managed by the communities themselves.",
                    },
                    {
                      title: "Sustainable Growth",
                      desc: "We focus on long-term infrastructure and self-reliant systems.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-12 h-12 rounded-md bg-brand-main/20 flex items-center justify-center shrink-0">
                        <Target className="text-brand-main w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-zinc-400">{item.desc}</p>
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
                <div className="absolute inset-0 bg-brand-main/30 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0" />
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium">
                  <img
                    src={imgAbout}
                    className="w-full h-full object-cover"
                    alt="About"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <Award className="w-12 h-12 mb-4 text-brand-main" />
                    <h5 className="text-3xl font-bold mb-2">Impact First</h5>
                    <p className="opacity-80">
                      Serving 12+ Districts in rural Ethiopia
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-main/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-action/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-main/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-main" />
                  </div>
                  <span className="text-brand-action font-bold uppercase tracking-widest text-xs">
                    Mark Your Calendar
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight text-balance">
                  Upcoming Community{" "}
                  <span className="text-brand-main">Events</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg">
                  Join us at our upcoming gatherings and be part of the Debo
                  movement
                </p>
              </div>
              <Link to="/events">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-xl border-zinc-200 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 gap-2"
                >
                  Explore All Events
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Events Grid - Different Layout */}
            {eventsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-64 rounded-3xl bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
                  />
                ))}
              </div>
            ) : upcomingEvents?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.slice(0, 6).map((event, i) => {
                  const eventImage = event.images?.[0]?.image;
                  const eventDate = new Date(event.start_date);
                  const today = new Date();
                  const daysUntil = Math.ceil(
                    (eventDate.getTime() - today.getTime()) /
                      (1000 * 60 * 60 * 24),
                  );

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4 }}
                      className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-brand-main/30 hover:shadow-xl hover:shadow-brand-main/5 transition-all duration-300"
                    >
                      {/* Image Section */}
                      <div className="aspect-[16/9] overflow-hidden relative">
                        {eventImage ? (
                          <img
                            src={eventImage}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "";
                              (e.target as HTMLImageElement).className =
                                "hidden";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-main/20 to-brand-action/20" />
                        )}

                        {/* Date Badge - Top Right */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="glass-panel px-4 py-2 rounded-2xl border-white/20 backdrop-blur-sm">
                            <span className="text-[9px] font-black text-brand-main uppercase tracking-wider block text-center">
                              {eventDate.toLocaleDateString("en-US", {
                                month: "short",
                              })}
                            </span>
                            <span className="text-xl font-black text-zinc-900 dark:text-white leading-none block text-center">
                              {eventDate.getDate()}
                            </span>
                          </div>
                        </div>

                        {/* Countdown Badge - Top Left */}
                        {daysUntil > 0 && daysUntil <= 30 && (
                          <div className="absolute top-4 left-4 z-10">
                            <div className="bg-brand-main text-white px-3 py-1.5 rounded-full text-xs font-bold">
                              {daysUntil === 1
                                ? "Tomorrow!"
                                : `In ${daysUntil} days`}
                            </div>
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-1 rounded-full bg-brand-main" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            {event.category || "Community Event"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-main transition-colors">
                          {event.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-col gap-2 text-xs text-zinc-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-brand-main/70" />
                            <span>
                              {eventDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-brand-main/70" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                          <Link
                            to="/events"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white group/btn hover:text-brand-main transition-colors"
                          >
                            <span>Get Details</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/40 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800">
                <Calendar className="w-14 h-14 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-400 dark:text-zinc-600">
                  No upcoming events
                </h3>
                <p className="text-zinc-500 mt-2">
                  Check back soon for new community gatherings!
                </p>
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
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Your Generosity, <br /> Their Opportunity
              </h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Every contribution, no matter the size, directly funds
                scholarship students, medical clinics, and agricultural tools in
                rural Ethiopia.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {["$25", "$50", "$100", "$250"].map((amt) => (
                  <button
                    key={amt}
                    className="min-w-[100px] px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all active:scale-95"
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <Link to="/donate">
                <Button
                  size="lg"
                  className="btn-action px-12 py-8 rounded-[2rem] text-2xl font-black shadow-2xl"
                >
                  Start Making Impact
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* LATEST NEWS */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-action/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-action" />
                  </div>
                  <span className="text-brand-action font-bold uppercase tracking-widest text-xs">
                    Stay Informed
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight text-balance">
                  Voices of <span className="text-brand-action">Debo</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg">
                  Latest updates, stories and impact from our community
                </p>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-brand-action font-semibold hover:gap-3 transition-all"
              >
                Visit Newsroom <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* News Grid - Events Card Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(news || []).slice(0, 3).map((item, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white dark:bg-zinc-900 rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-brand-action/30 hover:shadow-xl hover:shadow-brand-action/5 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-brand-action text-white text-xs font-bold uppercase tracking-wider">
                      {item.category || "Updates"}
                    </span>
                    <img
                      src={imgHero4}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="News"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs text-zinc-500 font-medium">
                        {item.date || "March 1, 2026"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-action transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-5">
                      {item.excerpt || item.description?.substring(0, 100)}
                    </p>

                    {/* Action Button */}
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold py-3 rounded-xl group/link hover:bg-brand-action hover:text-white transition-all"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
