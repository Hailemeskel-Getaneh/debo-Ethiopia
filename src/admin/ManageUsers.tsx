import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Filter,
    Edit2,
    Trash2,
    UserPlus,
    Loader2,
    AlertCircle,
    X,
    User as UserIcon,
    AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usersService } from '../services/users.service';
import type { User } from '../types/admin';

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<'All' | 'staff' | 'user'>('All');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page,
                page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm }),
                ...(selectedRole === 'staff' && { is_staff: true }),
                ...(selectedRole === 'user' && { is_staff: false }),
            };
            const data = await usersService.list(params);
            setUsers(data.results);
            setTotalCount(data.count);
        } catch (err: unknown) {
            const errorData = err as { response?: { data?: { detail?: string; non_field_errors?: string[] } } };
            const detail = errorData.response?.data;
            setError(detail?.detail || detail?.non_field_errors?.[0] || 'Failed to load users. Please check your permissions.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, selectedRole]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);

        const payload = {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone_number: formData.get('phone') as string,
            is_staff: formData.get('role') === 'staff',
        };

        try {
            if (modalMode === 'Add') {
                alert('Add User functionality usually requires an invitation flow.');
            } else if (selectedUser) {
                await usersService.update(selectedUser.id, payload);
                setIsModalOpen(false);
                fetchUsers();
            }
        } catch {
            alert('Failed to save user changes.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await usersService.delete(selectedUser.id);
            setIsDeleteOpen(false);
            fetchUsers();
        } catch {
            alert('Failed to delete user.');
        }
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    if (loading && users.length === 0) {
        return (
            <div className="h-96 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 italic">User Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Manage access and roles for team members.</p>
                </div>
                <button
                    onClick={() => { setModalMode('Add'); setSelectedUser(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95"
                >
                    <UserPlus className="w-5 h-5" />
                    Add New User
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none"
                    />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select
                        value={selectedRole}
                        onChange={(e) => { setSelectedRole(e.target.value as 'All' | 'staff' | 'user'); setPage(1); }}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer min-w-[180px]"
                    >
                        <option value="All">All Tiers</option>
                        <option value="staff">Staff / Admin</option>
                        <option value="user">Regular Users</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{error}</p>
                    <button onClick={fetchUsers} className="ml-auto underline text-xs">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">User / Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {users.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.01 }}
                                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            {user.image ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={user.image} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm">
                                                    {user.first_name[0]}{user.last_name[0]}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-xs text-zinc-400 font-medium">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                                        {user.phone_number || '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.is_staff ? (
                                            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
                                                Staff Admin
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase tracking-wider">
                                                Regular User
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => { setModalMode('Edit'); setSelectedUser(user); setIsModalOpen(true); }}
                                                className="p-2 text-zinc-400 hover:text-primary-600 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }}
                                                className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
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

                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Page {page} of {totalPages || 1}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 border rounded-xl text-xs font-bold disabled:opacity-30"
                        >
                            Previous
                        </button>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold disabled:opacity-30"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border">
                            <div className="flex items-center justify-between p-6 border-b">
                                <div className="flex items-center gap-3">
                                    <UserIcon className="w-5 h-5 text-primary-600" />
                                    <h3 className="text-xl font-bold">{modalMode === 'Add' ? 'Invite User' : 'Edit Member'}</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full"><X className="w-5 h-5" /></button>
                            </div>
                            <form className="p-8 space-y-6" onSubmit={handleSave}>
                                <div className="grid grid-cols-2 gap-6">
                                    <input name="firstName" placeholder="First Name" defaultValue={selectedUser?.first_name} required className="w-full px-4 py-3 rounded-xl border" />
                                    <input name="lastName" placeholder="Last Name" defaultValue={selectedUser?.last_name} required className="w-full px-4 py-3 rounded-xl border" />
                                    <input name="email" type="email" placeholder="Email" defaultValue={selectedUser?.email} required className="w-full px-4 py-3 rounded-xl border" />
                                    <input name="phone" placeholder="Phone" defaultValue={selectedUser?.phone_number || ''} className="w-full px-4 py-3 rounded-xl border" />
                                    <select name="role" defaultValue={selectedUser?.is_staff ? 'staff' : 'user'} className="w-full px-4 py-3 rounded-xl border">
                                        <option value="user">Regular User</option>
                                        <option value="staff">Staff / Admin</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border font-bold uppercase text-xs">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold uppercase text-xs">
                                        {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Save Profile'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 text-center">
                            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Revoke Access?</h3>
                            <p className="text-sm text-zinc-500 mb-8">This action is permanent.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border font-bold">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold">Confirm Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageUsers;
