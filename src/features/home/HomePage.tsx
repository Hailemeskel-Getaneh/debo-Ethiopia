import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowRight,
  BookOpen,
  Stethoscope,
  Sprout,
  Users,
  ChevronDown,
  Target,
  Leaf,
  GraduationCap,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import heroImg from "@/assets/images/Grade_9.jpg";
import imgAbout from "@/assets/images/IMG_20231104_083345.jpg";

const heroBg = heroImg;

const stats = [
  { value: "200+", label: "Scholarship Students Supported" },
  { value: "150+", label: "Students Achieved Graduation" },
  { value: "10+", label: "Projects Successfully Completed" },
  { value: "4", label: "Active Programs Running" },
];

const programs = [
  {
    icon: BookOpen,
    title: "Education for All",
    desc: "Providing quality education through scholarships for 200+ students, 8 kindergarten classrooms, and fully equipped libraries and science labs in rural villages.",
    color: "bg-brand-secondary/10 text-brand-secondary",
    href: "/programs/1",
  },
  {
    icon: Stethoscope,
    title: "Community Health",
    desc: "Building health infrastructure and delivering essential healthcare services to remote communities.",
    color: "bg-brand-main/10 text-brand-main",
    href: "/programs/2",
  },
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    desc: "Empowering farmers with modern techniques, tools, and market access to end food insecurity.",
    color: "bg-brand-action/10 text-brand-action",
    href: "/programs/3",
  },
  {
    icon: Users,
    title: "Women Empowerment",
    desc: "Supporting women entrepreneurs through microfinance, training, and community networks.",
    color: "bg-brand-secondary/10 text-brand-secondary",
    href: "/programs/4",
  },
];

const projects = [
  {
    title: "School Building Construction Project",
    category: "Education",
    status: "Active",
    progress: 45,
    location: "mehalmeda",
  },
  {
    title: "Buy Books for Rural Students",
    category: "Education",
    status: "Active",
    progress: 80,
    location: "Multiple Districts",
  },
  {
    title: "Student Scholarship Support Program",
    category: "Education",
    status: "Active",
    progress: 65,
    location: "",
  },
  {
    title: "Digital Library Setup",
    category: "Education",
    status: "Active",
    progress: 0,
    location: "MM",
  },
  {
    title: "Classroom Furniture Supply",
    category: "Education",
    status: "Completed",
    progress: 100,
    location: "MM",
  },
];

