import React, { useState } from 'react';
import {
    Search,
    Filter,
    Edit2,
    Trash2,
    UserPlus,
    CheckCircle,
    XCircle,
    Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageUsers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');

    // Mock Data
    const users = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Project Manager', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Volunteer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=5' },
    ];

    const filteredUsers = users.filter(user =>
        (selectedRole === 'All' || user.role === selectedRole) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">User Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage access and roles for team members.</p>
                </div>
                <button className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-zinc-900/20">
                    <UserPlus className="w-5 h-5" />
                    Add New User
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent outline-none transition-all shadow-sm"
                    />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none appearance-none cursor-pointer shadow-sm min-w-[180px]"
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800 shadow-sm" src={user.avatar} alt="" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</div>
                                                <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' :
                                            user.role === 'Project Manager' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' :
                                                'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {user.status === 'Active' ? (
                                                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-xs font-medium border border-green-200 dark:border-green-800">
                                                    <CheckCircle className="w-3.5 h-3.5" /> Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">
                                                    <XCircle className="w-3.5 h-3.5" /> Inactive
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-zinc-400 hover:text-[--color-primary-600] hover:bg-[--color-primary-50] rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">1</span> to <span className="font-medium text-zinc-900 dark:text-zinc-100">5</span> of <span className="font-medium text-zinc-900 dark:text-zinc-100">120</span> results</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors">Previous</button>
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
