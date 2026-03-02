import { motion } from "framer-motion";
import { Mail, Linkedin, Users, Star, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const board = [
  {
    name: "Dr. Abebe Haile",
    role: "Board Chair",
    bio: "Former educator with 25 years of experience in international development and educational reform.",
    image: "/src/assets/images/teacher.jpg",
    email: "abebe@deboethiopia.org",
  },
  {
    name: "Tigist Alemu",
    role: "Vice Chair",
    bio: "Technology entrepreneur and passionate advocate for STEM education and gender equity in Africa.",
    image: "/src/assets/images/teachers.jpg",
    email: "tigist@deboethiopia.org",
  },
  {
    name: "Solomon Tekle",
    role: "Treasurer",
    bio: "Financial executive with deep expertise in non-profit management and impact investing.",
    image: "/src/assets/images/primary_teacher.jpg",
    email: "solomon@deboethiopia.org",
  },
  {
    name: "Meseret Kebede",
    role: "Secretary",
    bio: "Education policy specialist, community organizer, and champion of girls' education in rural Ethiopia.",
    image: "/src/assets/images/Grade_9.jpg",
    email: "meseret@deboethiopia.org",
  },
];

const leadership = [
  {
    name: "Yohannes Desta",
    role: "Executive Director",
    bio: "Leading DeboEthiopia with vision and passion for educational equity, Yohannes brings 15 years of NGO leadership experience.",
    image: "/src/assets/images/IMG_20231210_135056.jpg",
    email: "yohannes@deboethiopia.org",
  },
  {
    name: "Hirut Tadesse",
    role: "Director of Programs",
    bio: "Overseeing all educational programs and ensuring quality delivery across Ethiopia's diverse communities.",
    image: "/src/assets/images/IMG_20231206_144403.jpg",
    email: "hirut@deboethiopia.org",
  },
  {
    name: "Dawit Gebru",
    role: "Director of Operations",
    bio: "Managing field operations and regional partnerships to ensure our mission reaches every corner of the country.",
    image: "/src/assets/images/IMG_20231213_150540.jpg",
    email: "dawit@deboethiopia.org",
  },
];

const advisors = [
  {
    name: "Prof. Almaz Gebre",
    org: "Addis Ababa University",
    domain: "Education Policy",
  },
  {
    name: "Dr. Selamawit Bekele",
    org: "World Bank Group",
    domain: "International Development",
  },
  {
    name: "Biruk Asfaw",
    org: "Tech4Dev Foundation",
    domain: "Technology & Innovation",
  },
  {
    name: "Firehiwot Mulugeta",
    org: "UNICEF Ethiopia",
    domain: "Child Rights & Welfare",
  },
  {
    name: "Dr. Habtamu Girma",
    org: "Harvard Extension",
    domain: "Education Research",
  },
  {
    name: "Mulu Bekele",
    org: "African Development Bank",
    domain: "Philanthropy & Finance",
  },
];

function MemberCard({
  member,
}: {
  member: (typeof board)[0];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-zinc-900 rounded-[3.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-premium transition-all duration-700 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden relative shrink-0">
        <div className="absolute inset-0 bg-zinc-950">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-70 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
        </div>

        {/* Social Links on Hover */}
        <div className="absolute top-8 right-8 z-20 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <a
            href={`mailto:${member.email}`}
            className="w-12 h-12 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-brand-main hover:text-white transition-all shadow-xl"
          >
            <Mail className="w-5 h-5" />
          </a>
          <button
            className="w-12 h-12 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-brand-main hover:text-white transition-all shadow-xl"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="absolute bottom-6 left-8 z-20">
          <span className="px-5 py-2 rounded-full glass-card border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-10 flex-col flex flex-1">
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 leading-tight group-hover:text-brand-main transition-colors">
          {member.name}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed line-clamp-4">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function BoardLeadership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 selection:bg-brand-main/30">
      <NavBar />

      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/50 to-zinc-50 dark:via-zinc-950/50 dark:to-zinc-950" />

          <div className="relative container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
            >
              <Users className="w-3.5 h-3.5 text-brand-main" /> The Architects of Change
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-zinc-950 dark:text-white mb-8 tracking-tighter"
            >
              Visionary <span className="text-brand-main">Leadership</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Our governance and executive teams bring decades of expertise and a shared commitment to building a more equitable Ethiopia.
            </motion.p>
          </div>
        </section>

        {/* ── BOARD OF DIRECTORS ── */}
        <section className="pb-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-16 border-b border-zinc-100 dark:border-zinc-800 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-main/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-brand-main" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Board of Directors</h2>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">Foundational Governance</p>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              {board.map((member, i) => (
                <MemberCard key={i} member={member} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── LEADERSHIP TEAM ── */}
        <section className="py-32 relative bg-zinc-100 dark:bg-zinc-900/40">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-main/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-main" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Leadership Team</h2>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">Operational Excellence</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {leadership.map((member, i) => (
                <MemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ADVISORY COUNCIL ── */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-24">
              <div className="w-16 h-16 rounded-3xl bg-brand-main/10 flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-brand-main" />
              </div>
              <h2 className="text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">Advisory Council</h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium">
                Global experts providing strategic insight and specialized guidance to amplify our impact across diverse domains.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisors.map((advisor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-premium hover:border-brand-main/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-main/20 via-brand-main/10 to-transparent flex items-center justify-center text-brand-main font-black text-xl border border-brand-main/10 group-hover:scale-110 transition-transform">
                      {advisor.name.split(" ").filter((_, i2) => i2 < 2).map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-1 group-hover:text-brand-main transition-colors">
                        {advisor.name}
                      </h3>
                      <p className="text-xs font-black text-brand-main uppercase tracking-widest mb-1.5 opacity-70">
                        {advisor.domain}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{advisor.org}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN CTA ── */}
        <section className="py-32 bg-brand-main relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-20" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Shape the Future Together</h2>
              <p className="text-white/80 text-lg md:text-xl mb-16 font-medium leading-relaxed">
                We are constantly looking for visionary leaders and passionate experts to join our ecosystem.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="/contact"
                  className="bg-white text-zinc-950 font-black px-12 py-6 rounded-3xl text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3"
                >
                  Join Our Team <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

