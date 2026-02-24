import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

// Import local images
import img1 from "@/assets/images/Grade_9.jpg";
import img2 from "@/assets/images/teachers.jpg";
import img3 from "@/assets/images/IMG_20231104_083345.jpg";
import img4 from "@/assets/images/2023 Par.day.jpg";
import img5 from "@/assets/images/primary_teacher.jpg";
import img6 from "@/assets/images/IMG_20231206_144403.jpg";
import img7 from "@/assets/images/robotics1.jpg";
import img8 from "@/assets/images/teacher.jpg";
import img9 from "@/assets/images/G 12.jpg";
import img10 from "@/assets/images/IMG_20231210_135056.jpg";
import img11 from "@/assets/images/image.png";
import img12 from "@/assets/images/IMG_20231213_150540.jpg";
import img13 from "@/assets/images/H.mariam-1.jpg";
import img14 from "@/assets/images/G 11-1.jpg";
import img15 from "@/assets/images/IMG_20240306_095313.jpg";
import img16 from "@/assets/images/Kochew-2.jpg";

const categories = [
  { id: "all", label: "All" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
  { id: "events", label: "Events" },
  { id: "community", label: "Community" },
  { id: "team", label: "Team" },
];

const galleryItems = [
  {
    id: 1,
    category: "education",
    type: "image",
    src: img1,
    thumb: img1,
    title: "Grade 9 Students",
    year: "2024",
  },
  {
    id: 2,
    category: "community",
    type: "image",
    src: img2,
    thumb: img2,
    title: "Teachers Meeting",
    year: "2024",
  },
  {
    id: 3,
    category: "health",
    type: "image",
    src: img3,
    thumb: img3,
    title: "Community Health",
    year: "2024",
  },
  {
    id: 4,
    category: "events",
    type: "image",
    src: img4,
    thumb: img4,
    title: "Annual Event 2023",
    year: "2023",
  },
  {
    id: 5,
    category: "education",
    type: "image",
    src: img5,
    thumb: img5,
    title: "Primary Teacher",
    year: "2024",
  },
  {
    id: 6,
    category: "health",
    type: "image",
    src: img6,
    thumb: img6,
    title: "Health Program",
    year: "2024",
  },
  {
    id: 7,
    category: "education",
    type: "image",
    src: img7,
    thumb: img7,
    title: "Robotics Program",
    year: "2024",
  },
  {
    id: 8,
    category: "team",
    type: "image",
    src: img8,
    thumb: img8,
    title: "Teaching Staff",
    year: "2024",
  },
  {
    id: 9,
    category: "events",
    type: "image",
    src: img9,
    thumb: img9,
    title: "Grade 12 Students",
    year: "2024",
  },
  {
    id: 10,
    category: "education",
    type: "image",
    src: img10,
    thumb: img10,
    title: "Student Activities",
    year: "2024",
  },
  {
    id: 11,
    category: "community",
    type: "image",
    src: img11,
    thumb: img11,
    title: "Community Outreach",
    year: "2024",
  },
  {
    id: 12,
    category: "health",
    type: "image",
    src: img12,
    thumb: img12,
    title: "Health Initiative",
    year: "2024",
  },
  {
    id: 13,
    category: "team",
    type: "image",
    src: img13,
    thumb: img13,
    title: "Leadership Visit",
    year: "2024",
  },
  {
    id: 14,
    category: "events",
    type: "image",
    src: img14,
    thumb: img14,
    title: "Education Event",
    year: "2024",
  },
  {
    id: 15,
    category: "community",
    type: "image",
    src: img15,
    thumb: img15,
    title: "Field Visit",
    year: "2024",
  },
  {
    id: 16,
    category: "education",
    type: "image",
    src: img16,
    thumb: img16,
    title: "Community Work",
    year: "2024",
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter((item) => {
    const matchCat =
      activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      search === "" || item.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a]/80 via-[#005c28]/70 to-[#009639]/40" />
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 opacity-20">
            {galleryItems.slice(0, 8).map((item) => (
              <img
                key={item.id}
                src={item.thumb}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a]/90 via-[#005c28]/70 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#00b359]" /> Photo Gallery
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Capturing <span className="text-[#059669]">Our Impact</span>
            </h1>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
              Explore moments from our programs, events, and the communities we
              serve across Ethiopia.
            </p>
          </div>
        </section>

        {/* ── FILTERS & SEARCH ── */}
        <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#059669] text-white shadow-md"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-200 focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY GRID ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">
                No photos found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-white/80">{item.year}</p>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-[#059669] ml-1" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[80vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">
                  {filtered[lightboxIndex].title}
                </h3>
                <p className="text-zinc-400">{filtered[lightboxIndex].year}</p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
