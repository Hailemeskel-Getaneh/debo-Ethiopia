export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Moderator';
    status: 'Active' | 'Inactive';
    lastActive: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    budget: number;
    raised: number;
    status: 'Active' | 'Planning' | 'Completed';
    startDate: string;
    endDate: string;
    image: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    image: string;
    attendees: number;
    status: 'Upcoming' | 'Past' | 'Ongoing';
}

export interface Donation {
    id: string;
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    method: 'Credit Card' | 'PayPal' | 'Bank Transfer';
    status: 'Completed' | 'Pending' | 'Failed';
    date: string;
    type: 'One-time' | 'Monthly';
    project: string;
}

export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    publishedAt: string | null;
    status: 'Published' | 'Draft' | 'Archived';
    image: string;
    views: number;
}

export interface GalleryItem {
    id: string;
    type: 'image' | 'video';
    url?: string;
    thumbnail?: string;
    title: string;
    date: string;
    duration?: string;
}

export interface Message {
    id: string;
    sender: string;
    email: string;
    subject: string;
    message: string;
    receivedAt: string;
    status: 'Unread' | 'Read' | 'Replied';
    isStarred: boolean;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    category: 'Award' | 'Milestone' | 'Grant';
}
