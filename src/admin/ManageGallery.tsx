import React, { useState, useEffect, useCallback } from 'react';
import {
    Image as ImageIcon,
    Plus,
    Search,
    Trash2,
    Eye,
    Film,
    Calendar,
    X,
    AlertTriangle,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService, type GalleryListParams } from '../services/gallery.service';
import type { GalleryItem as APIItem } from '../types/admin';

const ManageGallery: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'All' | 'Image' | 'Video'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<APIItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // UI State for Modals
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<APIItem | null>(null);

    const fetchGallery = useCallback(async () => {
        setLoading(true);
        try {
            const params: GalleryListParams = {
                search: searchTerm || undefined,
            };
            const response = await galleryService.list(params);
            setItems(response.results);
            setError(null);
        } catch (_err) {
            setError('Failed to fetch gallery items');
            console.error(_err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    const filtered = items.filter(item => {
        const hasImages = item.images && item.images.length > 0;
        const hasVideos = item.videos && item.videos.length > 0;

        if (selectedTab === 'Image') return hasImages;
        if (selectedTab === 'Video') return hasVideos;
        return true;
    });

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const handleDelete = async () => {
        if (!selectedItem) return;
        try {
            await galleryService.delete(selectedItem.id);
            setItems(items.filter(i => i.id !== selectedItem.id));
            setIsDeleteOpen(false);
        } catch {
            alert('Failed to delete item');
        }
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        };

        try {
            const newItem = await galleryService.create(payload);
            setItems([newItem, ...items]);
            setIsUploadOpen(false);
        } catch {
            alert('Failed to upload media');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-primary-600" />
                        Gallery
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage photos and videos in the media gallery.</p>
                </div>
                <button
                    onClick={() => setIsUploadOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Upload Media
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by title..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all shadow-sm text-zinc-900 dark:text-zinc-100" />
                </div>
                <div className="flex gap-2">
                    {(['All', 'Image', 'Video'] as const).map(tab => (
                        <button key={tab} onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedTab === tab
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
                    <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">Fetching your media collection...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center">
                    <ImageIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">No media found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item, index) => {
                        const thumb = item.images?.[0]?.image || (item.videos?.[0] ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1610484799863-1f19bca40e06?q=80&w=600&auto=format&fit=crop');
                        const isVideo = item.videos && item.videos.length > 0;

                        return (
                            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.07 }}
                                className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                {/* Thumbnail */}
                                <div className="h-48 overflow-hidden relative">
                                    <img src={thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {/* Type badge */}
                                    <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white ${isVideo ? 'bg-purple-600/90' : 'bg-zinc-700/80'}`}>
                                        {isVideo ? <Film className="w-3" /> : <ImageIcon className="w-3" />}
                                        {isVideo ? 'Video' : 'Image'}
                                    </div>
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => { setSelectedItem(item); setIsViewOpen(true); }}
                                            className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                                            className="p-2.5 bg-red-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1 truncate">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">{item.description}</p>
                                    )}
                                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(item.created_at)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsUploadOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800">
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-primary text-zinc-900 dark:text-zinc-100">Upload New Media</h3>
                            <form className="space-y-4 pr-2" onSubmit={handleUpload}>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Title</label>
                                    <input name="title" required placeholder="Media title..."
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-900 dark:text-zinc-100" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Description (Optional)</label>
                                    <textarea name="description" placeholder="Brief description..." rows={2}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary-500/20 resize-none text-zinc-900 dark:text-zinc-100" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsUploadOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all">
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* View Media Modal */}
            <AnimatePresence>
                {isViewOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsViewOpen(false)}
                            className="absolute inset-0 bg-zinc-900/90 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl">
                            <button onClick={() => setIsViewOpen(false)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                                <div className="flex-1 bg-zinc-950 flex items-center justify-center min-h-[300px]">
                                    <img src={selectedItem.images?.[0]?.image || (selectedItem.videos?.[0] ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' : '')} alt={selectedItem.title} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="w-full lg:w-80 bg-white dark:bg-zinc-900 p-8 flex flex-col">
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{selectedItem.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                                        {selectedItem.description || 'No description provided.'}
                                    </p>
                                    <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-zinc-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-400">Upload Date</p>
                                                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{formatDate(selectedItem.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Delete Media?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedItem?.title}</span>?
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageGallery;
