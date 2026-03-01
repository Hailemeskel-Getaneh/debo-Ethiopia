import React, { useState, useEffect, useCallback } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Plus,
    Filter,
    Edit2,
    Trash2,
    Layers,
    Search,
    X,
    Calendar as CalendarIcon,
    AlertTriangle,
    Loader2,
    ImagePlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsService, type EventListParams } from '../services/events.service';
import { programsService } from '../services/programs.service';
import type { Event as APIEvent, Program } from '../types/admin';

const ManageEvents: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState<APIEvent[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // UI State for Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedEvent, setSelectedEvent] = useState<APIEvent | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const params: EventListParams = {
                search: searchTerm || undefined,
            };
            const response = await eventsService.list(params);
            setEvents(response.results);
            setError(null);
        } catch (err) {
            setError('Failed to fetch events. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    const fetchPrograms = useCallback(async () => {
        try {
            const response = await programsService.list();
            setPrograms(response.results);
        } catch (err) {
            console.error('Failed to fetch programs', err);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
        fetchPrograms();
    }, [fetchEvents, fetchPrograms]);

    const getStatus = (event: APIEvent): 'Upcoming' | 'Past' | 'Ongoing' => {
        const now = new Date();
        const start = new Date(event.start_date);
        const end = new Date(event.end_date);
        if (now < start) return 'Upcoming';
        if (now > end) return 'Past';
        return 'Ongoing';
    };

    const filtered = events.filter(e => {
        const status = getStatus(e);
        const matchStatus = filterStatus === 'All' || status === filterStatus;
        return matchStatus;
    });

    const handleDelete = async () => {
        if (!selectedEvent) return;
        try {
            await eventsService.delete(selectedEvent.id);
            setEvents(events.filter(ev => ev.id !== selectedEvent.id));
            setIsDeleteOpen(false);
        } catch {
            alert('Failed to delete event');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string,
            start_date: (formData.get('date') as string) + 'T' + (formData.get('time') as string || '00:00') + ':00',
            end_date: (formData.get('date') as string) + 'T' + (formData.get('time') as string || '23:59') + ':00',
            program_id: formData.get('program_id') ? Number(formData.get('program_id')) : null,
        };

        setSaving(true);
        try {
            let eventResult: APIEvent;
            if (modalMode === 'Add') {
                eventResult = await eventsService.create(payload);
            } else if (selectedEvent) {
                eventResult = await eventsService.update(selectedEvent.id, payload);
            } else {
                return;
            }

            // If an image was selected, upload it
            if (imageFile) {
                try {
                    await eventsService.addImage(eventResult.id, imageFile);
                    // Fetch full event again to get images list correctly
                    eventResult = await eventsService.get(eventResult.id);
                } catch (imgErr) {
                    console.error('Event created but image upload failed', imgErr);
                    alert('Event saved, but image upload failed.');
                }
            }

            if (modalMode === 'Add') {
                setEvents([eventResult, ...events]);
            } else {
                setEvents(events.map(ev => ev.id === eventResult.id ? eventResult : ev));
            }
            setIsModalOpen(false);
            setImageFile(null);
        } catch {
            alert('Failed to save event');
        } finally {
            setSaving(false);
        }
    };

    const formatTime = (dateString: string) =>
        new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const statusStyles: Record<string, string> = {
        Upcoming: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
        Past: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
        Ongoing: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-primary-600" />
                        Events Management
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Schedule and manage upcoming events and activities.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none shadow-sm text-sm"
                        />
                    </div>
                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <select
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="pl-9 pr-8 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none cursor-pointer shadow-sm text-sm"
                        >
                            <option value="All">All Events</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Past">Past</option>
                        </select>
                    </div>
                    <button
                        onClick={() => { setModalMode('Add'); setSelectedEvent(null); setImageFile(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        Create Event
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Events List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
                    <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">Loading amazing events...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No events found</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
                        {searchTerm ? `No events match "${searchTerm}" and status "${filterStatus}"` : "Get started by scheduling your first event."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((event, index) => {
                        const status = getStatus(event);
                        const program = programs.find(p => p.id === event.program_id);
                        const eventImage = event.images?.[0]?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop';

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow group"
                            >
                                {/* Event Date Badge */}
                                <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800 shrink-0">
                                    <span className="text-xs font-bold text-primary-600 uppercase">
                                        {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                        {new Date(event.start_date).getDate()}
                                    </span>
                                </div>

                                {/* Image */}
                                <div className="w-full sm:w-48 h-32 sm:h-auto rounded-lg overflow-hidden shrink-0">
                                    <img src={eventImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{event.title}</h3>
                                            {program && (
                                                <div className="flex items-center gap-1 text-xs text-primary-600 mb-2 font-medium">
                                                    <Layers className="w-3 h-3" /> {program.name}
                                                </div>
                                            )}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {formatTime(event.start_date)} – {formatTime(event.end_date)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
                                            {status}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 flex flex-row items-center justify-end gap-2">
                                        <button
                                            onClick={() => { setModalMode('Edit'); setSelectedEvent(event); setIsModalOpen(true); }}
                                            className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => { setSelectedEvent(event); setIsDeleteOpen(true); }}
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Event Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-zinc-900 dark:text-zinc-100">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            {modalMode === 'Add' ? 'Schedule New Event' : 'Update Event Info'}
                                        </h3>
                                        <p className="text-sm text-zinc-500">Public events and community gatherings.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <form className="p-8 space-y-6 max-h-[75vh] overflow-y-auto" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold">Event Title</label>
                                        <input name="title" defaultValue={selectedEvent?.title} required placeholder="e.g. Community Health Walk"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold">Description</label>
                                        <textarea name="description" defaultValue={selectedEvent?.description} required placeholder="What is this event about?" rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Location</label>
                                        <input name="location" defaultValue={selectedEvent?.location} required placeholder="e.g. Unity Park, Addis Ababa"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Program (Optional)</label>
                                        <select name="program_id" defaultValue={selectedEvent?.program_id || ''}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none">
                                            <option value="">No Program</option>
                                            {programs.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Date</label>
                                        <input name="date" type="date" defaultValue={selectedEvent?.start_date ? new Date(selectedEvent.start_date).toISOString().split('T')[0] : ''} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Time</label>
                                        <input name="time" type="time" defaultValue={selectedEvent?.start_date ? new Date(selectedEvent.start_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold">Event Image</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-200 dark:border-zinc-700 border-dashed rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:border-primary-500 transition-colors cursor-pointer relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            />
                                            <div className="space-y-1 text-center">
                                                {imageFile ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden mb-2 border border-primary-200">
                                                            <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                                                        </div>
                                                        <p className="text-xs text-primary-600 font-medium">{imageFile.name}</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ImagePlus className="mx-auto h-12 w-12 text-zinc-400 group-hover:text-primary-500 transition-colors" />
                                                        <div className="flex text-sm text-zinc-600 dark:text-zinc-400">
                                                            <span className="relative cursor-pointer font-bold text-primary-600">Upload a file</span>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 10MB</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving}
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {modalMode === 'Add' ? 'Create Event' : 'Save Changes'}
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
                            <h3 className="text-xl font-bold mb-2">Delete Event?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedEvent?.title}</span>?
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all">
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageEvents;
