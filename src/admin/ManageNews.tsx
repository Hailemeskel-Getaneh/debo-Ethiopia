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
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

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

    // UI State for Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    // Mock data aligned with `news` DB table
    const [articles, setArticles] = useState<NewsArticle[]>([
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
    ]);

    const filtered = articles.filter(a => {
        const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.author_name.toLowerCase().includes(searchTerm.toLowerCase());
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
                <button
                    onClick={() => { setModalMode('Add'); setSelectedArticle(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
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
                                <button
                                    onClick={() => {
                                        setArticles(articles.map(a => a.id === article.id ? { ...a, is_published: !a.is_published, published_at: !a.is_published ? new Date().toISOString() : null } : a));
                                    }}
                                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${article.is_published
                                        ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                                        : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10'}`}>
                                    {article.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    {article.is_published ? 'Unpublish' : 'Publish'}
                                </button>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => { setModalMode('Edit'); setSelectedArticle(article); setIsModalOpen(true); }}
                                        className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedArticle(article); setIsDeleteOpen(true); }}
                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Article Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                        <Newspaper className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            {modalMode === 'Add' ? 'Create New Article' : 'Edit Article'}
                                        </h3>
                                        <p className="text-sm text-zinc-500">Publish news and stories to your audience.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newArticle: NewsArticle = {
                                    id: selectedArticle?.id || (articles.length + 1).toString(),
                                    author_id: selectedArticle?.author_id || 'u1',
                                    author_name: selectedArticle?.author_name || 'Admin User',
                                    title: formData.get('title') as string,
                                    content: formData.get('content') as string,
                                    excerpt: formData.get('excerpt') as string,
                                    is_published: formData.get('published') === 'true',
                                    published_at: selectedArticle?.published_at || (formData.get('published') === 'true' ? new Date().toISOString() : null),
                                    created_at: selectedArticle?.created_at || new Date().toISOString(),
                                    updated_at: new Date().toISOString(),
                                    image_url: (formData.get('image_url') as string) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop',
                                };

                                if (modalMode === 'Add') {
                                    setArticles([newArticle, ...articles]);
                                } else {
                                    setArticles(articles.map(a => a.id === newArticle.id ? newArticle : a));
                                }
                                setIsModalOpen(false);
                            }}>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Article Title</label>
                                        <input name="title" defaultValue={selectedArticle?.title} required placeholder="Major headline here..."
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Featured Image URL</label>
                                        <input name="image_url" defaultValue={selectedArticle?.image_url} placeholder="https://images.unsplash.com/..."
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Excerpt (Short Summary)</label>
                                        <textarea name="excerpt" defaultValue={selectedArticle?.excerpt} required placeholder="A brief summary for the preview card..." rows={2}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Content</label>
                                        <textarea name="content" defaultValue={selectedArticle?.content} required placeholder="Write the full story..." rows={8}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="flex flex-col gap-3 pt-2">
                                        <div className="flex items-center gap-2">
                                            <input name="published" type="checkbox" id="news-published-chk" defaultChecked={selectedArticle?.is_published} value="true"
                                                className="w-5 h-5 rounded border-zinc-300 text-primary-600 focus:ring-primary-500" />
                                            <label htmlFor="news-published-chk" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                                                Publish this article immediately
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input name="notify_subscribers" type="checkbox" id="news-notify-subscribers" value="true"
                                                className="w-5 h-5 rounded border-zinc-300 text-secondary-600 focus:ring-secondary-500" />
                                            <label htmlFor="news-notify-subscribers" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                                                Notify all subscribers via Email
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-zinc-900 py-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02]">
                                        {modalMode === 'Add' ? 'Create Article' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Delete Article?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedArticle?.title}</span>?
                                This record will be removed permanently.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedArticle) {
                                            setArticles(articles.filter(a => a.id !== selectedArticle.id));
                                        }
                                        setIsDeleteOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all">
                                    Delete Article
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageNews;
