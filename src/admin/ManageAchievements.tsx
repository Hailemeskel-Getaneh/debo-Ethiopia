import React, { useState } from 'react';
import {
    Award,
    Plus,
    Search,
    Edit2,
    Trash2,
    Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Achievement {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    achieved_at: string;
    created_at: string;
}

const ManageAchievements: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data aligned with `achievements` DB table
    const achievements: Achievement[] = [
        {
            id: '1',
            title: 'Best Nonprofit Organization 2025',
            description: 'Awarded by the East African NGO Council for excellence in community development and transparency.',
            image_url: 'https://images.unsplash.com/photo-1610484799863-1f19bca40e06?q=80&w=600&auto=format&fit=crop',
            achieved_at: '2025-11-20',
            created_at: '2025-11-21T08:00:00',
        },
        {
            id: '2',
            title: '10,000 Lives Impacted Milestone',
            description: 'DEBO reached its mission milestone of directly impacting 10,000 individuals across Ethiopia.',
            image_url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600&auto=format&fit=crop',
            achieved_at: '2025-09-05',
            created_at: '2025-09-06T09:00:00',
        },
        {
            id: '3',
            title: 'UNESCO Partner Organization Status',
            description: 'Officially recognized as a UNESCO partner organization for youth education initiatives.',
            image_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop',
            achieved_at: '2026-01-15',
            created_at: '2026-01-16T10:00:00',
        },
        {
            id: '4',
            title: '$1 Million in Donations Raised',
            description: 'Crossed the $1 million cumulative donations threshold, funding 30+ projects across 5 regions.',
            image_url: null,
            achieved_at: '2026-02-01',
            created_at: '2026-02-02T08:00:00',
        },
    ];

    const filtered = achievements.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Award className="w-6 h-6 text-[--color-primary-600]" />
                        Achievements
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Showcase milestones and awards earned by DEBO.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Plus className="w-4 h-4" />
                    Add Achievement
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Search achievements..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[--color-primary-500]/20 outline-none transition-all shadow-sm" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.length === 0 && (
                    <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center">
                        <Award className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No achievements found.</p>
                    </div>
                )}
                {filtered.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                        {item.image_url ? (
                            <div className="h-44 overflow-hidden">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        ) : (
                            <div className="h-24 bg-gradient-to-br from-[--color-primary-50] to-[--color-secondary-50] dark:from-[--color-primary-900]/20 dark:to-[--color-secondary-900]/20 flex items-center justify-center">
                                <Award className="w-10 h-10 text-[--color-primary-400]" />
                            </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-1.5 text-xs text-[--color-primary-600] font-medium mb-2">
                                <Calendar className="w-3.5 h-3.5" />
                                Achieved: {formatDate(item.achieved_at)}
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mb-2 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                                {item.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-2">
                                <button className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] dark:hover:bg-[--color-primary-900]/20 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageAchievements;
