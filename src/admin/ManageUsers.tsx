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
import { motion, AnimatePresence } from 'framer-motion';
import { X, User as UserIcon, AlertTriangle } from 'lucide-react';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    image_url: string | null;
    role: 'User' | 'Admin' | 'Super Admin';
    position: string;
    team: 'Board of Directors' | 'On the Ground in Ethiopia' | 'None';
    status: 'Active' | 'Inactive';
    created_at: string;
}

const ManageUsers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');

    // UI State for Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Mock data aligned with requirements
    const [users, setUsers] = useState<User[]>([
        { id: '1', first_name: 'Alice', last_name: 'Smith', email: 'alice@admin.com', phone_number: '+251911000001', image_url: 'https://i.pravatar.cc/150?u=1', role: 'Super Admin', position: 'President', team: 'Board of Directors', status: 'Active', created_at: '2025-11-01T08:00:00' },
        { id: '2', first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', phone_number: '+251911000002', image_url: 'https://i.pravatar.cc/150?u=2', role: 'Admin', position: 'Project Manager', team: 'On the Ground in Ethiopia', status: 'Active', created_at: '2025-11-15T09:00:00' },
        { id: '3', first_name: 'Charlie', last_name: 'Brown', email: 'charlie@example.com', phone_number: null, image_url: 'https://i.pravatar.cc/150?u=3', role: 'User', position: 'Teacher', team: 'On the Ground in Ethiopia', status: 'Inactive', created_at: '2025-12-03T10:30:00' },
        { id: '4', first_name: 'Diana', last_name: 'Prince', email: 'diana@admin.com', phone_number: '+251911000004', image_url: 'https://i.pravatar.cc/150?u=4', role: 'Admin', position: 'Admin', team: 'None', status: 'Active', created_at: '2026-01-07T11:00:00' },
        { id: '5', first_name: 'Evan', last_name: 'Wright', email: 'evan@example.com', phone_number: '+251911000005', image_url: 'https://i.pravatar.cc/150?u=5', role: 'User', position: 'None', team: 'None', status: 'Active', created_at: '2026-01-20T12:00:00' },
    ]);

    const roleColors: Record<string, string> = {
        'Super Admin': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        Admin: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
        User: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    };

    const filteredUsers = users.filter(user =>
        (selectedRole === 'All' || user.role === selectedRole) &&
        (`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.position.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">User Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage access and roles for team members.</p>
                </div>
                <button
                    onClick={() => { setModalMode('Add'); setSelectedUser(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
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
                        <option value="Super Admin">Super Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">User / Contact</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Team</th>
                                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</th>
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
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.position}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.team !== 'None' ? (
                                            <span className="px-2.5 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                                {user.team}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-zinc-400 font-medium">No Team</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${roleColors[user.role] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200'}`}>
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
                                            <button
                                                onClick={() => { setModalMode('Edit'); setSelectedUser(user); setIsModalOpen(true); }}
                                                className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }}
                                                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
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

            {/* User Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            {modalMode === 'Add' ? 'Add New User' : 'Edit User Profile'}
                                        </h3>
                                        <p className="text-sm text-zinc-500">Configure access and contact details.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <form className="p-8 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const role = formData.get('role') as User['role'];
                                const position = formData.get('position') as string;
                                const team = formData.get('team') as User['team'];

                                // Validation: If team is selected, position cannot be 'None'
                                if (team !== 'None' && position === 'None') {
                                    alert('A position must be assigned when a team is selected.');
                                    return;
                                }

                                // Validation: Password for admins (mock validation)
                                const password = formData.get('password');
                                if (modalMode === 'Add' && (role === 'Admin' || role === 'Super Admin') && !password) {
                                    alert('A password is required for administrative accounts.');
                                    return;
                                }

                                const newUser: User = {
                                    id: selectedUser?.id || (users.length + 1).toString(),
                                    first_name: formData.get('firstName') as string,
                                    last_name: formData.get('lastName') as string,
                                    email: formData.get('email') as string,
                                    phone_number: formData.get('phone') as string,
                                    role: role,
                                    position: position,
                                    team: team,
                                    status: formData.get('status') as 'Active' | 'Inactive',
                                    image_url: selectedUser?.image_url || null,
                                    created_at: selectedUser?.created_at || new Date().toISOString(),
                                };

                                if (modalMode === 'Add') {
                                    setUsers([newUser, ...users]);
                                } else {
                                    setUsers(users.map(u => u.id === newUser.id ? newUser : u));
                                }
                                setIsModalOpen(false);
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">First Name</label>
                                        <input
                                            name="firstName"
                                            defaultValue={selectedUser?.first_name}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="e.g. Abebe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Last Name</label>
                                        <input
                                            name="lastName"
                                            defaultValue={selectedUser?.last_name}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="e.g. Kebede"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            defaultValue={selectedUser?.email}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="abebe@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Phone Number</label>
                                        <input
                                            name="phone"
                                            defaultValue={selectedUser?.phone_number || ''}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="+251..."
                                        />
                                    </div>

                                    {/* Role Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">System Role</label>
                                        <select
                                            name="role"
                                            defaultValue={selectedUser?.role || 'User'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer"
                                            onChange={(e) => {
                                                // Trigger re-render to show/hide password if needed
                                                const val = e.target.value;
                                                const pwdField = document.getElementById('password-section');
                                                if (pwdField) {
                                                    if (modalMode === 'Add' && (val === 'Admin' || val === 'Super Admin')) {
                                                        pwdField.classList.remove('hidden');
                                                    } else {
                                                        pwdField.classList.add('hidden');
                                                    }
                                                }
                                            }}
                                        >
                                            <option value="User">User (Normal)</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Super Admin">Super Admin</option>
                                        </select>
                                    </div>

                                    {/* Position Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Position / Job Title</label>
                                        <select
                                            name="position"
                                            defaultValue={selectedUser?.position || 'None'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer"
                                        >
                                            <option value="None">No Specific Position</option>
                                            <option value="President">President</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Admin">Admin (Position)</option>
                                            <option value="Volunteer">Volunteer</option>
                                        </select>
                                    </div>

                                    {/* Team Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Team</label>
                                        <select
                                            name="team"
                                            defaultValue={selectedUser?.team || 'None'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer"
                                        >
                                            <option value="None">No Team</option>
                                            <option value="Board of Directors">Board of Directors</option>
                                            <option value="On the Ground in Ethiopia">On the Ground in Ethiopia</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Account Status</label>
                                        <select
                                            name="status"
                                            defaultValue={selectedUser?.status || 'Active'}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                    {/* Conditional Password Field (for Add mode only) */}
                                    <div id="password-section" className={`md:col-span-2 space-y-2 ${modalMode === 'Add' && (selectedUser?.role === 'Admin' || selectedUser?.role === 'Super Admin') ? '' : 'hidden'}`}>
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Access Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="Create a secure password"
                                        />
                                        <p className="text-[10px] text-zinc-400">Required for Admin and Super Admin accounts.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {modalMode === 'Add' ? 'Create Account' : 'Save Changes'}
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDeleteOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Delete User Account?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedUser?.first_name} {selectedUser?.last_name}</span>?
                                This action cannot be undone and will remove all associated access.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    No, Keep
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedUser) {
                                            setUsers(users.filter(u => u.id !== selectedUser.id));
                                        }
                                        setIsDeleteOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageUsers;
