import React, { useState, useEffect, useCallback } from 'react';
import {
    DollarSign, Search, Filter, Download, CheckCircle2, XCircle, Clock, RefreshCcw, Loader2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { donationsService } from '../services/donations.service';
import type { Donation, PaymentStatus } from '../types/admin';

const ManageDonations: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | PaymentStatus>('All');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 10;

    const statusConfig: Record<PaymentStatus, { label: string; icon: React.ElementType; style: string }> = {
        completed: { label: 'Completed', icon: CheckCircle2, style: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' },
        pending: { label: 'Pending', icon: Clock, style: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800' },
        failed: { label: 'Failed', icon: XCircle, style: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' },
        refunded: { label: 'Refunded', icon: RefreshCcw, style: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700' },
    };

    const fetchDonations = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await donationsService.list({
                page, page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm }),
                ...(filterStatus !== 'All' && { payment_status: filterStatus }),
            });
            setDonations(data.results);
            setTotalCount(data.count);
        } catch { setError('Failed to load donations.'); }
        finally { setLoading(false); }
    }, [page, searchTerm, filterStatus]);

    useEffect(() => { fetchDonations(); }, [fetchDonations]);

    const totalCompleted = donations.filter(d => d.payment_status === 'completed').reduce((s, d) => s + Number(d.amount), 0);
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><DollarSign className="w-6 h-6 text-primary-600" />Donations</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Track and manage all incoming donations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs text-zinc-400">Completed Total</p>
                        <p className="text-xl font-bold text-green-600">${totalCompleted.toLocaleString()}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2.5 rounded-xl font-medium hover:bg-zinc-50 transition-colors shadow-sm text-sm">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by name, email, or transaction ID..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm" />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value as 'All' | PaymentStatus); setPage(1); }}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer shadow-sm min-w-[160px] text-sm">
                        <option value="All">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" /><p className="text-sm">{error}</p>
                    <button onClick={fetchDonations} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                {['Donor', 'Amount', 'Type', 'Method', 'Status', 'Date'].map(h => (
                                    <th key={h} className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-16 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" /></td></tr>
                            ) : donations.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-16 text-center text-zinc-400">No donations found.</td></tr>
                            ) : (
                                donations.map((d, index) => {
                                    const cfg = statusConfig[d.payment_status];
                                    const StatusIcon = cfg.icon;
                                    return (
                                        <motion.tr key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
                                            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{d.first_name} {d.last_name}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5">{d.email}</p>
                                                {d.note && <p className="text-xs text-zinc-400 italic mt-0.5 truncate max-w-[180px]">"{d.note}"</p>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-zinc-900 dark:text-zinc-100">{d.currency} {Number(d.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${d.is_one_time ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800' : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'}`}>
                                                    {d.is_one_time ? 'One-time' : 'Recurring'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300 whitespace-nowrap">{d.payment_method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.style}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />{cfg.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{formatDate(d.donated_at)}</td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">Page <span className="font-medium text-zinc-900 dark:text-zinc-100">{page}</span> of <span className="font-medium text-zinc-900 dark:text-zinc-100">{totalPages || 1}</span> ({totalCount} total)</p>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40">Previous</button>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDonations;
