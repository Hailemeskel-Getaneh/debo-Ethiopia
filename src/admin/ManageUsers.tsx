import React, { useState } from 'react';
import {
    Search,
    Filter,
    Edit2,
    Trash2,
    UserPlus,
    CheckCircle,
    XCircle,
    Mail,
    Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
    id: string;
    role_id: string;
    role_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    image_url: string | null;
    status: 'Active' | 'Inactive';
    created_at: string;
}

const ManageUsers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');

    // Mock data aligned with `users` and `roles` DB tables
    const users: User[] = [
        { id: '1', role_id: 'r1', role_name: 'Admin', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', phone_number: '+251911000001', image_url: 'https://i.pravatar.cc/150?u=1', status: 'Active', created_at: '2025-11-01T08:00:00' },
        { id: '2', role_id: 'r2', role_name: 'Project Manager', first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', phone_number: '+251911000002', image_url: 'https://i.pravatar.cc/150?u=2', status: 'Active', created_at: '2025-11-15T09:00:00' },
        { id: '3', role_id: 'r3', role_name: 'Viewer', first_name: 'Charlie', last_name: 'Brown', email: 'charlie@example.com', phone_number: null, image_url: 'https://i.pravatar.cc/150?u=3', status: 'Inactive', created_at: '2025-12-03T10:30:00' },
        { id: '4', role_id: 'r1', role_name: 'Admin', first_name: 'Diana', last_name: 'Prince', email: 'diana@example.com', phone_number: '+251911000004', image_url: 'https://i.pravatar.cc/150?u=4', status: 'Active', created_at: '2026-01-07T11:00:00' },
        { id: '5', role_id: 'r4', role_name: 'Volunteer', first_name: 'Evan', last_name: 'Wright', email: 'evan@example.com', phone_number: '+251911000005', image_url: 'https://i.pravatar.cc/150?u=5', status: 'Active', created_at: '2026-01-20T12:00:00' },
    ];

    const roleColors: Record<string, string> = {
        Admin: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
        'Project Manager': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
        Volunteer: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
        Viewer: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    };

    const filteredUsers = users.filter(user =>
        (selectedRole === 'All' || user.role_name === selectedRole) &&
        (`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        placeholder="Search by name or email..."
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
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Contact</th>
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
                                            {user.image_url ? (
                                                <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800 shadow-sm" src={user.image_url} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-500 text-sm ring-2 ring-white dark:ring-zinc-800">
                                                    {user.first_name[0]}{user.last_name[0]}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-xs text-zinc-400 mt-0.5">
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                                            <Mail className="w-3.5 h-3.5 text-zinc-400" /> {user.email}
                                        </div>
                                        {user.phone_number && (
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-zinc-400" /> {user.phone_number}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${roleColors[user.role_name] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200'}`}>
                                            {user.role_name}
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
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">1</span> to{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{filteredUsers.length}</span> of{' '}
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{users.length}</span> results
                    </p>
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
