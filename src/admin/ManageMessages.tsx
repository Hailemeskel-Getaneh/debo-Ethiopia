import React, { useState } from 'react';
import {
    MessageSquare,
    Search,
    Star,
    Trash2,
    Mail,
    Reply,
    User,
    MoreVertical
} from 'lucide-react';


const ManageMessages: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock Messages Data
    const messages = [
        {
            id: '1',
            sender: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Inquiry about volunteering opportunities',
            message: 'Hello, I am interested in volunteering for the upcoming water well project. Could you please provide more details on how to apply?',
            receivedAt: '2026-02-18T09:30:00',
            status: 'Unread',
            isStarred: true
        },
        {
            id: '2',
            sender: 'Alice Smith',
            email: 'alice.smith@university.edu',
            subject: 'Collaboration Proposal',
            message: 'Dear DEBO Team, I represent the Student Union at University of Addis Ababa. We would like to collaborate on a fundraising event...',
            receivedAt: '2026-02-17T14:15:00',
            status: 'Read',
            isStarred: false
        },
        {
            id: '3',
            sender: 'Robert Brown',
            email: 'robert.b@company.com',
            subject: 'Donation Receipt Issue',
            message: 'I made a donation yesterday but haven\'t received the tax receipt yet. Can you please check?',
            receivedAt: '2026-02-16T11:45:00',
            status: 'Replied',
            isStarred: false
        },
        {
            id: '4',
            sender: 'Emily White',
            email: 'emily.w@gmail.com',
            subject: 'Thank you!',
            message: 'Just wanted to say thank you for the amazing work you are doing in the community. Keep it up!',
            receivedAt: '2026-02-15T16:20:00',
            status: 'Read',
            isStarred: true
        }
    ];

    const filteredMessages = filterStatus === 'All'
        ? messages
        : messages.filter(m => m.status === filterStatus);

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
            <div className={`${selectedMessage ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden`}>
                {/* List Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[--color-primary-600]" />
                            Inbox
                        </h2>
                        <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">
                            {messages.length} messages
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {['All', 'Unread', 'Read', 'Replied'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg.id)}
                            className={`p-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${selectedMessage === msg.id ? 'bg-[--color-primary-50]/50 dark:bg-[--color-primary-900]/10 border-l-4 border-l-[--color-primary-600]' : 'border-l-4 border-l-transparent'
                                } ${msg.status === 'Unread' ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50/30 dark:bg-zinc-900/50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm ${msg.status === 'Unread' ? 'font-bold text-zinc-900 dark:text-zinc-100' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>
                                    {msg.sender}
                                </h4>
                                <span className={`text-xs ${msg.status === 'Unread' ? 'text-[--color-primary-600] font-semibold' : 'text-zinc-400'}`}>
                                    {formatDate(msg.receivedAt)}
                                </span>
                            </div>
                            <p className={`text-sm mb-1 truncate ${msg.status === 'Unread' ? 'font-semibold text-zinc-800 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                {msg.subject}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500 line-clamp-1">
                                {msg.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                {msg.status === 'Unread' && (
                                    <span className="w-2 h-2 rounded-full bg-[--color-primary-500]"></span>
                                )}
                                {msg.isStarred && (
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                )}
                                {msg.status === 'Replied' && (
                                    <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                        <Reply className="w-3 h-3" /> Replied
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Detail View */}
            <div className={`${selectedMessage ? 'flex' : 'hidden md:flex'} flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex-col overflow-hidden`}>
                {selectedMessage ? (
                    (() => {
                        const msg = messages.find(m => m.id === selectedMessage);
                        if (!msg) return null;
                        return (
                            <>
                                {/* Detail Header */}
                                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="md:hidden p-2 -ml-2 text-zinc-500 hover:bg-zinc-100 rounded-lg"
                                        >
                                            <Reply className="w-5 h-5" />
                                        </button>
                                        <div>
                                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{msg.subject}</h2>
                                            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                                <span className="font-medium text-zinc-900 dark:text-zinc-300">{msg.sender}</span>
                                                <span>&lt;{msg.email}&gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right text-xs text-zinc-400 mr-2">
                                            <p>{new Date(msg.receivedAt).toLocaleDateString()}</p>
                                            <p>{new Date(msg.receivedAt).toLocaleTimeString()}</p>
                                        </div>
                                        <button className="p-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded-lg transition-colors">
                                            <Star className={`w-5 h-5 ${msg.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
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
                                <div className="flex-1 p-8 overflow-y-auto">
                                    <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                                        {msg.message}
                                    </p>
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
                                                className="w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-primary-500]/20 min-h-[120px] resize-none"
                                            />
                                            <div className="flex justify-end gap-3 mt-3">
                                                <button className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors">
                                                    Save Draft
                                                </button>
                                                <button className="flex items-center gap-2 bg-[--color-primary-600] text-white px-6 py-2 rounded-lg font-medium hover:bg-[--color-primary-700] transition-colors shadow-lg shadow-[--color-primary-500]/20">
                                                    <Reply className="w-4 h-4" />
                                                    Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()
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
