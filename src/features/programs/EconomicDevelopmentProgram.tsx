import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

// Professional Images for Economic Development
import savingsImg from "@/assets/images/IMG_20240602_161145.jpg";
import microfinanceImg from "@/assets/images/Soc-3.jpg";
import reforestationImg from "@/assets/images/IMG_20231104_083345.jpg";
import healthImg from "@/assets/images/IMG_20240306_100255.jpg";
import waterImg from "@/assets/images/6-1.jpg";

// Additional Images for Carousels
import soc1 from "@/assets/images/IMG_20240602_145022.jpg";
import soc2 from "@/assets/images/IMG_20211231_153002.jpg";
import soc3 from "@/assets/images/IMG_20230910_111605.jpg";
import water2 from "@/assets/images/7-2.jpg";
import water3 from "@/assets/images/8-3.jpg";
import water4 from "@/assets/images/9.jpg";
import health2 from "@/assets/images/doc.jpg";
import health3 from "@/assets/images/IMG_20231206_144403.jpg";
import health4 from "@/assets/images/IMG_20231210_135056.jpg";
import bus1 from "@/assets/images/IMG_20231213_150540.jpg";

// Hero Images
import hero1 from "@/assets/images/Soc-3.jpg";
import hero2 from "@/assets/images/IMG_20240602_161145.jpg";
import hero3 from "@/assets/images/IMG_20231104_083345.jpg";

const economicPrograms = [
  {
    title: "WOMEN'S SAVINGS GROUPS",
    content:
      "Empowering women through community-led savings and credit associations to build financial independence.",
    images: [savingsImg, soc1, soc2, soc3],
    details:
      "Women's Savings and Credit Associations (WSCAs) are the backbone of community resilience. By pooling their resources, women can access small loans for emergency needs or to start micro-enterprises, fostering a culture of mutual support and financial literacy.",
    impact: [
      "1,200+ Women empowered",
      "98% Loan repayment rate",
      "50+ Active savings groups",
    ],
  },
  {
    title: "MICROFINANCE",
    content:
      "Providing small loans and financial services to entrepreneurs to start or scale their businesses.",
    images: [microfinanceImg, bus1, soc1, soc2],
    details:
      "Our microfinance initiative provides 'seed capital' to aspiring entrepreneurs in rural villages. Along with low-interest loans, we provide business training and mentorship to ensure that every small business has a path to sustainability.",
    impact: [
      "300+ Small businesses funded",
      "Increased household income by 40%",
      "Business skills training programs",
    ],
  },
  {
    title: "REFORESTATION",
    content:
      "Community-driven tree planting initiatives to restore ecosystems and provide sustainable livelihoods.",
    images: [reforestationImg, hero3, soc3, hero1],
    details:
      "Reforestation isn't just about environment; it's about the future economy. We engage local communities in planting indigenous trees that prevent soil erosion and provide long-term sustainable resources for the village.",
    impact: [
      "50,000+ Trees planted",
      "10 Community nurseries",
      "Environmental education workshops",
    ],
  },
  {
    title: "HEALTH",
    content:
      "Integrating community health education and services within economic empowerment initiatives.",
    images: [healthImg, health2, health3, health4],
    details:
      "Sustainable development requires a healthy workforce. We integrate basic health check-ups, hygiene education, and nutrition workshops into our economic programs, ensuring that families are vibrant and productive.",
    impact: [
      "5,000+ People reached",
      "Improved maternal health outcomes",
      "Reduced incidence of water-borne diseases",
    ],
  },
  {
    title: "WATER",
    content:
      "Developing sustainable water sources and management systems for agriculture and domestic use.",
    images: [waterImg, water2, water3, water4],
    details:
      "Access to clean water is a fundamental economic catalyst. We build community water points and irrigation systems that free up time for education and empower small-scale farmers to produce year-round.",
    impact: [
      "15 Clean water wells",
      "Irrigation for 200+ farmers",
      "Significant time saved for women and children",
    ],
  },
];

interface Program {
  title: string;
  content: string;
  images: string[];
  details: string;
  impact: string[];
}

