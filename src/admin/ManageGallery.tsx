import React, { useState } from 'react';
import {
    Image as ImageIcon,
    Plus,
    Search,
    Trash2,
    Eye,
    Film,
    Calendar,
    User2,
} from 'lucide-react';
import { motion } from 'framer-motion';

type MediaType = 'Image' | 'Video';

interface GalleryItem {
    id: string;
    user_id: string;
    uploaded_by: string;
    media_id: string;
    media_type: MediaType;
    resource_url: string;
    title: string;
    description: string | null;
    uploaded_at: string;
    updated_at: string;
}

const ManageGallery: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'All' | MediaType>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data aligned with `gallery` DB table (with media_types)
    const mediaItems: GalleryItem[] = [
        { id: '1', user_id: 'u1', uploaded_by: 'Admin User', media_id: 'm1', media_type: 'Image', resource_url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop', title: 'Well Inauguration', description: 'Opening of the solar-powered well in Somali Region.', uploaded_at: '2025-09-02T10:00:00', updated_at: '2025-09-02T10:00:00' },
        { id: '2', user_id: 'u2', uploaded_by: 'Project Manager', media_id: 'm1', media_type: 'Image', resource_url: 'https://images.unsplash.com/photo-1576091160550-21733e99db29?q=80&w=600&auto=format&fit=crop', title: 'Health Camp 2025', description: null, uploaded_at: '2025-10-22T16:00:00', updated_at: '2025-10-22T16:00:00' },
        { id: '3', user_id: 'u1', uploaded_by: 'Admin User', media_id: 'm2', media_type: 'Video', resource_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop', title: 'Coding Bootcamp Highlights', description: 'Recap video of the youth coding bootcamp.', uploaded_at: '2025-11-06T09:00:00', updated_at: '2025-11-06T09:00:00' },
        { id: '4', user_id: 'u2', uploaded_by: 'Project Manager', media_id: 'm1', media_type: 'Image', resource_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop', title: 'Annual Gala Night', description: 'Photos from the Annual Charity Gala 2025.', uploaded_at: '2025-12-16T08:00:00', updated_at: '2025-12-16T08:00:00' },
        { id: '5', user_id: 'u1', uploaded_by: 'Admin User', media_id: 'm2', media_type: 'Video', resource_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop', title: 'Community Impact Documentary', description: 'Short documentary on DEBO\'s 2025 community impact.', uploaded_at: '2026-01-10T11:00:00', updated_at: '2026-01-10T11:00:00' },
        { id: '6', user_id: 'u2', uploaded_by: 'Project Manager', media_id: 'm1', media_type: 'Image', resource_url: 'https://images.unsplash.com/photo-1610484799863-1f19bca40e06?q=80&w=600&auto=format&fit=crop', title: 'Award Ceremony', description: null, uploaded_at: '2026-01-25T14:00:00', updated_at: '2026-01-25T14:00:00' },
    ];

    const filtered = mediaItems.filter(item => {
        const matchTab = selectedTab === 'All' || item.media_type === selectedTab;
        const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTab && matchSearch;
    });

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-[--color-primary-600]" />
                        Gallery
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage photos and videos in the media gallery.</p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Plus className="w-4 h-4" />
                    Upload Media
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by title..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[--color-primary-500]/20 outline-none transition-all shadow-sm" />
                </div>
                <div className="flex gap-2">
                    {(['All', 'Image', 'Video'] as const).map(tab => (
                        <button key={tab} onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedTab === tab
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 && (
                    <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center">
                        <ImageIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No media found.</p>
                    </div>
                )}
                {filtered.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.07 }}
                        className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        {/* Thumbnail */}
                        <div className="h-48 overflow-hidden relative">
                            <img src={item.resource_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {/* Type badge */}
                            <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white ${item.media_type === 'Video' ? 'bg-purple-600/90' : 'bg-zinc-700/80'}`}>
                                {item.media_type === 'Video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                {item.media_type}
                            </div>
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors">
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 bg-red-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1 truncate">{item.title}</h3>
                            {item.description && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">{item.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
                                <span className="flex items-center gap-1"><User2 className="w-3 h-3" />{item.uploaded_by}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(item.uploaded_at)}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageGallery;
