import React, { useState } from 'react';
import {
    BellRing,
    Send,
    History,
    Users,
    Mail,
    ChevronRight,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationLog {
    id: string;
    type: 'News' | 'Event' | 'Broadcast' | 'Update';
    title: string;
    recipientCount: number;
    status: 'Sent' | 'Failed' | 'Draft';
    timestamp: string;
}

const ManageNotifications: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

    // Mock Notification History
    const [history, setHistory] = useState<NotificationLog[]>([
        { id: '1', type: 'News', title: 'New Clean Water Initiative Launch', recipientCount: 1250, status: 'Sent', timestamp: '2026-02-15T10:05:00' },
        { id: '2', type: 'Event', title: 'Annual Charity Gala Invitation', recipientCount: 1250, status: 'Sent', timestamp: '2026-02-10T14:30:00' },
        { id: '3', type: 'Broadcast', title: 'Monthly impact Report - January', recipientCount: 1245, status: 'Sent', timestamp: '2026-02-01T09:00:00' },
        { id: '4', type: 'News', title: 'Youth Coding Bootcamp Graduation', recipientCount: 1240, status: 'Sent', timestamp: '2026-01-25T11:15:00' },
    ]);

    const filteredHistory = history.filter(h =>
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'News': return <Mail className="w-4 h-4" />;
            case 'Event': return <Clock className="w-4 h-4" />;
            case 'Broadcast': return <Send className="w-4 h-4" />;
            default: return <BellRing className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <BellRing className="w-7 h-7 text-primary-600" />
                        Communication Hub
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Send broadcasts and track subscriber notifications.</p>
                </div>
                <button
                    onClick={() => setIsBroadcastOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                    <Send className="w-4 h-4" />
                    New Broadcast
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Subscribers', value: '1,250', icon: Users, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Sent This Month', value: '12', icon: Send, color: 'text-green-600 bg-green-50' },
                    { label: 'Avg Open Rate', value: '64%', icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.color} dark:bg-zinc-800`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* History Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                        <History className="w-5 h-5 text-zinc-400" />
                        Notification History
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                            />
                        </div>
                        <button className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-600 transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/10 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Activity</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Recipients</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sent At</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-medium">
                            {filteredHistory.map((log, index) => (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                                {getTypeIcon(log.type)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{log.title}</div>
                                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{log.type} Trigger</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {log.recipientCount.toLocaleString()} Subscribers
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-800/50">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {log.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-400 hover:text-primary-600 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Manual Broadcast Modal */}
            <AnimatePresence>
                {isBroadcastOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsBroadcastOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center">
                                    <Send className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Send Manual Broadcast</h3>
                                    <p className="text-sm text-zinc-500">Reach everyone in your mailing list instantly.</p>
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newLog: NotificationLog = {
                                    id: (history.length + 1).toString(),
                                    type: 'Broadcast',
                                    title: formData.get('subject') as string,
                                    recipientCount: 1250,
                                    status: 'Sent',
                                    timestamp: new Date().toISOString()
                                };
                                setHistory([newLog, ...history]);
                                setIsBroadcastOpen(false);
                            }}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email Subject</label>
                                        <input
                                            name="subject"
                                            required
                                            placeholder="Important update from DEBO"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Message Content</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Type your message here..."
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                                        <p className="text-xs text-primary-800 dark:text-primary-300 leading-relaxed">
                                            This message will be sent to <strong>1,250 subscribers</strong>. Please review carefully before broadcasting.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsBroadcastOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Now
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

export default ManageNotifications;
