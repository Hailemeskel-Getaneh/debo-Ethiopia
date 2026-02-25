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
import { X, AlertTriangle } from 'lucide-react';

interface Program {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

const ManagePrograms: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // UI State for Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    // Mock data aligned with `programs` DB table
    const [programs, setPrograms] = useState<Program[]>([
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
    ]);

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
                        <Layers className="w-6 h-6 text-primary-600" />
                        Programs
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage ongoing services and programs offered by DEBO.
                    </p>
                </div>
                <button
                    onClick={() => { setModalMode('Add'); setSelectedProgram(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
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
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm"
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
                                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                                    <Layers className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 transition-colors">
                                        {program.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                        Created {formatDate(program.created_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={e => { e.stopPropagation(); setModalMode('Edit'); setSelectedProgram(program); setIsModalOpen(true); }}
                                    className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={e => { e.stopPropagation(); setSelectedProgram(program); setIsDeleteOpen(true); }}
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

            {/* Program Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {modalMode === 'Add' ? 'Add New Program' : 'Edit Program Info'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <form className="p-8 space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newProgram: Program = {
                                    id: selectedProgram?.id || (programs.length + 1).toString(),
                                    name: formData.get('name') as string,
                                    description: formData.get('description') as string,
                                    created_at: selectedProgram?.created_at || new Date().toISOString(),
                                };

                                if (modalMode === 'Add') {
                                    setPrograms([newProgram, ...programs]);
                                } else {
                                    setPrograms(programs.map(p => p.id === newProgram.id ? newProgram : p));
                                }
                                setIsModalOpen(false);
                            }}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Program Name</label>
                                        <input name="name" defaultValue={selectedProgram?.name} required placeholder="e.g. Literacy Support"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                                        <textarea name="description" defaultValue={selectedProgram?.description} required placeholder="What does this program do?" rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02]">
                                        {modalMode === 'Add' ? 'Add Program' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Remove Program?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to remove <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedProgram?.name}</span>?
                                This might affect associated projects and events.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedProgram) {
                                            setPrograms(programs.filter(p => p.id !== selectedProgram.id));
                                        }
                                        setIsDeleteOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManagePrograms;
