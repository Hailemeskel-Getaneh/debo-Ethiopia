import React, { useState, useEffect, useCallback } from 'react';
import { Award, Plus, Search, Edit2, Trash2, Calendar, X, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementsService } from '../services/achievements.service';
import type { Achievement } from '../types/admin';

const ManageAchievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selected, setSelected] = useState<Achievement | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchAchievements = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await achievementsService.list({
                page_size: 100,
                ...(searchTerm && { search: searchTerm })
            });
            setAchievements(data.results);
        } catch { setError('Failed to load achievements.'); }
        finally { setLoading(false); }
    }, [searchTerm]);

    useEffect(() => { fetchAchievements(); }, [fetchAchievements]);

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData(e.currentTarget);
        const payload = {
            title: fd.get('title') as string,
            description: fd.get('description') as string,
            image_url: (fd.get('image_url') as string) || null,
            achieved_at: fd.get('achieved_at') as string,
        };
        try {
            if (modalMode === 'Add') await achievementsService.create(payload);
            else if (selected) await achievementsService.update(selected.id, payload);
            setIsModalOpen(false);
            fetchAchievements();
        } catch { alert('Failed to save achievement.'); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!selected) return;
        try { await achievementsService.delete(selected.id); setIsDeleteOpen(false); fetchAchievements(); }
        catch { alert('Failed to delete achievement.'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Award className="w-6 h-6 text-primary-600" />Achievements</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Showcase milestones and awards earned by DEBO.</p>
                </div>
                <button onClick={() => { setModalMode('Add'); setSelected(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                    <Plus className="w-4 h-4" /> Add Achievement
                </button>
            </div>

            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Search achievements..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchAchievements} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            {loading ? <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.length === 0 && (
                        <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border p-12 text-center">
                            <Award className="w-12 h-12 text-zinc-300 mx-auto mb-3" /><p className="text-zinc-500 font-medium">No achievements found.</p>
                        </div>
                    )}
                    {achievements.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                            {item.image_url ? (
                                <div className="h-44 overflow-hidden"><img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                            ) : (
                                <div className="h-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                                    <Award className="w-10 h-10 text-primary-400" />
                                </div>
                            )}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-1.5 text-xs text-primary-600 font-medium mb-2"><Calendar className="w-3.5 h-3.5" />Achieved: {formatDate(item.achieved_at)}</div>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mb-2">{item.title}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">{item.description}</p>
                                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-2">
                                    <button onClick={() => { setSelected(item); setModalMode('Edit'); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => { setSelected(item); setIsDeleteOpen(true); }} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><Award className="w-5 h-5 text-primary-600" /></div>
                                    <div><h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{modalMode === 'Add' ? 'Add Achievement' : 'Edit Achievement'}</h3><p className="text-sm text-zinc-500">Record a new milestone or award.</p></div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"><X className="w-5 h-5 text-zinc-500" /></button>
                            </div>
                            <form className="p-8 space-y-4 max-h-[70vh] overflow-y-auto" onSubmit={handleSave}>
                                <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Title</label>
                                    <input name="title" defaultValue={selected?.title} required placeholder="Achievement Title" className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" /></div>
                                <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                                    <textarea name="description" defaultValue={selected?.description} required rows={3} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" /></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date Achieved</label>
                                        <input name="achieved_at" type="date" defaultValue={selected?.achieved_at} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" /></div>
                                    <div className="space-y-2"><label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Image URL (Optional)</label>
                                        <input name="image_url" defaultValue={selected?.image_url || ''} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" /></div>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}{modalMode === 'Add' ? 'Add Achievement' : 'Save Changes'}
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
                            <h3 className="text-xl font-bold mb-2">Delete Achievement?</h3>
                            <p className="text-zinc-500 mb-8">Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selected?.title}</span>?</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border font-bold hover:bg-zinc-50 transition-colors">Keep</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageAchievements;
