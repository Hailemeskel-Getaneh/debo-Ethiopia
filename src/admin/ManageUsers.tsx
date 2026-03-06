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
    ShieldCheck,
    ShieldOff,
    Crown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usersService, type UserCreatePayload, type UserUpdatePayload } from '../services/users.service';
import { rolesService } from '../services/roles.service';
import { useAuth } from '../hooks/useAuth';
import type { User } from '../types/admin';
import type { UserRole } from '../types/admin';

const ManageUsers: React.FC = () => {
    const { isSuperAdmin } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | number | null>(null);
    const [selectedRoleId, setSelectedRoleId] = useState<string>('');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params: { page: number; page_size: number; search?: string } = { page, page_size: PAGE_SIZE };
            if (searchTerm) params.search = searchTerm;
            const data = await usersService.list(params);
            setUsers(data.results);
            setTotalCount(data.count);
        } catch {
            setError('Failed to load users. Please check your permissions.');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm]);

    const fetchRoles = useCallback(async () => {
        try {
            const data = await rolesService.list({ page_size: 100 });
            setRoles(data.results);
        } catch {
            // Roles are optional for this page, fail silently
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const getRoleLabel = (user: User) => {
        if (user.is_superuser) return 'Super Admin';
        if (!user.role) return user.is_staff ? 'Staff' : 'User';

        // Match against roles list (ID or Name)
        const roleIdOrName = String(user.role).toUpperCase();
        const rObj = roles.find(r => String(r.id) === String(user.role) || r.name.toUpperCase() === roleIdOrName);

        if (rObj) return rObj.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return roleIdOrName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    const filteredUsers = users.filter(user => {
        if (selectedRoleFilter === 'All') return true;
        const label = getRoleLabel(user).toUpperCase();
        return label === selectedRoleFilter.toUpperCase() || String(user.role).toUpperCase() === selectedRoleFilter.toUpperCase();
    });

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        const roleId = formData.get('role') as string;
        const roleObj = roles.find(r => String(r.id) === roleId);

        // Standard Staff roles (Admin, etc.) usually require is_staff = true in common systems
        const isStaffRole = roleObj ? (roleObj.name.toUpperCase() !== 'USER') : false;

        const payload: UserUpdatePayload = {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            phone_number: formData.get('phone') as string,
            is_staff: isStaffRole,
        };

        if (roleId && roleObj) {
            payload.role = roleObj.name.toUpperCase(); // Sending NAME as 'role' (matches AuthContext logic)
            payload.role_id = roleId;                   // Sending UUID as 'role_id' (matches DB schema)
        } else if (roleId) {
            payload.role = String(roleId).toUpperCase();
            payload.role_id = roleId;
        }

        console.log('Saving User Payload:', payload);

        try {
            if (modalMode === 'Add') {
                const createPayload: UserCreatePayload = {
                    first_name: formData.get('firstName') as string,
                    last_name: formData.get('lastName') as string,
                    phone_number: formData.get('phone') as string,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    re_password: formData.get('rePassword') as string,
                };
                if (roleId && roleObj) {
                    createPayload.role = roleObj.name.toUpperCase();
                    createPayload.role_id = roleId;
                } else if (roleId) {
                    createPayload.role = String(roleId).toUpperCase();
                    createPayload.role_id = roleId;
                }
                await usersService.create(createPayload);
            } else if (selectedUser) {
                await usersService.update(selectedUser.id, payload);
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch {
            setError('Failed to save user. Please check if the email is unique and roles are valid.');
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
            setError('Failed to delete user.');
        }
    };

    const handleGrantSuperAdmin = async (user: User) => {
        setActionLoading(user.id);
        try {
            if (user.is_superuser) {
                await usersService.revokeSuperAdmin(user.id);
            } else {
                await usersService.grantSuperAdmin(user.id);
            }
            fetchUsers();
        } catch {
            setError('Failed to update super admin status.');
        } finally {
            setActionLoading(null);
        }
    };

    const getRoleBadgeClass = (role?: string | number, isSuperuser?: boolean) => {
        if (isSuperuser) return 'bg-amber-50 text-amber-700 border-amber-200';
        const r = String(role || '').toUpperCase();
        if (r === 'SUPER_ADMIN') return 'bg-amber-50 text-amber-700 border-amber-200';
        if (r === 'EXECUTIVE_DIRECTOR' || r === 'ADMIN') return 'bg-purple-50 text-purple-700 border-purple-200';
        if (r === 'PROGRAM_COORDINATOR') return 'bg-blue-50 text-blue-700 border-blue-200';
        if (r === 'FIELD_OFFICER') return 'bg-green-50 text-green-700 border-green-200';
        if (r === 'DONOR') return 'bg-rose-50 text-rose-700 border-rose-200';
        if (r === 'VOLUNTEER') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    };

    const getRoleLabelVisible = (user: User) => {
        if (user.is_superuser) return '⭐ Super Admin';
        return getRoleLabel(user);
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const uniqueRoleFilters = ['All', ...Array.from(new Set(users.map(u => getRoleLabel(u))))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 italic">User Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Manage access, roles, and privileges for all users.</p>
                </div>
                {isSuperAdmin && (
                    <button
                        onClick={() => { setModalMode('Add'); setSelectedUser(null); setSelectedRoleId(''); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add User
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                    />
                </div>
                <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select
                        value={selectedRoleFilter}
                        onChange={(e) => setSelectedRoleFilter(e.target.value)}
                        className="pl-10 pr-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none appearance-none cursor-pointer min-w-[180px]"
                    >
                        {uniqueRoleFilters.map(r => (
                            <option key={r} value={r}>
                                {r === 'All' ? 'All Roles' : r}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <button onClick={fetchUsers} className="ml-auto underline text-xs whitespace-nowrap">Retry</button>
                </div>
            )}

            {/* Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-16 text-center">
                                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-zinc-400 text-sm">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.01 }}
                                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                {user.image_url || user.image ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={(user.image_url || user.image) as string} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm">
                                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                                        {user.first_name} {user.last_name}
                                                        {user.is_superuser && <Crown className="w-3 h-3 text-amber-500" />}
                                                    </div>
                                                    <div className="text-xs text-zinc-400 font-medium">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                                            {user.phone_number || '—'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider ${getRoleBadgeClass(user.role, user.is_superuser)}`}>
                                                {getRoleLabelVisible(user)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {isSuperAdmin && (
                                                    <button
                                                        onClick={() => handleGrantSuperAdmin(user)}
                                                        disabled={actionLoading === user.id}
                                                        title={user.is_superuser ? 'Revoke Super Admin' : 'Grant Super Admin'}
                                                        className={`p-2 rounded-lg transition-colors ${user.is_superuser ? 'text-amber-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
                                                    >
                                                        {actionLoading === user.id
                                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                                            : user.is_superuser ? <ShieldOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />
                                                        }
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setModalMode('Edit');
                                                        setSelectedUser(user);
                                                        const userRoleId = roles.find(r => r.name === user.role || String(r.id) === String(user.role))?.id;
                                                        setSelectedRoleId(String(userRoleId || user.role || ''));
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                {isSuperAdmin && (
                                                    <button
                                                        onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }}
                                                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Page {page} of {totalPages || 1} · {totalCount} total
                    </p>
                    <div className="flex gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Previous</button>
                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold disabled:opacity-30 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <UserIcon className="w-5 h-5 text-primary-600" />
                                    <h3 className="text-xl font-bold">{modalMode === 'Add' ? 'Create New User' : 'Edit User'}</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form className="p-6 space-y-5" onSubmit={handleSave}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">First Name *</label>
                                        <input name="firstName" placeholder="First Name" defaultValue={selectedUser?.first_name} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Name *</label>
                                        <input name="lastName" placeholder="Last Name" defaultValue={selectedUser?.last_name} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Email *</label>
                                        <input name="email" type="email" placeholder="user@example.com" defaultValue={selectedUser?.email} required disabled={modalMode === 'Edit'} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone</label>
                                        <input name="phone" placeholder="+251911000000" defaultValue={selectedUser?.phone_number || ''} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                    </div>
                                    {modalMode === 'Add' && (
                                        <>
                                            <div className="space-y-1">
                                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Password *</label>
                                                <input name="password" type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Confirm Password *</label>
                                                <input name="rePassword" type="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                            </div>
                                        </>
                                    )}
                                    <div className="space-y-1 col-span-2">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</label>
                                        <select
                                            name="role"
                                            value={selectedRoleId}
                                            onChange={(e) => setSelectedRoleId(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">-- Select Role --</option>
                                            {roles.map(r => (
                                                <option key={r.id} value={r.id}>
                                                    {r.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-700 disabled:opacity-50 transition-all">
                                        {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : modalMode === 'Add' ? 'Create User' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 text-center border border-zinc-100 dark:border-zinc-800">
                            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Delete User?</h3>
                            <p className="text-sm text-zinc-500 mb-8">
                                This will permanently remove <span className="font-bold text-zinc-700 dark:text-zinc-300">{selectedUser?.first_name} {selectedUser?.last_name}</span> from the system.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all">Delete</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageUsers;
