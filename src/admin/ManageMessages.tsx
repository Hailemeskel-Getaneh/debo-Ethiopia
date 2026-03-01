import React, { useState, useEffect, useCallback } from 'react';
import {
    MessageSquare, Search, Trash2, Mail, Reply, User,
    CheckCircle2, Loader2, AlertCircle
} from 'lucide-react';
import { messagesService } from '../services/messages.service';
import type { ContactMessage } from '../types/admin';

const ManageMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 20;

    const fetchMessages = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await messagesService.list({
                page, page_size: PAGE_SIZE,
                ...(searchTerm && { search: searchTerm })
            });
            setMessages(data.results);
            setTotalCount(data.count);
        } catch { setError('Failed to load messages.'); }
        finally { setLoading(false); }
    }, [page, searchTerm]);

    useEffect(() => { fetchMessages(); }, [fetchMessages]);

    const filtered = messages.filter(m => {
        const matchTab = filterStatus === 'All' ||
            (filterStatus === 'Unread' && !m.is_responded) ||
            (filterStatus === 'Responded' && m.is_responded);
        return matchTab;
    });

    const selected = messages.find(m => m.id === selectedId);

    const handleSendReply = async () => {
        if (!selected || !replyText.trim()) return;
        setSending(true);
        try {
            const updated = await messagesService.respond(selected.id, replyText);
            setMessages(prev => prev.map(m => m.id === updated.id ? updated : m));
            setReplyText('');
        } catch { alert('Failed to send response.'); }
        finally { setSending(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this message permanently?')) return;
        try {
            await messagesService.delete(id);
            if (selectedId === id) setSelectedId(null);
            fetchMessages();
        } catch { alert('Failed to delete.'); }
    };

    const formatDate = (d: string) => {
        const date = new Date(d);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
        if (diff === 0) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (diff === 1) return 'Yesterday';
        if (diff < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
            {/* Messages List */}
            <div className={`${selectedId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden`}>
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary-600" /> Inbox
                        </h2>
                        <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">{totalCount}</span>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['All', 'Unread', 'Responded'].map(status => (
                            <button key={status} onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>
                        : error ? <div className="p-4 text-sm text-red-500 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>
                            : filtered.map(msg => (
                                <div key={msg.id} onClick={() => setSelectedId(msg.id)}
                                    className={`p-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-l-4 ${selectedId === msg.id ? 'bg-primary-50/50 dark:bg-primary-900/10 border-l-primary-600' : 'border-l-transparent'} ${!msg.is_responded ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50/30 dark:bg-zinc-900/50'}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm ${!msg.is_responded ? 'font-bold text-zinc-900 dark:text-zinc-100' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>
                                            {msg.first_name} {msg.last_name}
                                        </h4>
                                        <span className={`text-xs ${!msg.is_responded ? 'text-primary-600 font-semibold' : 'text-zinc-400'}`}>{formatDate(msg.created_at)}</span>
                                    </div>
                                    <p className="text-sm mb-1 truncate text-zinc-600 dark:text-zinc-400">{msg.subject}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {!msg.is_responded && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                                        {msg.is_responded && <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded"><CheckCircle2 className="w-3 h-3" />Responded</div>}
                                    </div>
                                </div>
                            ))}
                    {/* Pagination for list */}
                    {!loading && totalCount > PAGE_SIZE && (
                        <div className="p-3 flex gap-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="flex-1 py-1.5 text-xs border rounded-lg hover:bg-zinc-50 disabled:opacity-40">Prev</button>
                            <button onClick={() => setPage(p => p + 1)} disabled={messages.length < PAGE_SIZE} className="flex-1 py-1.5 text-xs bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-40">Next</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex-col overflow-hidden`}>
                {selected ? (
                    <>
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start">
                            <div className="flex gap-4">
                                <button onClick={() => setSelectedId(null)} className="md:hidden p-2 -ml-2 text-zinc-500 hover:bg-zinc-100 rounded-lg"><Reply className="w-5 h-5" /></button>
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{selected.subject}</h2>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-300">{selected.first_name} {selected.last_name}</span>
                                        <span>&lt;{selected.email}&gt;</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 mt-1">{new Date(selected.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(selected.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto space-y-6">
                            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">{selected.message}</p>

                            {selected.is_responded && selected.response && (
                                <div className="border-l-4 border-primary-500 pl-4 mt-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary-600" />
                                        <span className="text-xs font-semibold text-primary-600">
                                            Response sent on {selected.responded_at ? new Date(selected.responded_at).toLocaleDateString() : '—'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{selected.response}</p>
                                </div>
                            )}
                        </div>

                        {!selected.is_responded && (
                            <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0"><User className="w-5 h-5 text-zinc-500" /></div>
                                    <div className="flex-1">
                                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type your reply here..."
                                            className="w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px] resize-none text-sm" />
                                        <div className="flex justify-end mt-3">
                                            <button onClick={handleSendReply} disabled={sending || !replyText.trim()}
                                                className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg text-sm disabled:opacity-60">
                                                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                                Send Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
