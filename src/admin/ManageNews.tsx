import React, { useState } from 'react';
import {
    Newspaper,
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    User2,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsArticle {
    id: string;
    author_id: string;
    author_name: string;
    title: string;
    content: string;
    excerpt: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    image_url: string;
}

const ManageNews: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTab, setFilterTab] = useState<'All' | 'Published' | 'Draft'>('All');

    // Mock data aligned with `news` DB table
    const articles: NewsArticle[] = [
        {
            id: '1',
            author_id: 'u1',
            author_name: 'Admin User',
            title: 'DEBO Launches New Clean Water Initiative in Somali Region',
            content: 'We are pleased to announce the launch of our new clean water initiative across three villages in the Somali region...',
            excerpt: 'We are pleased to announce the launch of our new clean water initiative across three villages.',
            is_published: true,
            published_at: '2026-02-15T10:00:00',
            created_at: '2026-02-14T08:00:00',
            updated_at: '2026-02-15T10:00:00',
            image_url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop',
        },
        {
            id: '2',
            author_id: 'u2',
            author_name: 'Project Manager',
            title: 'Youth Coding Bootcamp: 30 Students Graduate',
            content: 'Thirty young Ethiopians completed their intensive coding bootcamp program and received certificates...',
            excerpt: 'Thirty young Ethiopians completed their intensive coding bootcamp and received certificates.',
            is_published: true,
            published_at: '2026-02-10T09:30:00',
            created_at: '2026-02-09T07:00:00',
            updated_at: '2026-02-10T09:30:00',
            image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
        },
        {
            id: '3',
            author_id: 'u1',
            author_name: 'Admin User',
            title: 'Upcoming Annual Charity Gala – Save the Date',
            content: 'We are excited to announce that the Annual Charity Gala will be held on December 15, 2026...',
            excerpt: "We're excited to announce the Annual Charity Gala on December 15, 2026 at the Grand Hotel.",
            is_published: false,
            published_at: null,
            created_at: '2026-02-18T11:00:00',
            updated_at: '2026-02-18T11:00:00',
            image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
        },
    ];

    const filtered = articles.filter(a => {
        const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTab = filterTab === 'All' || (filterTab === 'Published' ? a.is_published : !a.is_published);
        return matchSearch && matchTab;
    });

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Newspaper className="w-6 h-6 text-primary-600" />
                        News & Updates
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage news articles and publications.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                    <Plus className="w-4 h-4" />
                    New Article
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all shadow-sm" />
                </div>
                <div className="flex gap-2">
                    {(['All', 'Published', 'Draft'] as const).map(tab => (
                        <button key={tab} onClick={() => setFilterTab(tab)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${filterTab === tab
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.length === 0 && (
                    <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center">
                        <Newspaper className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No articles found.</p>
                    </div>
                )}
                {filtered.map((article, index) => (
                    <motion.div key={article.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                        <div className="h-44 overflow-hidden relative">
                            <img src={article.image_url} alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {/* Published badge */}
                            <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${article.is_published
                                ? 'bg-green-500/90 text-white'
                                : 'bg-zinc-700/80 text-zinc-200'}`}>
                                {article.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                {article.is_published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-2 text-xs text-zinc-400">
                                <User2 className="w-3.5 h-3.5" />
                                {article.author_name}
                                <span className="mx-1">·</span>
                                {article.is_published && article.published_at
                                    ? formatDate(article.published_at)
                                    : `Created ${formatDate(article.created_at)}`}
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 flex-1">
                                {article.excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <button className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${article.is_published
                                    ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                                    : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10'}`}>
                                    {article.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    {article.is_published ? 'Unpublish' : 'Publish'}
                                </button>
                                <div className="flex gap-1">
                                    <button className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageNews;