const news = [
  {
    date: "Jan 15, 2026",
    title: "Debo Ethiopia Opens New Learning Center in Jimma",
    excerpt:
      "A state-of-the-art learning center serving 500 students opens its doors to the community.",
    category: "Education",
  },
  {
    date: "Dec 28, 2025",
    title: "Annual Impact Report 2025: 12,000 New Beneficiaries",
    excerpt:
      "Our 2025 annual report highlights remarkable growth and community transformation across all programs.",
    category: "Impact",
  },
  {
    date: "Dec 10, 2025",
    title: "Partnership with UN FAO to Expand Agricultural Programs",
    excerpt:
      "A landmark partnership will triple our agricultural support to smallholder farmers in southern Ethiopia.",
    category: "Partnership",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    heroBg,
    imgAbout,
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520645607147-797cdb05d2e7?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main id="main-content">

        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="Ethiopian community students and children engaged in educational and social activities"
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 z-10" />
          </div>
          <div className="relative z-20 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-action/20 text-brand-action border border-brand-action/40 text-sm font-body font-medium mb-6 backdrop-blur-sm">
                Empowering Ethiopian Communities Since 2005
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight">
                Building Stronger
                <br />
                <span className="text-brand-action">Communities</span> Together
              </h1>
              <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Debo Ethiopia works alongside communities to create lasting change
                through education, health, agriculture, and sustainable
                development programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/donate">
                  <Button
                    size="lg"
                    className="bg-linear-to-b from-brand-action to-brand-action/90 text-white font-semibold font-body gap-2 hover:opacity-90 hover:scale-105 transition-all shadow-lg px-8"
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-body gap-2 backdrop-blur-sm px-8"
                  >
                    Our Programs
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
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

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </section>

        {/* STATS */}
        <section className="py-14 bg-linear-to-r from-brand-main to-primary-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map(({ value, label }) => (
                <motion.div key={label} variants={fadeUp} className="text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1">
                    {value}
                  </div>
                  <div className="font-body text-sm text-white/70 uppercase tracking-wider">
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT SUMMARY */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="inline-block text-xs font-body font-semibold text-brand-action uppercase tracking-widest mb-3">
                  About Debo Ethiopia
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  The Spirit of{" "}
                  <span className="text-brand-main">Collective Action</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Established in 2005, Debo Ethiopia is a non-profit,
                  non-governmental organization (NGO) dedicated to improving the
                  quality of life for communities in rural Ethiopia through
                  holistic and sustainable development.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  We deliver essential services that address the root causes of
                  poverty and inequality, guided by the ancient Ethiopian
                  tradition of "Debo" — communal cooperation for the greater good.
                </p>
                <Link to="/about">
                  <Button className="bg-linear-to-r from-brand-main to-primary-700 text-white font-body gap-2 hover:opacity-90">
                    Learn Our Story
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={imgAbout}
                    alt="Community members"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-linear-to-br from-brand-main to-primary-700 p-8 rounded-3xl shadow-xl shadow-primary-700/20 hidden lg:block hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white font-display text-2xl font-bold">
                      Impact First
                    </p>
                  </div>
                  <p className="text-white/80 text-sm">
                    Community-led development
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Importance Section */}
        <section className="py-24 bg-zinc-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.span
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="inline-block text-xs font-body font-semibold text-brand-action uppercase tracking-widest mb-3"
              >
                Our Purpose
              </motion.span>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold text-zinc-900 mb-6"
              >
                Why Our Work <span className="text-brand-main">Matters</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-body text-zinc-600 text-lg leading-relaxed"
              >
                We operate with a community-centered participatory model. By
                respecting local knowledge and priorities, we ensure local people
                are actively involved in identifying challenges and planning
                solutions.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Target,
                  title: "Empowerment",
                  desc: "We don't just provide aid; we empower individuals to lead their own communities through knowledge and skills.",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  desc: "Our focus is on infrastructure and systems that last for generations, ensuring long-term self-reliance.",
                },
                {
                  icon: GraduationCap,
                  title: "Education",
                  desc: "We believe education is the primary tool to break the cycle of poverty and open doors to a better life.",
                },
                {
                  icon: Users2,
                  title: "Collective Action",
                  desc: "By harnessing the power of community, we solve local challenges with locally-led, evidence-based solutions.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-white flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-brand-main" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-zinc-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-body font-semibold text-brand-action uppercase tracking-widest mb-3">
                What We Do
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Core Programs
              </h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                Four pillars of community transformation designed for lasting,
                measurable impact.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {programs.map(({ icon: Icon, title, desc, color, href }) => (
                <motion.div key={title} variants={fadeUp}>
                  <Link
                    to={href}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-zinc-900 mb-2">
                      {title}
                    </h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed flex-1">
                      {desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-brand-main text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-10">
              <Link to="/programs">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body"
                >
                  View All Programs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-body font-semibold text-brand-action uppercase tracking-widest mb-3">
                Active Work
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Featured Projects
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6"
            >
              {projects.map(({ title, category, status, progress, location }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-brand-main/10 text-brand-main">
                      {category}
                    </span>
                    <span
                      className={`text-xs font-body font-medium ${status === "Completed" ? "text-brand-action" : "text-brand-secondary"}`}
                    >
                      ● {status}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-zinc-900 mb-1">
                    {title}
                  </h3>
                  <p className="font-body text-xs text-zinc-500 mb-4">
                    {location}
                  </p>
                  <div className="w-full bg-zinc-100 rounded-full h-2 mb-1">
                    <div
                      className="bg-linear-to-r from-brand-main to-primary-700 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="font-body text-xs text-zinc-500 text-right">
                    {progress}% Complete
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-10">
              <Link to="/projects">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* DONATION CTA */}
        <section className="py-20 bg-linear-to-r from-brand-main to-primary-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Your Gift Changes Lives
              </h2>
              <p className="font-body text-white/80 text-lg max-w-xl mx-auto mb-10">
                Every birr, every dollar, every act of generosity creates real
                change for Ethiopian families.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {["$25", "$50", "$100", "$250", "Custom"].map((amt) => (
                  <button
                    key={amt}
                    className="px-6 py-3 rounded-xl border-2 border-white/40 text-white font-body font-semibold hover:bg-white/20 transition-colors"
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <Link to="/donate">
                <Button
                  size="lg"
                  className="bg-linear-to-b from-brand-action to-brand-action/90 text-white font-semibold font-body gap-2 hover:opacity-90 hover:scale-105 transition-all shadow-lg px-10"
                >
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* NEWS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
            >
              <div>
                <span className="inline-block text-xs font-body font-semibold text-brand-action uppercase tracking-widest mb-2">
                  Stay Informed
                </span>
                <h2 className="font-display text-4xl font-bold text-foreground">
                  Latest News
                </h2>
              </div>
              <Link to="/news" className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  className="border-primary text-primary font-body gap-2"
                >
                  All Articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6"
            >
              {news.map(({ date, title, excerpt, category }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 bg-linear-to-br from-brand-main to-primary-700 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/40" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-brand-action/10 text-brand-action font-body font-medium">
                        {category}
                      </span>
                      <span className="text-xs text-zinc-500 font-body">
                        {date}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-zinc-900 mb-2 leading-snug group-hover:text-brand-main transition-colors">
                      {title}
                    </h3>
                    <p className="font-body text-sm text-zinc-600 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
