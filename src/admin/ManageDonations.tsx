import React, { useState } from 'react';
import {
    DollarSign,
    Search,
    Filter,
    Download,
    CheckCircle2,
    XCircle,
    Clock,
    RefreshCcw,
} from 'lucide-react';
import { motion } from 'framer-motion';

type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

interface Donation {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    amount: number;
    currency: string;
    is_one_time: boolean;
    payment_method: string;
    transaction_id: string;
    payment_status: PaymentStatus;
    note: string | null;
    donated_at: string;
}

const ManageDonations: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | PaymentStatus>('All');

    // Mock data aligned with `donations` DB table
    const donations: Donation[] = [
        { id: '1', first_name: 'Michael', last_name: 'Scott', email: 'michael@dunder.com', amount: 500.00, currency: 'USD', is_one_time: true, payment_method: 'Credit Card', transaction_id: 'TXN001A', payment_status: 'completed', note: 'Keep up the great work!', donated_at: '2026-02-18T10:30:00' },
        { id: '2', first_name: 'Lydia', last_name: 'Haile', email: 'lydia@example.com', amount: 150.00, currency: 'ETB', is_one_time: false, payment_method: 'Mobile Money', transaction_id: 'TXN002B', payment_status: 'completed', note: null, donated_at: '2026-02-17T08:15:00' },
        { id: '3', first_name: 'James', last_name: 'Morgen', email: 'james.m@company.org', amount: 1200.00, currency: 'USD', is_one_time: true, payment_method: 'Bank Transfer', transaction_id: 'TXN003C', payment_status: 'pending', note: 'For the water well project', donated_at: '2026-02-16T14:00:00' },
        { id: '4', first_name: 'Aisha', last_name: 'Bekele', email: 'aisha.b@gmail.com', amount: 250.00, currency: 'USD', is_one_time: false, payment_method: 'PayPal', transaction_id: 'TXN004D', payment_status: 'failed', note: null, donated_at: '2026-02-15T09:45:00' },
        { id: '5', first_name: 'Tom', last_name: 'Wu', email: 'tom.wu@gmail.com', amount: 50.00, currency: 'USD', is_one_time: true, payment_method: 'Credit Card', transaction_id: 'TXN005E', payment_status: 'refunded', note: 'Requested refund', donated_at: '2026-02-12T11:00:00' },
    ];

    const statusConfig: Record<PaymentStatus, { label: string; icon: React.ElementType; style: string }> = {
        completed: { label: 'Completed', icon: CheckCircle2, style: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' },
        pending: { label: 'Pending', icon: Clock, style: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800' },
        failed: { label: 'Failed', icon: XCircle, style: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' },
        refunded: { label: 'Refunded', icon: RefreshCcw, style: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700' },
    };

    const filtered = donations.filter(d => {
        const name = `${d.first_name} ${d.last_name}`.toLowerCase();
        const matchSearch = name.includes(searchTerm.toLowerCase()) || d.email.includes(searchTerm.toLowerCase()) || d.transaction_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'All' || d.payment_status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalAmount = filtered.filter(d => d.payment_status === 'completed').reduce((acc, d) => acc + d.amount, 0);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-primary-600" />
                        Donations
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Track and manage all incoming donations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs text-zinc-400">Completed Total</p>
                        <p className="text-xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2.5 rounded-xl font-medium hover:bg-zinc-50 transition-colors shadow-sm text-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by name, email, or transaction ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all shadow-sm" />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as 'All' | PaymentStatus)}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer shadow-sm min-w-[160px] text-sm">
                        <option value="All">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Donor</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-zinc-400">
                                        No donations match your filter.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((d, index) => {
                                    const cfg = statusConfig[d.payment_status];
                                    const StatusIcon = cfg.icon;
                                    return (
                                        <motion.tr
                                            key={d.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{d.first_name} {d.last_name}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5">{d.email}</p>
                                                {d.note && <p className="text-xs text-zinc-400 italic mt-0.5 truncate max-w-[180px]">"{d.note}"</p>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-zinc-900 dark:text-zinc-100">{d.currency} {d.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${d.is_one_time ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800' : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'}`}>
                                                    {d.is_one_time ? 'One-time' : 'Monthly'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300 whitespace-nowrap">{d.payment_method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.style}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {cfg.label}
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
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{filtered.length}</span> of{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{donations.length}</span> donations
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Previous</button>
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDonations;
