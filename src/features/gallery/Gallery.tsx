import { useState } from "react";
import { Search, X, ChevronLeft, ChevronRight, Sparkles, Play } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const categories = [
    { id: "all", label: "All" },
    { id: "education", label: "Education" },
    { id: "health", label: "Health" },
    { id: "events", label: "Events" },
    { id: "community", label: "Community" },
    { id: "team", label: "Team" },
];

const galleryItems = [
    { id: 1, category: "education", type: "image", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop", title: "STEM Class – Addis Ababa", year: "2025" },
    { id: 2, category: "community", type: "image", src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop", title: "Community Meeting – Adama", year: "2024" },
    { id: 3, category: "health", type: "image", src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", title: "Health Fair – Hawassa", year: "2024" },
    { id: 4, category: "events", type: "image", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop", title: "Annual Gala 2024", year: "2024" },
    { id: 5, category: "education", type: "image", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop", title: "Girls Scholarship Ceremony – Gondar", year: "2024" },
    { id: 6, category: "health", type: "image", src: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=300&fit=crop", title: "Clean Water Project – Hawassa", year: "2025" },
    { id: 7, category: "education", type: "image", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop", title: "Digital Literacy Camp – Dire Dawa", year: "2025" },
    { id: 8, category: "team", type: "image", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", title: "Leadership Team Photo", year: "2025" },
    { id: 9, category: "events", type: "image", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", title: "Education Symposium 2025", year: "2025" },
    { id: 10, category: "education", type: "image", src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop", title: "Bole School Library", year: "2025" },
    { id: 11, category: "community", type: "image", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop", title: "Orphan Care Center Visit", year: "2024" },
    { id: 12, category: "health", type: "image", src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop", title: "School Nutrition Program – Jimma", year: "2024" },
    { id: 13, category: "team", type: "image", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop", title: "Program Director Field Visit", year: "2025" },
    { id: 14, category: "events", type: "image", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop", title: "Scholarship Award Ceremony", year: "2024" },
    { id: 15, category: "community", type: "image", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop", title: "Mental Health Workshop – Harar", year: "2025" },
    { id: 16, category: "education", type: "image", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop", thumb: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop", title: "Teachers Hackathon – Mekelle", year: "2024" },
];

export function Gallery() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = galleryItems.filter((item) => {
        const matchCat = activeCategory === "all" || item.category === activeCategory;
        const matchSearch = search === "" || item.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
    const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] via-[#1a1a35] to-[#252550]" />
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1 opacity-20">
                        {galleryItems.slice(0, 8).map((item) => (
                            <img key={item.id} src={item.thumb} alt="" className="w-full h-full object-cover" />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a]/80 via-[#1a1a35]/70 to-transparent" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-[#FCDD09]" /> Photo Gallery
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCDD09] to-orange-400">Gallery</span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
                            A visual story of impact — from classrooms to communities, captured across Ethiopia.
                        </p>
                        <div className="relative max-w-xl mx-auto mb-12">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search photos..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FCDD09]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search gallery items"
                            />
                        </div>
                    </div>
                </section>

                {/* ── STATS ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="sr-only">Gallery Statistics</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {[{ value: `${galleryItems.length}`, label: "Photos" }, { value: "5", label: "Categories" }, { value: "8+", label: "Locations" }, { value: "2024–2025", label: "Coverage" }].map((s, i) => (
                                <div key={i} className="py-8 text-center">
                                    <p className="text-3xl font-black text-gray-900">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FILTER + MASONRY GRID ── */}
                <section className="py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="sr-only">Photo Collection</h2>
                        {/* Category tabs */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat.id
                                        ? "bg-gray-900 text-white shadow-md scale-105"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-gray-400 mb-8">{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</p>

                        {/* Masonry-style grid */}
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                            {filtered.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={item.thumb}
                                        alt={item.title}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <div>
                                            <p className="text-white font-semibold text-sm leading-tight">{item.title}</p>
                                            <p className="text-white/60 text-xs mt-0.5">{item.year}</p>
                                        </div>
                                    </div>
                                    {item.type === "video" && (
                                        <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5">
                                            <Play className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="text-center py-24 text-gray-400">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                                <p className="text-lg font-medium">No photos match your search.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── LIGHTBOX ── */}
                {lightboxIndex !== null && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10 z-10"
                            onClick={closeLightbox}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Prev */}
                        <button
                            className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-7 h-7" />
                        </button>

                        {/* Image */}
                        <div className="max-w-5xl w-full mx-16" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={filtered[lightboxIndex].src}
                                alt={filtered[lightboxIndex].title}
                                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                            />
                            <div className="text-center mt-4">
                                <p className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</p>
                                <p className="text-white/50 text-sm mt-1">
                                    {lightboxIndex + 1} / {filtered.length} · {filtered[lightboxIndex].year}
                                </p>
                            </div>
                        </div>

                        {/* Next */}
                        <button
                            className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-7 h-7" />
                        </button>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
