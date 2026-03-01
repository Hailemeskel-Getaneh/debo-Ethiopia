import { useState } from "react";
import { Search, Calendar, User, ChevronRight, Sparkles } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { useNews } from "@/hooks/useNews";

// Backend schema: { id, title, content, author, images, videos, is_published, published_at, updated_at }
interface NewsArticle {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
  };
  images: {
    id: number;
    image: string;
  }[];
  videos: {
    id: number;
    video_url: string;
  }[];
  is_published: boolean;
  published_at: string;
  updated_at: string;
}

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function News() {
  const { published: news, loading, error } = useNews();
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );

  const filtered = news.filter(
    (article: NewsArticle) =>
      search === "" ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()),
  );

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
              <Sparkles className="w-4 h-4 text-[#00b359]" /> News & Updates
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                News
              </span>
            </h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Stay updated with the latest news, stories, and achievements from
              DeboEthiopia and our communities.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00b359]"
              />
            </div>
          </div>
        </section>

        {/* ── NEWS GRID ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-400 mb-8">
              Showing {filtered.length} article
              {filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">
                  No news articles match your search.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.map((article: NewsArticle) => (
                  <div
                    key={article.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Image */}
                    {article.images && article.images.length > 0 ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.images[0].image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#003d1a] to-[#009639] flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.published_at)}
                        {article.author && (
                          <>
                            <span>·</span>
                            <User className="w-3.5 h-3.5" />
                            {article.author.first_name}{" "}
                            {article.author.last_name}
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                        {article.content
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 150)}
                        ...
                      </p>

                      <div className="mt-4 inline-flex items-center gap-1.5 text-[#009639] font-semibold text-sm">
                        Read More <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── ARTICLE MODAL ── */}
        {selectedArticle && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              {selectedArticle.images && selectedArticle.images.length > 0 && (
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedArticle.images[0].image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedArticle.published_at)}
                  {selectedArticle.author && (
                    <>
                      <span>·</span>
                      <User className="w-4 h-4" />
                      {selectedArticle.author.first_name}{" "}
                      {selectedArticle.author.last_name}
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {selectedArticle.title}
                </h2>

                <div
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />

                {/* Additional images */}
                {selectedArticle.images &&
                  selectedArticle.images.length > 1 && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="font-bold text-gray-900 mb-4">Gallery</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedArticle.images.slice(1).map((img, idx) => (
                          <img
                            key={idx}
                            src={img.image}
                            alt=""
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default News;
