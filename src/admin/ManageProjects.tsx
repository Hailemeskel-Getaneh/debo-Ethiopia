import React, { useState } from 'react';
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
} from 'lucide-react';
import { motion } from 'framer-motion';

type ProjectStatus = 'Active' | 'Completed' | 'On Hold' | 'Planning';

interface Project {
    id: string;
    name: string;
    description: string;
    location: string;
    budget: number;
    currency: string;
    start_date: string;
    end_date: string;
    status: ProjectStatus;
    progress_percent: number;
}

const statusStyles: Record<ProjectStatus, string> = {
    Active: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    Completed: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    'On Hold': 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    Planning: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
};

const progressColors: Record<ProjectStatus, string> = {
    Active: 'bg-green-500',
    Completed: 'bg-blue-500',
    'On Hold': 'bg-yellow-500',
    Planning: 'bg-zinc-400',
};

const ManageProjects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | ProjectStatus>('All');

    // Mock data aligned with `projects` DB table
    const projects: Project[] = [
        { id: '1', name: 'Clean Water Well – Somali Region', description: 'Construction of a solar-powered well providing clean water to 3 villages.', location: 'Somali Region, Ethiopia', budget: 45000, currency: 'USD', start_date: '2025-06-01', end_date: '2025-12-31', status: 'Completed', progress_percent: 100 },
        { id: '2', name: 'Youth Vocational Training Center', description: 'Building a fully equipped vocational skills center for unemployed youth.', location: 'Addis Ababa, Ethiopia', budget: 120000, currency: 'USD', start_date: '2025-09-01', end_date: '2026-06-30', status: 'Active', progress_percent: 62 },
        { id: '3', name: 'Mobile Health Clinic Fleet', description: 'Procuring and equipping 3 mobile health clinics to serve remote communities.', location: 'Oromia Region, Ethiopia', budget: 85000, currency: 'USD', start_date: '2026-01-01', end_date: '2026-12-31', status: 'Active', progress_percent: 30 },
        { id: '4', name: 'School Library Initiative', description: 'Supplying books and digital learning resources to 20 rural schools.', location: 'Amhara Region, Ethiopia', budget: 25000, currency: 'USD', start_date: '2025-11-01', end_date: '2026-03-31', status: 'On Hold', progress_percent: 45 },
        { id: '5', name: 'Women Microfinance & Skills Program', description: 'Providing microloans and business training to 500 women entrepreneurs.', location: 'SNNPR, Ethiopia', budget: 60000, currency: 'USD', start_date: '2026-03-01', end_date: '2026-11-30', status: 'Planning', progress_percent: 0 },
    ];

    const filtered = projects.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'All' || p.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[--color-primary-600]" />
                        Projects
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage operational initiatives and track progress.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search by name or location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-[--color-primary-500]/20 outline-none transition-all shadow-sm" />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as 'All' | ProjectStatus)}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer shadow-sm min-w-[160px] text-sm">
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Planning">Planning</option>
                    </select>
                </div>
            </div>

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
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-zinc-400">
                                        No projects match your search.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((project, index) => (
                                    <motion.tr key={project.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.06 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        {/* Name + Location */}
                                        <td className="px-6 py-4 min-w-[220px]">
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">{project.name}</p>
                                            <div className="flex items-center gap-1 text-xs text-zinc-400">
                                                <MapPin className="w-3 h-3" /> {project.location}
                                            </div>
                                        </td>
                                        {/* Progress Bar */}
                                        <td className="px-6 py-4 min-w-[140px]">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-700 ${progressColors[project.status]}`}
                                                        style={{ width: `${project.progress_percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 tabular-nums w-9 text-right">
                                                    {project.progress_percent}%
                                                </span>
                                            </div>
                                        </td>
                                        {/* Budget */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                                                {project.budget.toLocaleString()} {project.currency}
                                            </div>
                                        </td>
                                        {/* Timeline */}
                                        <td className="px-6 py-4 min-w-[180px]">
                                            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(project.start_date)} – {formatDate(project.end_date)}
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full border ${statusStyles[project.status]}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
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
                        Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{filtered.length}</span> of{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{projects.length}</span> projects
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Previous</button>
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProjects;
