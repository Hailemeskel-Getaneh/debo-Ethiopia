import { motion } from "framer-motion";
import { Award, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import imgHero4 from "@/assets/images/G 12.jpg";

export const LatestNews = ({ news }: { news: any[] }) => (
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
            <div className="aspect-video overflow-hidden relative">
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-brand-action text-white text-xs font-bold uppercase tracking-wider">
                {item.category || "Updates"}
              </span>
              <img
                src={imgHero4}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="News"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-900/20 to-transparent" />
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
);
