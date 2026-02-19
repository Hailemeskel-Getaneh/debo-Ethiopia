import React from 'react';
import {
    Award,
    Calendar,
    Plus,
    Edit2,
    Trash2,
    Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageAchievements: React.FC = () => {
    // Mock Achievements Data
    const achievements = [
        {
            id: '1',
            title: 'Best Nonprofit Organization 2025',
            description: 'Awarded by the East African NGO Council for excellence in community development and transparency.',
            date: '2025-11-20',
            image: 'https://images.unsplash.com/photo-1610484799863-1f19bca40e06?q=80&w=600&auto=format&fit=crop',
            category: 'Award'
        },
        {
            id: '2',
            title: '1,000 Families Supported',
            description: 'Reached a major milestone of providing direct support to over one thousand families in the region.',
            date: '2025-08-15',
            image: 'https://images.unsplash.com/photo-1576091160550-21733e99db29?q=80&w=600&auto=format&fit=crop',
            category: 'Milestone'
        },
        {
            id: '3',
            title: 'Global Water Initiative Grant',
            description: 'Received a substantial grant to expand our clean water projects to three new districts.',
            date: '2025-05-10',
            image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop',
            category: 'Grant'
        },
        {
            id: '4',
            title: 'Community Choice Award',
            description: 'Voted by the local community as the most impactful program of the year.',
            date: '2024-12-05',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
            category: 'Award'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Award className="w-6 h-6 text-[--color-primary-600]" />
                        Achievements & Awards
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Showcase the organization's awards, milestones, and recognition.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-4 py-2 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Plus className="w-4 h-4" />
                    Add Achievement
                </button>
            </div>

            {/* Timeline / List */}
            <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-12 py-4">
                {achievements.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-6 w-5 h-5 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center ${item.category === 'Award' ? 'bg-yellow-400' :
                            item.category === 'Grant' ? 'bg-green-500' :
                                'bg-[--color-primary-500]'
                            }`}></div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-6 group hover:shadow-md transition-shadow">
                            {/* Image */}
                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${item.category === 'Award' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                item.category === 'Grant' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                                    'bg-[--color-primary-50] text-[--color-primary-700] dark:bg-[--color-primary-900]/20 dark:text-[--color-primary-400]'
                                                }`}>
                                                {item.category}
                                            </span>
                                            <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] dark:hover:bg-[--color-primary-900]/20 rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                                    <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageAchievements;
