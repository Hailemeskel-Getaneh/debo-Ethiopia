import React, { useState, useEffect, useCallback } from 'react';
import { Layers, Plus, Search, Edit2, Trash2, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { programsService } from '../services/programs.service';
import type { Program } from '../types/admin';

const ManagePrograms: React.FC = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchPrograms = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await programsService.list({
                page_size: 100,
                ...(searchTerm && { search: searchTerm })
            });
            setPrograms(data.results);
        } catch { setError('Failed to load programs.'); }
        finally { setLoading(false); }
    }, [searchTerm]);

    useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setSaving(true);
        const formData = new FormData(e.currentTarget);
        const payload = { name: formData.get('name') as string, description: formData.get('description') as string };
        try {
            if (modalMode === 'Add') await programsService.create(payload);
            else if (selectedProgram) await programsService.update(selectedProgram.id, payload);
            setIsModalOpen(false); fetchPrograms();
        } catch { alert('Failed to save program.'); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!selectedProgram) return;
        try { await programsService.delete(selectedProgram.id); setIsDeleteOpen(false); fetchPrograms(); }
        catch { alert('Failed to delete program.'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-primary-600" /> Programs
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage ongoing services and programs offered by DEBO.</p>
                </div>
                <button onClick={() => { setModalMode('Add'); setSelectedProgram(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                    <Plus className="w-4 h-4" /> Add Program
                </button>
            </div>

            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Search programs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchPrograms} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
            ) : (
                <div className="grid gap-4">
                    {programs.length === 0 && <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-12 text-center text-zinc-400">No programs found.</div>}
                    {programs.map((program, index) => (
                        <motion.div key={program.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex items-center justify-between p-5 cursor-pointer group" onClick={() => setExpandedId(expandedId === program.id ? null : program.id)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                                        <Layers className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 transition-colors">{program.name}</h3>
                                        <p className="text-xs text-zinc-400 mt-0.5">Created {formatDate(program.created_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={e => { e.stopPropagation(); setModalMode('Edit'); setSelectedProgram(program); setIsModalOpen(true); }}
                                        className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={e => { e.stopPropagation(); setSelectedProgram(program); setIsDeleteOpen(true); }}
                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                    {expandedId === program.id ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedId === program.id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{program.description}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{modalMode === 'Add' ? 'Add New Program' : 'Edit Program'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"><X className="w-5 h-5 text-zinc-500" /></button>
                            </div>
                            <form className="p-8 space-y-4" onSubmit={handleSave}>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Program Name</label>
                                    <input name="name" defaultValue={selectedProgram?.name} required placeholder="e.g. Literacy Support"
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                                    <textarea name="description" defaultValue={selectedProgram?.description} required rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" />
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {modalMode === 'Add' ? 'Add Program' : 'Save Changes'}
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
                            <h3 className="text-xl font-bold mb-2">Remove Program?</h3>
                            <p className="text-zinc-500 mb-8">Are you sure you want to remove <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedProgram?.name}</span>?</p>
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

export default ManagePrograms;
