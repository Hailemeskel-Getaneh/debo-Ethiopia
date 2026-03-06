import React, { useState, useEffect, useCallback } from 'react';
import {
    Shield,
    Plus,
    Edit2,
    Trash2,
    Loader2,
    AlertCircle,
    X,
    AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { rolesService } from '../services/roles.service';
import type { UserRole } from '../types/admin';

const ManageRoles: React.FC = () => {
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const fetchRoles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await rolesService.list({ page_size: 100 });
            setRoles(data.results);
        } catch {
            setError('Failed to load roles. Please check your permissions.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const openAdd = () => {
        setModalMode('Add');
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const openEdit = (role: UserRole) => {
        setModalMode('Edit');
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const openDelete = (role: UserRole) => {
        setSelectedRole(role);
        setIsDeleteOpen(true);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
        };
        try {
            if (modalMode === 'Add') {
                await rolesService.create(payload);
            } else if (selectedRole) {
                await rolesService.update(selectedRole.id, payload);
            }
            setIsModalOpen(false);
            fetchRoles();
        } catch {
            setError('Failed to save role. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedRole) return;
        setDeleting(true);
        try {
            await rolesService.delete(selectedRole.id);
            setIsDeleteOpen(false);
            fetchRoles();
        } catch {
            setError('Failed to delete role. It may be assigned to users.');
        } finally {
            setDeleting(false);
        }
    };

    const roleColors: Record<string, string> = {
        super_admin: 'bg-amber-50 text-amber-700 border-amber-200',
        executive_director: 'bg-purple-50 text-purple-700 border-purple-200',
        admin: 'bg-purple-50 text-purple-700 border-purple-200',
        program_coordinator: 'bg-blue-50 text-blue-700 border-blue-200',
        field_officer: 'bg-green-50 text-green-700 border-green-200',
        donor: 'bg-rose-50 text-rose-700 border-rose-200',
        volunteer: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        user: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    };
    const getRoleColor = (name: string) =>
        roleColors[name.toLowerCase().replace(/ /g, '_')] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200';

    // Format EXECUTIVE_DIRECTOR → Executive Director
    const formatRoleName = (name: string) =>
        name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 italic">Role Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Define access levels for all users in the system.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Role
                </button>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <button onClick={fetchRoles} className="ml-auto underline text-xs whitespace-nowrap">Retry</button>
                </div>
            )}

            {/* Roles Grid */}
            {loading ? (
                <div className="h-48 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roles.length === 0 && (
                        <div className="col-span-full text-center py-16 text-zinc-400">
                            <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No roles defined yet. Create one to get started.</p>
                        </div>
                    )}
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                                        <Shield className="w-5 h-5 text-zinc-500" />
                                    </div>
                                    <div>
                                        <span className={`inline-block px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider ${getRoleColor(role.name)}`}>
                                            {formatRoleName(role.name)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEdit(role)}
                                        className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => openDelete(role)}
                                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {role.description || <span className="italic opacity-60">No description provided.</span>}
                            </p>
                            {role.created_at && (
                                <p className="mt-3 text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                                    Created {new Date(role.created_at).toLocaleDateString()}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }} className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-primary-600" />
                                    <h3 className="text-xl font-bold">{modalMode === 'Add' ? 'Create Role' : 'Edit Role'}</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form className="p-6 space-y-5" onSubmit={handleSave}>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Role Name *</label>
                                    <input
                                        name="name"
                                        placeholder="e.g. Volunteer"
                                        defaultValue={selectedRole?.name}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="What can this role do?"
                                        defaultValue={selectedRole?.description}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-700 disabled:opacity-50 transition-all">
                                        {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : modalMode === 'Add' ? 'Create Role' : 'Save Changes'}
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 text-center border border-zinc-100 dark:border-zinc-800">
                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Delete Role?</h3>
                            <p className="text-sm text-zinc-500 mb-2">
                                You are about to delete the <span className="font-bold text-zinc-700 dark:text-zinc-300">"{selectedRole?.name}"</span> role.
                            </p>
                            <p className="text-xs text-red-500 mb-8 font-medium">⚠ Users assigned to this role may lose access.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleDelete} disabled={deleting} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 disabled:opacity-50 transition-all">
                                    {deleting ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageRoles;
