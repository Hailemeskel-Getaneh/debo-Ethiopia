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
} from 'lucide-react';
import { motion } from 'framer-motion';

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
}

const ManageEvents: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock data aligned with `events` DB table
    const events: Event[] = [
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
    ];

    const filtered = filterStatus === 'All' ? events : events.filter(e => e.status === filterStatus);

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
                <div className="flex items-center gap-3">
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
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
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
                                    <button className="p-2 text-zinc-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageEvents;
