import React, { useState, useEffect, useCallback } from 'react';
import { Search, Edit2, BarChart3, TrendingUp, Users, GraduationCap, CheckCircle2, Clock, X, Save, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { statsService } from '../services/stats.service';
import type { StatMetric } from '../types/admin';

// Derive a display category from metric name for grouping
const getCategory = (name: string): 'Students' | 'Scholarships' | 'General' => {
    const lower = name.toLowerCase();
    if (lower.includes('scholarship')) return 'Scholarships';
    if (lower.includes('student')) return 'Students';
    return 'General';
};

const getIcon = (category: string) => {
    if (category === 'Students') return <Users className="w-5 h-5" />;
    if (category === 'Scholarships') return <GraduationCap className="w-5 h-5" />;
    return <TrendingUp className="w-5 h-5" />;
};

const ManageMetrics: React.FC = () => {
    const [metrics, setMetrics] = useState<StatMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<StatMetric | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchMetrics = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await statsService.list();
            setMetrics(data.results);
        } catch { setError('Failed to load metrics.'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

    const filtered = metrics.filter(m => {
        const cat = getCategory(m.name);
        return (selectedCategory === 'All' || cat === selectedCategory) &&
            m.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); if (!selectedMetric) return;
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        try {
            await statsService.update(selectedMetric.id, Number(formData.get('value')));
            setIsEditOpen(false); fetchMetrics();
        } catch { alert('Failed to update metric.'); }
        finally { setSaving(false); }
    };

    const totalReach = metrics.reduce((s, m) => s + m.value, 0);
    const activeCount = metrics.filter(m => getCategory(m.name) === 'Students').length;
    const successCount = metrics.filter(m => m.name.toLowerCase().includes('completed')).reduce((s, m) => s + m.value, 0);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><BarChart3 className="w-7 h-7 text-primary-600" />Impact Metrics</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage and update key statistics for NGO transparency and reporting.</p>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Reach', value: totalReach, icon: Users, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Active Programs', value: activeCount, icon: Clock, color: 'text-green-600 bg-green-50' },
                    { label: 'Success Stories', value: successCount, icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
                ].map((stat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.color} dark:bg-zinc-800`}><stat.icon className="w-6 h-6" /></div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value.toLocaleString()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search metrics..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
                </div>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm min-w-[160px]">
                    <option value="All">All Categories</option>
                    <option value="Students">Students</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="General">General</option>
                </select>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchMetrics} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Metric</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Value</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-16 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" /></td></tr>
                            ) : filtered.map((metric, index) => {
                                const cat = getCategory(metric.name);
                                return (
                                    <motion.tr key={metric.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}
                                        className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors group">
                                        <td className="px-6 py-4"><div className="font-bold text-zinc-900 dark:text-zinc-100">{metric.name}</div></td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex px-3 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-bold border border-primary-100 dark:border-primary-800/50">
                                                {metric.value.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                                <span className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">{getIcon(cat)}</span>
                                                <span className="text-sm font-medium">{cat}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{new Date(metric.updated_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => { setSelectedMetric(metric); setIsEditOpen(true); }}
                                                className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary-600" /></div>
                                    <div><h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Update Impact</h3><p className="text-xs text-zinc-500">Modify metric values for NGO reports.</p></div>
                                </div>
                                <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"><X className="w-5 h-5 text-zinc-500" /></button>
                            </div>
                            <form className="p-8 space-y-4" onSubmit={handleSave}>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Metric Name</label>
                                    <input name="name" defaultValue={selectedMetric?.name} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Impact Value</label>
                                    <input name="value" type="number" defaultValue={selectedMetric?.value} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button type="button" onClick={() => setIsEditOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}Update Data
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageMetrics;
