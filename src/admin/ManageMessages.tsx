import React, { useState } from 'react';
import {
    MessageSquare,
    Search,
    Star,
    Trash2,
    Mail,
    Reply,
    User,
    MoreVertical,
    CheckCircle2,
} from 'lucide-react';

interface ContactMessage {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
    is_responded: boolean;
    response: string | null;
    responded_at: string | null;
    created_at: string;
    isStarred: boolean;
}

const ManageMessages: React.FC = () => {
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock data aligned with `contacts` DB table
    const messages: ContactMessage[] = [
        {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            subject: 'Inquiry about volunteering opportunities',
            message: 'Hello, I am interested in volunteering for the upcoming water well project. Could you please provide more details on how to apply?',
            is_responded: false,
            response: null,
            responded_at: null,
            created_at: '2026-02-18T09:30:00',
            isStarred: true,
        },
        {
            id: '2',
            first_name: 'Alice',
            last_name: 'Smith',
            email: 'alice.smith@university.edu',
            subject: 'Collaboration Proposal',
            message: 'Dear DEBO Team, I represent the Student Union at University of Addis Ababa. We would like to collaborate on a fundraising event...',
            is_responded: false,
            response: null,
            responded_at: null,
            created_at: '2026-02-17T14:15:00',
            isStarred: false,
        },
        {
            id: '3',
            first_name: 'Robert',
            last_name: 'Brown',
            email: 'robert.b@company.com',
            subject: 'Donation Receipt Issue',
            message: "I made a donation yesterday but haven't received the tax receipt yet. Can you please check?",
            is_responded: true,
            response: 'Dear Robert, we apologize for the delay. Your receipt has been re-sent to your email address. Please check your spam folder as well.',
            responded_at: '2026-02-16T15:00:00',
            created_at: '2026-02-16T11:45:00',
            isStarred: false,
        },
        {
            id: '4',
            first_name: 'Emily',
            last_name: 'White',
            email: 'emily.w@gmail.com',
            subject: 'Thank you!',
            message: 'Just wanted to say thank you for the amazing work you are doing in the community. Keep it up!',
            is_responded: true,
            response: 'Thank you so much for the kind words, Emily! Your support means the world to us.',
            responded_at: '2026-02-15T17:00:00',
            created_at: '2026-02-15T16:20:00',
            isStarred: true,
        },
    ];

    const filtered = (() => {
        if (filterStatus === 'All') return messages;
        if (filterStatus === 'Unread') return messages.filter(m => !m.is_responded);
        if (filterStatus === 'Responded') return messages.filter(m => m.is_responded);
        if (filterStatus === 'Starred') return messages.filter(m => m.isStarred);
        return messages;
    })();

    const selectedMessage = messages.find(m => m.id === selectedMessageId);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
            {/* Messages List */}
            <div className={`${selectedMessageId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden`}>
                {/* List Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary-600" />
                            Inbox
                        </h2>
                        <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">
                            {messages.length} messages
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input type="text" placeholder="Search messages..."
                            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['All', 'Unread', 'Responded', 'Starred'].map(status => (
                            <button key={status} onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto">
                    {filtered.map((msg) => (
                        <div key={msg.id} onClick={() => setSelectedMessageId(msg.id)}
                            className={`p-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${selectedMessageId === msg.id
                                ? 'bg-primary-50/50 dark:bg-primary-900/10 border-l-4 border-l-primary-600'
                                : 'border-l-4 border-l-transparent'
                                } ${!msg.is_responded ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50/30 dark:bg-zinc-900/50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm ${!msg.is_responded ? 'font-bold text-zinc-900 dark:text-zinc-100' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>
                                    {msg.first_name} {msg.last_name}
                                </h4>
                                <span className={`text-xs ${!msg.is_responded ? 'text-primary-600 font-semibold' : 'text-zinc-400'}`}>
                                    {formatDate(msg.created_at)}
                                </span>
                            </div>
                            <p className={`text-sm mb-1 truncate ${!msg.is_responded ? 'font-semibold text-zinc-800 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                {msg.subject}
                            </p>
                            <p className="text-xs text-zinc-500 line-clamp-1">{msg.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                                {!msg.is_responded && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                                {msg.isStarred && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                                {msg.is_responded && (
                                    <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                        <CheckCircle2 className="w-3 h-3" /> Responded
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Detail View */}
            <div className={`${selectedMessageId ? 'flex' : 'hidden md:flex'} flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex-col overflow-hidden`}>
                {selectedMessage ? (
                    <>
                        {/* Detail Header */}
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
                            <div className="flex gap-4">
                                <button onClick={() => setSelectedMessageId(null)}
                                    className="md:hidden p-2 -ml-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">
                                    <Reply className="w-5 h-5" />
                                </button>
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{selectedMessage.subject}</h2>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-300">
                                            {selectedMessage.first_name} {selectedMessage.last_name}
                                        </span>
                                        <span>&lt;{selectedMessage.email}&gt;</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 mt-1">
                                        {new Date(selectedMessage.created_at).toLocaleDateString()} {new Date(selectedMessage.created_at).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded-lg transition-colors">
                                    <Star className={`w-5 h-5 ${selectedMessage.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 p-8 overflow-y-auto space-y-6">
                            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                                {selectedMessage.message}
                            </p>

                            {/* Existing Response */}
                            {selectedMessage.is_responded && selectedMessage.response && (
                                <div className="border-l-4 border-[--color-primary-500] pl-4 mt-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-[--color-primary-600]" />
                                        <span className="text-xs font-semibold text-[--color-primary-600]">
                                            Response sent on {selectedMessage.responded_at ? new Date(selectedMessage.responded_at).toLocaleDateString() : '—'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {selectedMessage.response}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Reply Area */}
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 shrink-0">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Type your reply here..."
                                        className="w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px] resize-none text-sm"
                                    />
                                    <div className="flex justify-end gap-3 mt-3">
                                        <button className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors">
                                            Save Draft
                                        </button>
                                        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 text-sm">
                                            <Reply className="w-4 h-4" />
                                            Send Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                        </div>
                        <p className="font-medium text-lg text-zinc-900 dark:text-zinc-100">Select a message to view</p>
                        <p className="text-sm mt-1">Choose a message from the list on the left.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageMessages;
