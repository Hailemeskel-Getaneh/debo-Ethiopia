import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Image,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useGallery } from "@/hooks/useGallery";

// Backend schema: { id, title, description, images[], videos[], created_at, updated_at }
interface GalleryImage {
  id: number;
  image: string;
}

interface GalleryVideo {
  id: number;
  video_url: string;
}

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  images: GalleryImage[];
  videos: GalleryVideo[];
  created_at?: string;
  updated_at?: string;
}

// Flatten gallery items for display
interface DisplayItem {
  galleryId: number;
  imageId: number;
  imageUrl: string;
  title: string;
  description: string;
  type: "image" | "video";
  videoUrl?: string;
}

export function Gallery() {
  const { galleries, loading, error } = useGallery();
  const [search, setSearch] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Safely flatten galleries
  const displayItems: DisplayItem[] = [];

  if (galleries && Array.isArray(galleries)) {
    galleries.forEach((gallery: GalleryItem) => {
      // Add images
      if (gallery.images && Array.isArray(gallery.images)) {
        gallery.images.forEach((img: GalleryImage) => {
          displayItems.push({
            galleryId: gallery.id,
            imageId: img.id,
            imageUrl: img.image,
            title: gallery.title || "",
            description: gallery.description || "",
            type: "image",
          });
        });
      }

      // Add videos
      if (gallery.videos && Array.isArray(gallery.videos)) {
        gallery.videos.forEach((vid: GalleryVideo) => {
          displayItems.push({
            galleryId: gallery.id,
            imageId: vid.id,
            imageUrl: "",
            title: gallery.title || "",
            description: gallery.description || "",
            type: "video",
            videoUrl: vid.video_url,
          });
        });
      }
    });
  }

  const filtered = displayItems.filter(
    (item) =>
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#009639] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#009639] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-[#00b359]/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
              <Image className="w-4 h-4 text-[#00b359]" /> Gallery
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Explore photos and videos capturing the moments of impact, hope,
              and transformation across Ethiopia.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>
        </section>

        {/* ── GALLERY GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}{" "}
              / video{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No gallery items match your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((item, index) => (
                  <motion.div
                    key={`${item.galleryId}-${item.imageId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => openLightbox(index)}
                  >
                    {item.type === "video" ? (
                      <>
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/80" />
                        </div>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      </>
                    ) : (
                      <>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                      </>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <p className="font-bold text-sm line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {filtered.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/80 hover:text-white p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 text-white/80 hover:text-white p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <div
              className="max-w-5xl max-h-[90vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered[lightboxIndex].type === "video" ? (
                <video
                  src={filtered[lightboxIndex].videoUrl}
                  controls
                  className="max-w-full max-h-[90vh]"
                  autoPlay
                />
              ) : (
                <img
                  src={filtered[lightboxIndex].imageUrl}
                  alt={filtered[lightboxIndex].title}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              )}
              <p className="text-white text-center mt-4 font-semibold">
                {filtered[lightboxIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
