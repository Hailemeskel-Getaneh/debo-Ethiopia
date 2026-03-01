import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Eye,
  Heart,
  BookOpen,
  Globe,
  Sparkles,
  ArrowRight,
  Mail,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

/* ── Animated counter sub-component (avoids hook-in-map) ── */
function StatItem({
  value,
  suffix,
  label,
  visible,
}: {
  value: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;
    const duration = 1000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);

  return (
    <div className="text-center">
      <div className="text-5xl font-black text-[#009639] mb-1 tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

/* ── Data ── */
const stats = [
  { label: "Students Served", value: 5000, suffix: "+" },
  { label: "Active Programs", value: 50, suffix: "+" },
  { label: "Partner Schools", value: 25, suffix: "+" },
  { label: "Volunteers", value: 100, suffix: "+" },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We care deeply about the communities we serve and approach our work with empathy and genuine concern.",
    colorClass: "text-[#009639]",
    bgClass: "bg-[#009639]/10",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of partnership and working together for greater, lasting impact.",
    colorClass: "text-[#009639]",
    bgClass: "bg-[#009639]/10",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest quality in all our educational programs and community services.",
    colorClass: "text-[#009639]",
    bgClass: "bg-[#009639]/10",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We operate with honesty and accountability to our donors, partners, and communities.",
    colorClass: "text-[#009639]",
    bgClass: "bg-[#009639]/10",
  },
];

const timeline = [
  {
    year: "2015",
    event:
      "DeboEthiopia founded in Addis Ababa with a small group of passionate educators.",
  },
  {
    year: "2017",
    event: "Launched first STEM education pilot program in 5 schools.",
  },
  {
    year: "2019",
    event:
      "Expanded to 3 regional offices; served 1,000+ students for the first time.",
  },
  {
    year: "2021",
    event:
      "Partnered with international organizations to scale digital literacy programs.",
  },
  {
    year: "2023",
    event: "Reached 5,000+ students across 25+ partner schools nationwide.",
  },
];

/* ── Main Component ── */
export function About() {
  const impactRef = useRef<HTMLDivElement>(null);
  const [impactVisible, setImpactVisible] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setImpactVisible(true);
      },
      { threshold: 0.3 },
    );
    if (impactRef.current) observer.observe(impactRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
          {/* Background */}
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="Students and community members participating in DeboEthiopia educational programs"
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a]/50 via-[#005c28]/30 to-[#009639]/5 z-10" />
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl z-10" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#00b359]/10 blur-3xl z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#00b359]" />
                Transforming lives through education
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009639] to-[#00b359]">
                  DeboEthiopia
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
                A non-profit organization dedicated to transforming lives
                through education, innovation, and community empowerment in
                Ethiopia — one child at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/BoardLeadership"
                  className="inline-flex items-center gap-2 bg-white text-[#009639] font-semibold px-6 py-3 rounded-full hover:bg-[#00b359] hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Meet Our Team <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Support Our Mission
                </a>
              </div>
            </div>
          </div>

          {/* Floating image card — desktop only */}
          <div className="absolute z-20 right-8 top-1/2 -translate-y-1/2 hidden xl:block w-80">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/src/assets/images/IMG_20231206_144403.jpg"
                alt="Ethiopian students"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold">Building Futures</p>
                <p className="text-sm text-white/70">Ethiopia, 2024</p>
              </div>
            </div>
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

        {/* ── IMPACT STATS ── */}
        <section ref={impactRef} className="py-16 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  visible={impactVisible}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <div className="flex items-center gap-2 text-[#009639] font-semibold uppercase tracking-widest text-sm mb-4">
                  <BookOpen className="w-5 h-5" /> Our Story
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  A Mission Born from <br />
                  <span className="text-[#009639]">Purpose & Passion</span>
                </h2>
                <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                  DeboEthiopia was founded with a simple yet powerful vision: to
                  ensure every child in Ethiopia has access to quality education
                  and the opportunity to reach their full potential.
                </p>
                <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                  Since our inception, we've grown from a small grassroots
                  initiative to a comprehensive educational organization serving
                  thousands of students across Ethiopia's diverse regions.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we work with local communities, schools, and global
                  partners to provide educational resources, technology
                  training, scholarships, and mentorship programs.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#009639] to-[#00b359]" />
                <div className="space-y-8">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#009639] to-[#007a2e] flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs font-bold">
                          {item.year.slice(2)}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <p className="text-xs font-bold text-[#009639] mb-1">
                          {item.year}
                        </p>
                        <p className="text-sm text-gray-700">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Our Purpose
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Guided by a clear mission and an inspiring vision.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#009639] to-[#007a2e] text-white p-10 shadow-xl">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-6 w-48 h-48 rounded-full bg-white/5" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    To empower Ethiopian children and youth through accessible,
                    quality education and innovative technology programs that
                    foster critical thinking, creativity, and leadership skills
                    for a brighter future.
                  </p>
                </div>
              </div>
              {/* Vision */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#DA121A] to-[#a00e14] text-white p-10 shadow-xl">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-6 w-48 h-48 rounded-full bg-white/5" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    A future where every Ethiopian child — regardless of
                    geography, gender, or socioeconomic status — has equal
                    access to transformative educational opportunities and can
                    contribute to Ethiopia's growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 text-[#009639] font-semibold uppercase tracking-widest text-sm mb-4">
                <Sparkles className="w-5 h-5" /> What Drives Us
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                These principles guide every decision we make and every life we
                touch.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 ${value.bgClass} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className={`w-7 h-7 ${value.colorClass}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009639] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO STRIP ── */}
        <section className="py-16 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-4 rounded-2xl overflow-hidden h-64">
              <img
                src="/src/assets/images/IMG_20231210_135056.jpg"
                alt="Students in class"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="/src/assets/images/robotics1.jpg"
                alt="Community gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="/src/assets/images/Grade_9.jpg"
                alt="Library books"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you volunteer, donate, or spread the word — every action
              helps a child in Ethiopia unlock their potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Donate Now <Heart className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Get in Touch <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
