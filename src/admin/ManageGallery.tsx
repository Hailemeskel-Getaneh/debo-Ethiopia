import React, { useState } from 'react';
import {
    Image as ImageIcon,
    Upload,
    Trash2,
    PlayCircle,
    Maximize2
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageGallery: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'All' | 'Images' | 'Videos'>('All');

    // Mock Gallery Data
    const mediaItems = [
        {
            id: '1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
            title: 'School Groundbreaking',
            date: '2026-02-10'
        },
        {
            id: '2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop',
            title: 'Water Well Project',
            date: '2026-02-12'
        },
        {
            id: '3',
            type: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1576091160550-21733e99db29?q=80&w=600&auto=format&fit=crop',
            title: 'Community Health Workshop Highlights',
            date: '2026-02-14',
            duration: '3:45'
        },
        {
            id: '4',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
            title: 'Coding Bootcamp Class',
            date: '2026-02-15'
        },
        {
            id: '5',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
            title: 'New Classroom Supplies',
            date: '2026-02-16'
        },
        {
            id: '6',
            type: 'video',
            thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop',
            title: 'Volunteer Thank You Message',
            date: '2026-02-17',
            duration: '1:20'
        }
    ];

    const filteredMedia = selectedTab === 'All'
        ? mediaItems
        : mediaItems.filter(item =>
            selectedTab === 'Images' ? item.type === 'image' : item.type === 'video'
        );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-[--color-primary-600]" />
                        Media Gallery
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage photos and videos for the gallery.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-4 py-2 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Upload className="w-4 h-4" />
                    Upload Media
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                {['All', 'Images', 'Videos'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab as 'All' | 'Images' | 'Videos')}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${selectedTab === tab
                            ? 'text-[--color-primary-600] dark:text-[--color-primary-400]'
                            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                            }`}
                    >
                        {tab}
                        {selectedTab === tab && (
                            <motion.div
                                layoutId="activeGalleryTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--color-primary-600] dark:bg-[--color-primary-400]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                        <img
                            src={item.type === 'video' ? item.thumbnail : item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                                <p className="text-xs text-white/80">{item.date}</p>
                            </div>

                            <div className="absolute top-2 right-2 flex gap-2">
                                <button className="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors">
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                            </div>

                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <PlayCircle className="w-12 h-12 text-white/80" />
                                </div>
                            )}
                        </div>

                        {/* Video Duration Badge */}
                        {item.type === 'video' && (
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-medium text-white group-hover:opacity-0 transition-opacity">
                                {item.duration}
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Dropzone Placeholder (Visual Only) */}
                <div className="aspect-square border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-400 hover:text-[--color-primary-600] hover:border-[--color-primary-500] hover:bg-[--color-primary-50]/50 dark:hover:bg-[--color-primary-900]/10 transition-all cursor-pointer group">
                    <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Drop files here</span>
                </div>
            </div>
        </div>
    );
};

export default ManageGallery;
