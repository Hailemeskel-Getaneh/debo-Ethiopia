import React, { useState, useEffect, useCallback } from 'react';
import {
    Newspaper, Plus, Search, Edit2, Trash2, Eye, EyeOff,
    Loader2, AlertCircle, X, AlertTriangle, Bell, ImagePlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsService } from '../services/news.service';
import type { NewsArticle } from '../types/admin';

const ManageNews: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTab, setFilterTab] = useState<'All' | 'published' | 'draft'>('All');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selected, setSelected] = useState<NewsArticle | null>(null);
    const [saving, setSaving] = useState(false);
    const [togglingId, setTogglingId] = useState<number | null>(null);
    const [notifySubscribers, setNotifySubscribers] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const PAGE_SIZE = 10;

    const fetchArticles = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await newsService.list({
                page, page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm }),
                ...(filterTab === 'published' && { is_published: true }),
                ...(filterTab === 'draft' && { is_published: false }),
            });
            setArticles(data.results);
            setTotalCount(data.count);
        } catch { setError('Failed to load news articles.'); }
        finally { setLoading(false); }
    }, [page, searchTerm, filterTab]);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);

    const handleTogglePublish = async (article: NewsArticle) => {
        setTogglingId(article.id);
        try {
            const updated = article.is_published
                ? await newsService.unpublish(article.id)
                : await newsService.publish(article.id, { notify_subscribers: notifySubscribers });
            setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
        } catch { alert('Failed to toggle publish status.'); }
        finally { setTogglingId(null); }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData(e.currentTarget);
        const payload = {
            title: fd.get('title') as string,
            content: fd.get('content') as string,
        };
        try {
            let result: NewsArticle;
            if (modalMode === 'Add') {
                result = await newsService.create(payload);
            } else if (selected) {
                result = await newsService.update(selected.id, payload);
            } else {
                return;
            }

            if (imageFile) {
                try {
                    await newsService.addImage(result.id, imageFile);
                } catch (imgErr) {
                    console.error('News saved but image failed', imgErr);
                    alert('Article saved, but image upload failed.');
                }
            }

            setIsModalOpen(false);
            setImageFile(null);
            fetchArticles();
        } catch { alert('Failed to save article.'); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!selected) return;
        try { await newsService.delete(selected.id); setIsDeleteOpen(false); fetchArticles(); }
        catch { alert('Failed to delete article.'); }
    };

    const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Not published';
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    const coverImage = (a: NewsArticle) => a.images.length > 0 ? a.images[0].image : null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary-600" />News & Articles</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{loading ? 'Loading…' : `${totalCount} total articles`}</p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-600 dark:text-zinc-300 select-none">
                        <input type="checkbox" checked={notifySubscribers} onChange={e => setNotifySubscribers(e.target.checked)}
                            className="w-4 h-4 accent-primary-600 rounded" />
                        <Bell className="w-4 h-4 text-primary-600" />
                        Notify subscribers on publish
                    </label>
                    <button onClick={() => { setModalMode('Add'); setSelected(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                        <Plus className="w-4 h-4" /> New Article
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {(['All', 'published', 'draft'] as const).map(tab => (
                        <button key={tab} onClick={() => { setFilterTab(tab); setPage(1); }}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterTab === tab ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchArticles} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                {['Article', 'Author', 'Status', 'Date', 'Actions'].map((h, i) => (
                                    <th key={h} className={`px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-16 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" /></td></tr>
                            ) : articles.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-400">No articles found.</td></tr>
                            ) : (
                                articles.map((article, index) => {
                                    const cover = coverImage(article);
                                    return (
                                        <motion.tr key={article.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
                                            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                            <td className="px-6 py-4 min-w-[280px]">
                                                <div className="flex items-center gap-3">
                                                    {cover ? (
                                                        <img src={cover} alt={article.title} className="w-12 h-9 object-cover rounded-lg shrink-0" />
                                                    ) : (
                                                        <div className="w-12 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                                                            <Newspaper className="w-5 h-5 text-zinc-400" />
                                                        </div>
                                                    )}
                                                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-2">{article.title}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                                                {article.author.first_name} {article.author.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => handleTogglePublish(article)} disabled={togglingId === article.id}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 disabled:opacity-60 ${article.is_published ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'}`}>
                                                    {togglingId === article.id ? <Loader2 className="w-3 h-3 animate-spin" /> : article.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                    {article.is_published ? 'Published' : 'Draft'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">{formatDate(article.published_at)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => { setSelected(article); setModalMode('Edit'); setIsModalOpen(true); }}
                                                        className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => { setSelected(article); setIsDeleteOpen(true); }}
                                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages || 1}</span></p>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40">Previous</button>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><Newspaper className="w-5 h-5 text-primary-600" /></div>
                                    <div><h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{modalMode === 'Add' ? 'Write New Article' : 'Edit Article'}</h3><p className="text-sm text-zinc-500">Draft or publish a news article.</p></div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"><X className="w-5 h-5 text-zinc-500" /></button>
                            </div>
                            <form className="p-8 space-y-4 max-h-[70vh] overflow-y-auto" onSubmit={handleSave}>
                                <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Title</label>
                                    <input name="title" defaultValue={selected?.title} required placeholder="Article headline..."
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" /></div>
                                <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Content</label>
                                    <textarea name="content" defaultValue={selected?.content} required rows={8} placeholder="Full article body..."
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" /></div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Article Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-200 dark:border-zinc-700 border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:border-primary-500 transition-colors cursor-pointer relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                        />
                                        <div className="space-y-1 text-center">
                                            {imageFile ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden mb-2 border border-primary-200">
                                                        <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                    <p className="text-xs text-primary-600 font-medium">{imageFile.name}</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImagePlus className="mx-auto h-12 w-12 text-zinc-400 group-hover:text-primary-500 transition-colors" />
                                                    <div className="flex text-sm text-zinc-600 dark:text-zinc-400">
                                                        <span className="relative cursor-pointer font-bold text-primary-600">Upload a file</span>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-zinc-500">PNG, JPG up to 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {modalMode === 'Add' ? 'Create News' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
                            <h3 className="text-xl font-bold mb-2">Delete Article?</h3>
                            <p className="text-zinc-500 mb-8">This will permanently remove <span className="font-bold text-zinc-900 dark:text-zinc-100">"{selected?.title}"</span>.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageNews;
