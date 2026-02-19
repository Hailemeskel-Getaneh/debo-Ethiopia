import React, { useState } from 'react';
import {
    Briefcase,
    Plus,
    Calendar,
    MapPin,
    MoreHorizontal,
    LayoutGrid,
    List,
    Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageProjects: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock Projects Data
    const projects = [
        {
            id: '1',
            title: 'Clean Water Initiative',
            description: 'Providing clean water sources to rural villages in Ethiopia.',
            location: 'Oromia Region',
            budget: 25000,
            raised: 20000,
            status: 'Active',
            startDate: '2025-01-15',
            endDate: '2025-06-30',
            image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: '2',
            title: 'School Reconstruction',
            description: 'Rebuilding primary schools damaged by recent floods.',
            location: 'Amhara Region',
            budget: 50000,
            raised: 15000,
            status: 'Planning',
            startDate: '2025-04-01',
            endDate: '2025-12-31',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: '3',
            title: 'Mobile Health Clinic',
            description: 'Weekly health checkups for remote communities.',
            location: 'SNNPR',
            budget: 12000,
            raised: 12000,
            status: 'Completed',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop'
        },
        {
            id: '4',
            title: 'Women Empowerment',
            description: 'Skill training workshops for women entrepreneurs.',
            location: 'Addis Ababa',
            budget: 8000,
            raised: 4500,
            status: 'Active',
            startDate: '2025-02-10',
            endDate: '2025-08-20',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop'
        }
    ];

    const filteredProjects = filterStatus === 'All'
        ? projects
        : projects.filter(p => p.status === filterStatus);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[--color-primary-600]" />
                        Projects & Initiatives
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage and track ongoing humanitarian projects.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">Filter</span>
                    </button>
                    <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-4 py-2 rounded-xl font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>
            </div>

            {/* View Toggle & Status Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex gap-4">
                    {['All', 'Active', 'Planning', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`text-sm font-medium transition-colors relative ${filterStatus === status
                                ? 'text-[--color-primary-600] dark:text-[--color-primary-400]'
                                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                                }`}
                        >
                            {status}
                            {filterStatus === status && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[--color-primary-600] dark:bg-[--color-primary-400]"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden group hover:shadow-md transition-shadow"
                        >
                            <div className="h-40 w-full relative overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${project.status === 'Active' ? 'bg-green-500/20 text-green-100 border border-green-500/30' :
                                        project.status === 'Planning' ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30' :
                                            'bg-zinc-800/60 text-zinc-200'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-1 truncate">{project.title}</h3>
                                <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                    {project.location}
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 h-10">
                                    {project.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-zinc-500 font-medium">${project.raised.toLocaleString()} raised</span>
                                        <span className="text-zinc-500">${project.budget.toLocaleString()} goal</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[--color-primary-500] rounded-full"
                                            style={{ width: `${Math.min(100, (project.raised / project.budget) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center text-xs text-zinc-500">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {project.endDate}
                                    </div>
                                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                    {/* List View Implementation (Simplified Table) */}
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Project</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Progress</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                                <img src={project.image} alt="" className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-zinc-100">{project.title}</div>
                                                <div className="text-xs text-zinc-500">{project.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${project.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                            project.status === 'Planning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 w-48">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[--color-primary-500] rounded-full"
                                                    style={{ width: `${Math.min(100, (project.raised / project.budget) * 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-zinc-500">{Math.round((project.raised / project.budget) * 100)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
