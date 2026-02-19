import React from 'react';
import {
    DollarSign,
    Calendar,
    Download,
    CheckCircle2,
    XCircle,
    Clock,
    FileText,
    Users,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageDonations: React.FC = () => {

    // Mock Donation Data
    const donations = [
        {
            id: '1',
            donorName: 'Michael Scott',
            email: 'michael@dunder.mifflin.com',
            amount: 500.00,
            currency: 'USD',
            method: 'Credit Card',
            status: 'Completed',
            date: '2026-02-18T10:30:00',
            type: 'One-time',
            project: 'Clean Water Initiative'
        },
        {
            id: '2',
            donorName: 'Pam Beesly',
            email: 'pam@artschool.edu',
            amount: 50.00,
            currency: 'USD',
            method: 'PayPal',
            status: 'Completed',
            date: '2026-02-17T15:45:00',
            type: 'Monthly',
            project: 'School Reconstruction'
        },
        {
            id: '3',
            donorName: 'Dwight Schrute',
            email: 'dwight@schrute.farms',
            amount: 10000.00,
            currency: 'ETB',
            method: 'Bank Transfer',
            status: 'Pending',
            date: '2026-02-16T09:00:00',
            type: 'One-time',
            project: 'General Fund'
        },
        {
            id: '4',
            donorName: 'Jim Halpert',
            email: 'jim@athlead.com',
            amount: 250.00,
            currency: 'USD',
            method: 'Credit Card',
            status: 'Failed',
            date: '2026-02-15T14:20:00',
            type: 'One-time',
            project: 'Mobile Health Clinic'
        }
    ];

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-[--color-primary-600]" />
                        Donations & Transactions
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Track and manage incoming donations and financial records.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Export</span>
                    </button>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search donors..."
                            className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20 w-64 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Total Raised</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$45,231.00</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Total Donors</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">1,234</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">This Month</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$5,420.00</p>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Donor</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {donations.map((donation, index) => (
                                <motion.tr
                                    key={donation.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300">
                                                {donation.donorName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{donation.donorName}</div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">{donation.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-300">{donation.project}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(donation.amount, donation.currency)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${donation.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' :
                                            donation.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800' :
                                                'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
                                            }`}>
                                            {donation.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> :
                                                donation.status === 'Pending' ? <Clock className="w-3 h-3" /> :
                                                    <XCircle className="w-3 h-3" />}
                                            {donation.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                                        {formatDate(donation.date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                            {donation.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Showing <span className="font-medium">1-4</span> of <span className="font-medium">24</span> transactions</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageDonations;
