import React, { useState } from 'react';
import {
    Layers,
    Plus,
    Search,
    Edit2,
    Trash2,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Program {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

const ManagePrograms: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Mock data aligned with `programs` DB table
    const programs: Program[] = [
        {
            id: '1',
            name: 'Clean Water Initiative',
            description: 'Providing access to clean, safe drinking water to rural communities through solar-powered well construction and maintenance programs.',
            created_at: '2025-01-10T08:00:00',
        },
        {
            id: '2',
            name: 'Youth Education Support',
            description: 'Sponsoring school supplies, tutoring, and vocational training for underprivileged youth across Ethiopia.',
            created_at: '2025-03-22T09:30:00',
        },
        {
            id: '3',
            name: 'Community Health Outreach',
            description: 'Mobile health clinics delivering basic medical care, vaccinations, nutrition awareness, and maternal health services.',
            created_at: '2025-06-05T11:00:00',
        },
        {
            id: '4',
            name: 'Women Empowerment Program',
            description: 'Microfinance, business skills training, and mentorship for women entrepreneurs in underserved areas.',
            created_at: '2025-09-15T14:00:00',
        },
    ];

    const filtered = programs.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Layers className="w-6 h-6 text-[--color-primary-600]" />
                        Programs
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage ongoing services and programs offered by DEBO.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Plus className="w-4 h-4" />
                    Add Program
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[--color-primary-500]/20 focus:border-[--color-primary-500] outline-none transition-all shadow-sm"
                />
            </div>

            {/* Program Cards */}
            <div className="grid gap-4">
                {filtered.length === 0 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center">
                        <Layers className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">No programs found.</p>
                    </div>
                )}
                {filtered.map((program, index) => (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.07 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between p-5 cursor-pointer group"
                            onClick={() => setExpandedId(expandedId === program.id ? null : program.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[--color-primary-50] dark:bg-[--color-primary-900]/20 flex items-center justify-center shrink-0">
                                    <Layers className="w-5 h-5 text-[--color-primary-600]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[--color-primary-600] transition-colors">
                                        {program.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                        Created {formatDate(program.created_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={e => { e.stopPropagation(); }}
                                    className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] dark:hover:bg-[--color-primary-900]/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={e => { e.stopPropagation(); }}
                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expandedId === program.id
                                    ? <ChevronUp className="w-5 h-5 text-zinc-400" />
                                    : <ChevronDown className="w-5 h-5 text-zinc-400" />
                                }
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedId === program.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                            {program.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManagePrograms;
