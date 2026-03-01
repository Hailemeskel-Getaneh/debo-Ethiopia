import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Search, Trash2, Download, Users, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { subscribersService } from '../services/subscribers.service';
import type { Subscriber } from '../types/admin';

const ManageSubscribers: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const PAGE_SIZE = 15;

    const fetchSubscribers = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await subscribersService.list({
                page, page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm })
            });
            setSubscribers(data.results);
            setTotalCount(data.count);
        } catch { setError('Failed to load subscribers.'); }
        finally { setLoading(false); }
    }, [page, searchTerm]);

    useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

    const handleDelete = async () => {
        if (!selectedSubscriber) return;
        try {
            await subscribersService.delete(selectedSubscriber.id);
            setIsDeleteOpen(false);
            fetchSubscribers();
        } catch { alert('Failed to remove subscriber.'); }
    };

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Mail className="w-6 h-6 text-primary-600" />Newsletter Subscribers</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage newsletter subscribers and email list.</p>
                </div>
                <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-50 transition-colors shadow-sm">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Subscribers', value: totalCount.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'On This Page', value: subscribers.length.toString(), icon: Mail, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Search by email..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchSubscribers} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                {['#', 'Email Address', 'Subscribed At', 'Actions'].map((h, i) => (
                                    <th key={h} className={`px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={4} className="px-6 py-16 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" /></td></tr>
                            ) : subscribers.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-16 text-center text-zinc-400">
                                    <Mail className="w-10 h-10 mx-auto mb-3 text-zinc-300" /><p>No subscribers found.</p>
                                </td></tr>
                            ) : (
                                subscribers.map((sub, index) => (
                                    <motion.tr key={sub.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm text-zinc-400 tabular-nums">{(page - 1) * PAGE_SIZE + index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                                                    <Mail className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">{formatDate(sub.subscribed_at)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                                <button onClick={() => { setSelectedSubscriber(sub); setIsDeleteOpen(true); }}
                                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors" title="Remove Subscriber">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">Page <span className="font-medium text-zinc-900 dark:text-zinc-100">{page}</span> of <span className="font-medium text-zinc-900 dark:text-zinc-100">{totalPages || 1}</span></p>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-4 py-2 border rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40">Previous</button>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
                            <h3 className="text-xl font-bold mb-2">Remove Subscriber?</h3>
                            <p className="text-zinc-500 mb-8">This will remove <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedSubscriber?.email}</span> from the mailing list.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">Remove</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageSubscribers;
