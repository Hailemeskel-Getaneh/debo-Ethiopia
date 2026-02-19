import React, { useState } from 'react';
import {
    Newspaper,
    Edit3,
    Trash2,
    Eye,
    Plus,
    Search,
    Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageNews: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock News Data
    const newsItems = [
        {
            id: '1',
            title: 'New Partnership Announced with Global Aid',
            excerpt: 'We are thrilled to announce a strategic partnership with Global Aid International which will help us expand our reach significantly...',
            author: 'Admin User',
            publishedAt: '2026-02-18T10:00:00',
            status: 'Published',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
            views: 1240
        },
        {
            id: '2',
            title: 'Clean Water Project: Phase 2 Complete',
            excerpt: 'The second phase of our clean water initiative in the Oromia region has been successfully completed, providing water to over 500 families.',
            author: 'Sarah Johnson',
            publishedAt: '2026-02-15T14:30:00',
            status: 'Published',
            image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop',
            views: 856
        },
        {
            id: '3',
            title: 'Draft: Upcoming Charity Marathon Details',
            excerpt: 'Join us for our annual charity marathon. Here are the route details and registration information for potential participants.',
            author: 'Admin User',
            publishedAt: null,
            status: 'Draft',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop',
            views: 0
        },
        {
            id: '4',
            title: 'Success Story: Meet Abebe',
            excerpt: 'Abebe, a bright young student from our scholarship program, has just been accepted into university to study engineering.',
            author: 'Michael Scott',
            publishedAt: '2026-02-10T09:15:00',
            status: 'Archived',
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
            views: 2100
        }
    ];

    const filteredNews = filterStatus === 'All'
        ? newsItems
        : newsItems.filter(item => item.status === filterStatus);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not Published';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Newspaper className="w-6 h-6 text-[--color-primary-600]" />
                        News & Updates
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage articles, press releases, and blog posts.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden sm:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20 w-64 shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-4 py-2 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                        <Plus className="w-4 h-4" />
                        Write Article
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Published', 'Draft', 'Archived'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                            ? 'bg-[--color-primary-50] text-[--color-primary-700] ring-1 ring-[--color-primary-200] dark:bg-[--color-primary-900]/20 dark:text-[--color-primary-300] dark:ring-[--color-primary-800]'
                            : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden group hover:shadow-md transition-shadow flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="h-48 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${item.status === 'Published' ? 'bg-green-500/90 text-white' :
                                    item.status === 'Draft' ? 'bg-zinc-500/90 text-white' :
                                        'bg-orange-500/90 text-white'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 leading-tight group-hover:text-[--color-primary-600] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 flex-1">
                                {item.excerpt}
                            </p>

                            {/* Meta & Actions */}
                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(item.publishedAt)}
                                    </span>
                                    {item.status === 'Published' && (
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {item.views}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] dark:hover:bg-[--color-primary-900]/20 rounded-lg transition-colors">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Create New Card (Placeholder for visual balance if needed, or just leave as is) */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: filteredNews.length * 0.1 }}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-[--color-primary-500] hover:bg-[--color-primary-50]/50 dark:hover:bg-[--color-primary-900]/10 transition-all group min-h-[300px]"
                >
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-[--color-primary-100] dark:group-hover:bg-[--color-primary-900]/30 flex items-center justify-center text-zinc-400 group-hover:text-[--color-primary-600] transition-colors mb-4">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium group-hover:text-[--color-primary-700]">Create New Article</span>
                    <span className="text-xs text-zinc-500 mt-1">Start writing a new post</span>
                </motion.button>
            </div>
        </div>
    );
};

export default ManageNews;
