import React, { useState } from 'react';
import {
    Mail,
    Search,
    Trash2,
    Download,
    Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Subscriber {
    id: string;
    email: string;
    subscribed_at: string;
}

const ManageSubscribers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data aligned with `subscribers` DB table
    const subscribers: Subscriber[] = [
        { id: '1', email: 'alice@example.com', subscribed_at: '2026-01-03T10:15:00' },
        { id: '2', email: 'bob.johnson@gmail.com', subscribed_at: '2026-01-15T08:00:00' },
        { id: '3', email: 'charlie.b@company.org', subscribed_at: '2026-01-22T14:30:00' },
        { id: '4', email: 'diana.prince@ngo.net', subscribed_at: '2026-02-01T09:45:00' },
        { id: '5', email: 'evan.w@university.edu', subscribed_at: '2026-02-05T11:20:00' },
        { id: '6', email: 'fiona.green@gmail.com', subscribed_at: '2026-02-10T16:00:00' },
        { id: '7', email: 'george.miller@hotmail.com', subscribed_at: '2026-02-14T07:55:00' },
        { id: '8', email: 'hannah.scott@debo.org', subscribed_at: '2026-02-17T12:30:00' },
    ];

    const filtered = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Mail className="w-6 h-6 text-[--color-primary-600]" />
                        Newsletter Subscribers
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage newsletter subscribers and email list.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Subscribers', value: subscribers.length.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Added This Month', value: '3', icon: Mail, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Unsubscribed', value: '0', icon: Trash2, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[--color-primary-500]/20 focus:border-[--color-primary-500] outline-none transition-all shadow-sm"
                />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Subscribed At</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-zinc-400">
                                        <Mail className="w-10 h-10 mx-auto mb-3 text-zinc-300 dark:text-zinc-700" />
                                        <p className="font-medium">No subscribers found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((sub, index) => (
                                    <motion.tr
                                        key={sub.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-sm text-zinc-400 tabular-nums">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[--color-primary-50] dark:bg-[--color-primary-900]/20 flex items-center justify-center shrink-0">
                                                    <Mail className="w-4 h-4 text-[--color-primary-600]" />
                                                </div>
                                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                    {sub.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                                            {formatDate(sub.subscribed_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
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

                {/* Footer */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{filtered.length}</span> of{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{subscribers.length}</span> subscribers
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSubscribers;
