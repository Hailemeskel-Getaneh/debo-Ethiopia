import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Bell,
  BookOpen,
  Calendar,
  Heart,
  Send,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { subscribersService } from "@/services";

const pastIssues = [
  {
    title: "February 2025: Reaching Every Child",
    summary:
      "Our STEM program hits 1,200 students. Clean water borehole #2 drilled in Hawassa. Meet our new Director of Programs.",
    date: "Feb 1, 2025",
    tag: "Latest Issue",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=350&fit=crop",
  },
  {
    title: "January 2025: A New Year, New Goals",
    summary:
      "Year-in-review: 5,000 students served. Launching 3 new projects in 2025. Bahir Dar Solar Project announced.",
    date: "Jan 1, 2025",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop",
  },
  {
    title: "December 2024: Celebrating Milestones",
    summary:
      "50 scholarship girls celebrated at Gondar City Hall. $120,000 raised at the Annual Gala. Thank you from our team.",
    date: "Dec 1, 2024",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=350&fit=crop",
  },
  {
    title: "November 2024: Health First",
    summary:
      "Community Health Fair reaches 2,000+ people. New mental health pilot approved for Harar. Nutrition stats update.",
    date: "Nov 1, 2024",
    tag: null,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=350&fit=crop",
  },
];

const benefits = [
  {
    icon: Bell,
    title: "Latest Updates",
    desc: "Be the first to know about new programs, projects, and events.",
  },
  {
    icon: BookOpen,
    title: "Impact Stories",
    desc: "Real stories from students, families, and communities we serve.",
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    desc: "Never miss a gala, workshop, or fundraiser.",
  },
  {
    icon: Heart,
    title: "Exclusive Insights",
    desc: "Donor reports, behind-the-scenes, and impact data.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await subscribersService.subscribe({ email });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to subscribe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-brand-main/20 selection:text-brand-main">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-20 mesh-gradient">
          <div className="container relative z-10 mx-auto px-6 pt-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center text-center lg:text-left">
              {/* Left: copy */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-8 uppercase tracking-widest font-bold">
                  <Sparkles className="w-4 h-4 text-brand-main" />
                  Monthly Dispatch
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight">
                  Stay Close to the <span className="text-brand-main italic">Impact.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Every month we share one deep-dive story of resilience, program milestones, and upcoming ways to engage. No clutter, just the heart of Debo.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/50 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-main/60" /> Spam-free Guaranteed
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-main/60" /> 2,400+ Active Readers
                  </div>
                </div>
              </motion.div>

              {/* Right: form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-brand-main/20 blur-3xl rounded-full" />
                <div className="relative glass-panel bg-white/95 dark:bg-zinc-900/90 rounded-[3rem] p-10 md:p-14 shadow-premium border border-white/40 dark:border-zinc-800/40">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-10"
                      >
                        <div className="w-20 h-20 bg-brand-main/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                          <CheckCircle2 className="w-10 h-10 text-brand-main" />
                        </div>
                        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                          Welcome, Impact Maker!
                        </h2>
                        <p className="text-zinc-500 max-w-xs mx-auto leading-relaxed">
                          Thank you for joining our community, {name || "friend"}. Check your inbox for our latest stories.
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">Join the Mission</h2>
                          <p className="text-zinc-500 text-sm">Fill in your details to start receiving monthly updates.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="space-y-2">
                            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">Your Full Name</label>
                            <input
                              type="text"
                              placeholder="Tigist Alemu"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-brand-main/20 focus:border-brand-main focus:bg-white dark:focus:bg-zinc-900 transition-all text-zinc-900 dark:text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-brand-main/20 focus:border-brand-main focus:bg-white dark:focus:bg-zinc-900 transition-all text-zinc-900 dark:text-white"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-brand-main text-white font-black py-6 rounded-2xl text-xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-brand-main/20 disabled:opacity-50"
                          >
                            {loading ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <>
                                <Send className="w-5 h-5" /> Start Receiving
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-32 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] p-10 border border-zinc-100 dark:border-zinc-800 hover:border-brand-main/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-main/5 blur-3xl rounded-full group-hover:bg-brand-main/20 transition-all" />
                  <div className="w-16 h-16 bg-brand-main/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-main group-hover:text-white transition-all duration-500">
                    <b.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">{b.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ARCHIVE ── */}
        <section className="py-32 bg-zinc-50 dark:bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-brand-main font-bold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-brand-main/20">The Archive</span>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">Step Into <span className="italic">History.</span></h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {pastIssues.map((issue, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {issue.tag && (
                      <span className="absolute top-6 left-6 bg-brand-main text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {issue.tag}
                      </span>
                    )}
                    <div className="absolute bottom-6 left-6 text-white/60 text-xs font-medium uppercase tracking-[0.2em]">
                      {issue.date}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-lg mb-4 leading-tight group-hover:text-brand-main transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {issue.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="py-32 relative overflow-hidden text-center bg-zinc-950">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-main/5 blur-[120px] rounded-full" />
          <div className="container relative z-10 mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">Can't get enough? <br /> Consider a <span className="text-brand-main">donation.</span></h2>
            <Link to="/donate">
              <button className="btn-action px-12 py-6 rounded-2xl text-xl font-bold flex items-center gap-3 mx-auto shadow-2xl">
                <Heart className="w-6 h-6 fill-current" />
                Support Our Vision
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

