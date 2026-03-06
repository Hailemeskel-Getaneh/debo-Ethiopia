import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    UserCog,
    Plus,
    Edit2,
    Trash2,
    Loader2,
    AlertCircle,
    X,
    AlertTriangle,
    MapPin,
    Briefcase,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staffsService } from '../services/staffs.service';
import { usersService } from '../services/users.service';
import type { Staff, User } from '../types/admin';

const ManageStaffs: React.FC = () => {
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const fetchStaffs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params: { page: number; page_size: number; search?: string } = { page, page_size: PAGE_SIZE };
            if (searchTerm) params.search = searchTerm;
            const data = await staffsService.list(params);
            setStaffs(data.results);
            setTotalCount(data.count);
        } catch {
            setError('Failed to load staffs. Please check your permissions.');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm]);

    const fetchUsers = useCallback(async () => {
        try {
            const data = await usersService.list({ page_size: 200 });
            setUsers(data.results);
        } catch {
            // Fail silently
        }
    }, []);

    useEffect(() => { fetchStaffs(); }, [fetchStaffs]);
    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const openAdd = () => {
        setModalMode('Add');
        setSelectedStaff(null);
        setIsModalOpen(true);
    };

    const openEdit = (staff: Staff) => {
        setModalMode('Edit');
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        try {
            if (modalMode === 'Add') {
                await staffsService.create({
                    user_id: formData.get('userId') as string,
                    region: formData.get('region') as string,
                    position: formData.get('position') as string,
                });
            } else if (selectedStaff) {
                await staffsService.update(selectedStaff.id, {
                    region: formData.get('region') as string,
                    position: formData.get('position') as string,
                });
            }
            setIsModalOpen(false);
            fetchStaffs();
        } catch {
            setError('Failed to save staff record. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedStaff) return;
        setDeleting(true);
        try {
            await staffsService.delete(selectedStaff.id);
            setIsDeleteOpen(false);
            fetchStaffs();
        } catch {
            setError('Failed to delete staff record.');
        } finally {
            setDeleting(false);
        }
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        return parts.length >= 2
            ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
            : name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 italic">Staff Management</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Assign users to staff positions with regional coverage.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Staff
                </button>
            </div>

            <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search by name, email, region or position..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                />
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <button onClick={fetchStaffs} className="ml-auto underline text-xs whitespace-nowrap">Retry</button>
                </div>
            )}

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Staff Member</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Region</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : staffs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <UserCog className="w-10 h-10 mx-auto mb-3 text-zinc-300" />
                                        <p className="text-zinc-400 text-sm">No staff members found.</p>
                                    </td>
                                </tr>
                            ) : (
                                staffs.map((staff, index) => (
                                    <motion.tr
                                        key={staff.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.01 }}
                                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                {staff.image ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={staff.image} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white text-sm">
                                                        {getInitials(staff.full_name)}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{staff.full_name}</div>
                                                    <div className="text-xs text-zinc-400 font-medium">{staff.email || '—'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {staff.role ? (
                                                <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
                                                    {String(staff.role).replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                                                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                {staff.region || '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                                                <Briefcase className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                {staff.position || '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(staff)}
                                                    className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedStaff(staff); setIsDeleteOpen(true); }}
                                                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
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
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Page {page} of {totalPages || 1} · {totalCount} total
                    </p>
                    <div className="flex gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Previous</button>
                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold disabled:opacity-30 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <UserCog className="w-5 h-5 text-primary-600" />
                                    <h3 className="text-xl font-bold">{modalMode === 'Add' ? 'Add Staff Member' : 'Edit Staff Member'}</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form className="p-6 space-y-5" onSubmit={handleSave}>
                                {modalMode === 'Add' && (
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Select User *</label>
                                        <select name="userId" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all appearance-none cursor-pointer">
                                            <option value="">-- Choose a user --</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>
                                                    {u.first_name} {u.last_name} ({u.email}) {u.role ? `— ${String(u.role).replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        {users.length === 0 && (
                                            <p className="text-xs text-zinc-400">No users available. Create users first.</p>
                                        )}
                                    </div>
                                )}
                                {modalMode === 'Edit' && selectedStaff && (
                                    <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white text-sm">
                                            {getInitials(selectedStaff.full_name)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{selectedStaff.full_name}</p>
                                            <p className="text-xs text-zinc-400">{selectedStaff.email}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Region *</label>
                                        <input name="region" placeholder="e.g. Addis Ababa" defaultValue={selectedStaff?.region} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Position *</label>
                                        <input name="position" placeholder="e.g. Program Coordinator" defaultValue={selectedStaff?.position} required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all" />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-700 disabled:opacity-50 transition-all">
                                        {saving ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : modalMode === 'Add' ? 'Add Staff' : 'Save Changes'}
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
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 text-center border border-zinc-100 dark:border-zinc-800">
                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Remove Staff?</h3>
                            <p className="text-sm text-zinc-500 mb-2">
                                Remove <span className="font-bold text-zinc-700 dark:text-zinc-300">{selectedStaff?.full_name}</span> from staff.
                            </p>
                            <p className="text-xs text-zinc-400 mb-8">Their user account will not be deleted.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                                <button onClick={handleDelete} disabled={deleting} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 disabled:opacity-50 transition-all">
                                    {deleting ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Remove'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageStaffs;