function ProgramDetailModal({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % program.images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + program.images.length) % program.images.length,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Image Carousel */}
        <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-zinc-900">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentIndex}
              src={program.images[currentIndex]}
              alt={`${program.title} ${currentIndex + 1}`}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {program.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {program.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
          <div className="inline-block bg-headings-highlights/10 text-headings-highlights text-xs font-bold px-3 py-1 rounded-full mb-4">
            ECONOMIC INITIATIVE
          </div>
          <h2 className="text-3xl font-black text-headings-highlights mb-6 leading-tight">
            {program.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {program.details}
          </p>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 border-b pb-2">
              Key Impact
            </h4>
            <ul className="space-y-3">
              {program.impact.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-cta-icons shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <a
              href="/donate"
              className="inline-flex items-center justify-center w-full bg-headings-highlights text-white font-bold py-4 rounded-xl hover:bg-headings-highlights/90 transition-colors gap-2"
            >
              Support this Initiative <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgramCard({
  title,
  content,
  onClick,
}: {
  title: string;
  content: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="w-12 h-12 bg-headings-highlights/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-headings-highlights/20 transition-colors">
        <Sparkles className="w-6 h-6 text-headings-highlights" />
      </div>
      <h3 className="text-xl font-bold text-headings-highlights mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
        {content}
      </p>
      <div className="pt-6 border-t border-zinc-50 flex items-center text-headings-highlights font-semibold text-sm group-hover:gap-2 transition-all">
        Learn more <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
}

const outcomesList = [
  "1,500+ women successfully participating in savings groups",
  "200+ micro-businesses launched with project support",
  "50,000+ trees planted in community reforestation zones",
  "Improved household income for over 800 families",
  "Sustainable water access provided to 5 rural communities",
];

export function EconomicDevelopmentProgram() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const heroImages = [hero1, hero2, hero3];

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
                alt="Economic Development"
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#003d1a]/50 via-[#005c28]/30 to-[#009639]/5 z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <a
              href="/programs"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              ← All Programs
            </a>
            <div className="inline-flex items-center gap-2 bg-cta-icons/20 border border-cta-icons/30 text-cta-icons text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> Economic Development
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight max-w-2xl">
              Empowering Communities to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta-icons to-headings-highlights">
                Thrive
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-xl mb-10">
              We believe in sustainable growth that starts at the grassroots
              level. Our economic programs provide the tools for long-term
              prosperity.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-headings-highlights text-white font-bold px-7 py-3.5 rounded-full hover:bg-headings-highlights/90 hover:shadow-xl transition-all duration-300"
            >
              Support Development <ArrowRight className="w-5 h-5" />
            </a>
          </div>

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

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { value: "1,500+", label: "People Empowered" },
                { value: "5", label: "Core Initiatives" },
                { value: "25", label: "Communities" },
                { value: "45%", label: "Income Growth" },
              ].map((s, i) => (
                <div key={i} className="py-10 text-center">
                  <p className="text-4xl font-black text-[#8B4513]">
                    {s.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAMS GRID ── */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-[#8B4513] tracking-tight mb-4">
                ECONOMIC EMPOWERMENT
              </h2>
              <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {economicPrograms.map((prog, i) => (
                <ProgramCard
                  key={i}
                  title={prog.title}
                  content={prog.content}
                  onClick={() => setSelectedProgram(prog)}
                />
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedProgram && (
            <ProgramDetailModal
              program={selectedProgram}
              onClose={() => setSelectedProgram(null)}
            />
          )}
        </AnimatePresence>

        {/* ── OUTCOMES ── */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                Sustainable Impact
              </h2>
              <p className="text-gray-500">
                Measurable progress towards community self-reliance.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {outcomesList.map((o, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-[#8B4513] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OTHER PROGRAMS ── */}
        <section className="py-16 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Other Programs
            </h2>
            <div className="grid sm:grid-cols-1 gap-5">
              {[
                {
                  href: "/programs?type=education",
                  label: "Education Programs",
                  desc: "STEM, girls' education, digital literacy, and teacher training.",
                },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 hover:border-[#8B4513] hover:shadow-md transition-all group"
                >
                  <div>
                    <p className="font-bold text-gray-900">{link.label}</p>
                    <p className="text-sm text-gray-500">{link.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B4513] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── DONATE CTA ── */}
        <section className="py-20 bg-gradient-to-br from-[#3d2b1a] to-[#8B4513] text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Invest in Local Growth
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Your donation provides the capital and training needed for
              communities to build their own futures.
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
