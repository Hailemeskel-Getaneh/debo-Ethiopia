import React, { useState, useEffect, useCallback } from 'react';
import {
    Briefcase,
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    MapPin,
    Calendar,
    DollarSign,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { projectsService } from '../services/projects.service';
import type { Project, ProjectStatus } from '../types/admin';

const statusStyles: Record<ProjectStatus, string> = {
    active: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    completed: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    planned: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
};

const progressColors: Record<ProjectStatus, string> = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    planned: 'bg-zinc-400',
};

const ManageProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | ProjectStatus>('All');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await projectsService.list({
                page, page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm }),
                ...(filterStatus !== 'All' && { status: filterStatus }),
            });
            setProjects(data.results);
            setTotalCount(data.count);
        } catch {
            setError('Failed to load projects. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, filterStatus]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string,
            budget: Number(formData.get('budget')),
            currency: formData.get('currency') as string,
            status: formData.get('status') as ProjectStatus,
            start_date: formData.get('start_date') as string,
            end_date: formData.get('end_date') as string,
            progress_percent: Number(formData.get('progress_percent') || 0),
        };
        try {
            if (modalMode === 'Add') {
                await projectsService.create(payload);
            } else if (selectedProject) {
                await projectsService.update(selectedProject.id, payload);
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch {
            alert('Failed to save project. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedProject) return;
        try {
            await projectsService.delete(selectedProject.id);
            setIsDeleteOpen(false);
            fetchProjects();
        } catch {
            alert('Failed to delete project.');
        }
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-primary-600" />
                        Projects
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {loading ? 'Loading...' : `${totalCount} total projects`}
                    </p>
                </div>
                <button
                    onClick={() => { setModalMode('Add'); setSelectedProject(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by name or location..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all shadow-sm" />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value as 'All' | ProjectStatus); setPage(1); }}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer shadow-sm min-w-[160px] text-sm">
                        <option value="All">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="planned">Planned</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                    <button onClick={fetchProjects} className="ml-auto text-xs underline">Retry</button>
                </div>
            )}

            {/* Projects Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Progress</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Timeline</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-16 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" />
                                </td></tr>
                            ) : projects.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-16 text-center text-zinc-400">No projects found.</td></tr>
                            ) : (
                                projects.map((project, index) => (
                                    <motion.tr key={project.id}
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4 min-w-[220px]">
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">{project.name}</p>
                                            <div className="flex items-center gap-1 text-xs text-zinc-400">
                                                <MapPin className="w-3 h-3" /> {project.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 min-w-[140px]">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all duration-700 ${progressColors[project.status]}`}
                                                        style={{ width: `${project.progress_percent}%` }} />
                                                </div>
                                                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 tabular-nums w-9 text-right">
                                                    {project.progress_percent}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                                                {Number(project.budget).toLocaleString()} {project.currency}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 min-w-[180px]">
                                            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(project.start_date)} – {formatDate(project.end_date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full border ${statusStyles[project.status]}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setSelectedProject(project); setModalMode('Edit'); setIsModalOpen(true); }}
                                                    className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => { setSelectedProject(project); setIsDeleteOpen(true); }}
                                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
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
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Page <span className="font-medium text-zinc-900 dark:text-zinc-100">{page}</span> of{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{totalPages || 1}</span>
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                            className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40">Previous</button>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 transition-colors disabled:opacity-40">Next</button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            {modalMode === 'Add' ? 'Add New Project' : 'Edit Project'}
                                        </h3>
                                        <p className="text-sm text-zinc-500">Define project goals and resources.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>
                            <form className="p-8 space-y-6 max-h-[75vh] overflow-y-auto" onSubmit={handleSave}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Project Name</label>
                                        <input name="name" defaultValue={selectedProject?.name} required placeholder="e.g. Well Construction"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                                        <textarea name="description" defaultValue={selectedProject?.description} required rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Location</label>
                                        <input name="location" defaultValue={selectedProject?.location} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                                        <select name="status" defaultValue={selectedProject?.status || 'planned'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none">
                                            <option value="planned">Planned</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Progress (%)</label>
                                        <div className="flex items-center gap-4">
                                            <input name="progress_percent" type="range" min="0" max="100" step="1"
                                                defaultValue={selectedProject?.progress_percent || 0}
                                                className="flex-1 accent-primary-600"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    const display = e.target.nextElementSibling;
                                                    if (display) display.textContent = `${val}%`;
                                                }}
                                            />
                                            <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 w-12 text-right tabular-nums">
                                                {selectedProject?.progress_percent || 0}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Budget</label>
                                        <input name="budget" type="number" defaultValue={selectedProject?.budget} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Currency</label>
                                        <select name="currency" defaultValue={selectedProject?.currency || 'USD'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none">
                                            <option>USD</option><option>EUR</option><option>ETB</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Date</label>
                                        <input name="start_date" type="date" defaultValue={selectedProject?.start_date} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Date</label>
                                        <input name="end_date" type="date" defaultValue={selectedProject?.end_date} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving}
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {modalMode === 'Add' ? 'Launch Project' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
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
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Delete Project?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedProject?.name}</span>?
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">Cancel</button>
                                <button onClick={handleDelete}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all">Confirm Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProjects;
