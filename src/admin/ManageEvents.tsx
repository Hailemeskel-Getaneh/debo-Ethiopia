import React, { useState } from 'react';
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
    AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
    id: string;
    program_id: string | null;
    program_name: string | null;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    created_at: string;
    status: 'Upcoming' | 'Past' | 'Ongoing';
    image: string;
    attendees: number;
    // UI/Form specific properties to resolve TS errors
    date?: string;
    time?: string;
    price?: number;
    currency?: string;
    is_published?: boolean;
    image_url?: string;
}

const ManageEvents: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // UI State for Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Mock data aligned with `events` DB table
    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            program_id: 'p2',
            program_name: 'Youth Education Support',
            title: 'Annual Charity Gala',
            description: 'A night of fundraising and celebration for the DEBO community.',
            location: 'Grand Hotel, Addis Ababa',
            start_date: '2025-12-15T18:00:00',
            end_date: '2025-12-15T23:00:00',
            created_at: '2025-10-01T10:00:00',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
            attendees: 120,
            status: 'Upcoming',
        },
        {
            id: '2',
            program_id: 'p3',
            program_name: 'Community Health Outreach',
            title: 'Community Health Awareness',
            description: 'Workshops on basic hygiene and nutrition for rural communities.',
            location: 'Community Center, Hawassa',
            start_date: '2025-10-20T09:00:00',
            end_date: '2025-10-22T16:00:00',
            created_at: '2025-09-10T09:00:00',
            image: 'https://images.unsplash.com/photo-1576091160550-21733e99db29?q=80&w=600&auto=format&fit=crop',
            attendees: 450,
            status: 'Past',
        },
        {
            id: '3',
            program_id: 'p2',
            program_name: 'Youth Education Support',
            title: 'Youth Coding Bootcamp',
            description: 'Teaching basic programming skills to high school students.',
            location: 'Tech Hub, Adama',
            start_date: '2025-11-05T10:00:00',
            end_date: '2025-11-05T15:00:00',
            created_at: '2025-10-05T08:00:00',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop',
            attendees: 30,
            status: 'Upcoming',
        },
        {
            id: '4',
            program_id: 'p1',
            program_name: 'Clean Water Initiative',
            title: 'Water Well Inauguration',
            description: 'Opening ceremony for the new solar-powered well built for the village.',
            location: 'Rural Village, Somali Region',
            start_date: '2025-09-01T10:00:00',
            end_date: '2025-09-01T14:00:00',
            created_at: '2025-08-01T08:00:00',
            image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop',
            attendees: 200,
            status: 'Past',
        },
    ]);

    const filtered = events.filter(e => {
        const matchStatus = filterStatus === 'All' || e.status === filterStatus;
        const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

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
                        onClick={() => { setModalMode('Add'); setSelectedEvent(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        Create Event
                    </button>
                </div>
            </div>

            {/* Events List */}
            <div className="grid gap-4">
                {filtered.map((event, index) => (
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
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{event.title}</h3>
                                    {event.program_name && (
                                        <div className="flex items-center gap-1 text-xs text-primary-600 mb-2 font-medium">
                                            <Layers className="w-3 h-3" /> {event.program_name}
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
                                <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[event.status]}`}>
                                    {event.status}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                                {event.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold">
                                            T
                                        </div>
                                    ))}
                                    <div className="w-7 h-7 rounded-full bg-primary-50 dark:bg-primary-900/30 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-primary-600">
                                        +{event.attendees}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
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
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Event Modal (Add/Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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

                            <form className="p-8 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newEvent: Event = {
                                    id: selectedEvent?.id || (events.length + 1).toString(),
                                    program_id: selectedEvent?.program_id || null,
                                    program_name: selectedEvent?.program_name || null,
                                    title: formData.get('title') as string,
                                    description: formData.get('description') as string,
                                    location: formData.get('location') as string,
                                    date: formData.get('date') as string,
                                    time: formData.get('time') as string,
                                    price: Number(formData.get('price')),
                                    currency: formData.get('currency') as string,
                                    is_published: formData.get('published') === 'true',
                                    image_url: selectedEvent?.image_url || selectedEvent?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
                                    image: selectedEvent?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
                                    start_date: (formData.get('date') as string) ? `${formData.get('date')}T${formData.get('time') || '00:00'}:00` : (selectedEvent?.start_date || new Date().toISOString()),
                                    end_date: selectedEvent?.end_date || new Date().toISOString(),
                                    created_at: selectedEvent?.created_at || new Date().toISOString(),
                                    status: selectedEvent?.status || 'Upcoming',
                                    attendees: selectedEvent?.attendees || 0
                                };

                                if (modalMode === 'Add') {
                                    setEvents([newEvent, ...events]);
                                } else {
                                    setEvents(events.map(ev => ev.id === newEvent.id ? newEvent : ev));
                                }
                                setIsModalOpen(false);
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Event Title</label>
                                        <input name="title" defaultValue={selectedEvent?.title} required placeholder="e.g. Community Health Walk"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                                        <textarea name="description" defaultValue={selectedEvent?.description} required placeholder="What is this event about?" rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Location</label>
                                        <input name="location" defaultValue={selectedEvent?.location} required placeholder="e.g. Unity Park, Addis Ababa"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date</label>
                                        <input name="date" type="date" defaultValue={selectedEvent?.date} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Time</label>
                                        <input name="time" type="time" defaultValue={selectedEvent?.time} required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Price (0 for Free)</label>
                                        <div className="flex gap-2">
                                            <input name="price" type="number" defaultValue={selectedEvent?.price} required placeholder="0.00"
                                                className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                                            <select name="currency" defaultValue={selectedEvent?.currency || 'USD'}
                                                className="w-24 px-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 outline-none cursor-pointer">
                                                <option>USD</option>
                                                <option>ETB</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex items-center gap-2 pt-2">
                                        <input name="published" type="checkbox" id="published-chk" defaultChecked={selectedEvent?.is_published} value="true"
                                            className="w-5 h-5 rounded border-zinc-300 text-primary-600 focus:ring-primary-500" />
                                        <label htmlFor="published-chk" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                                            Publish event immediately
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02]">
                                        {modalMode === 'Add' ? 'Create Event' : 'Save Changes'}
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Delete Event?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">{selectedEvent?.title}</span>?
                                This cannot be undone.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedEvent) {
                                            setEvents(events.filter(ev => ev.id !== selectedEvent.id));
                                        }
                                        setIsDeleteOpen(false);
                                    }}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all">
                                    Delete Event
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
