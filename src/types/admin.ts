// Paginated response wrapper from Django REST Framework
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// ── Auth ──────────────────────────────────────────────────────────────────
export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    image?: string | null;
    is_staff: boolean;
}

// ── Projects ──────────────────────────────────────────────────────────────
export type ProjectStatus = 'planned' | 'active' | 'completed';

export interface Project {
    id: number;
    name: string;
    description: string;
    location: string;
    budget: number;
    currency: string;
    start_date: string;
    end_date: string;
    status: ProjectStatus;
    progress_percent: number;
}

// ── Donations ─────────────────────────────────────────────────────────────
export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface Donation {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    amount: number;
    currency: string;
    is_one_time: boolean;
    payment_method: string;
    transaction_id: string;
    payment_status: PaymentStatus;
    note: string | null;
    donated_at: string;
    recurring_plan_id?: number | null;
}

export interface RecurringPlan {
    id: number;
    donor_name?: string;
    amount: number;
    currency: string;
    interval: 'monthly' | 'yearly';
    is_active: boolean;
    start_date: string;
}

// ── News ──────────────────────────────────────────────────────────────────
export interface NewsImage {
    id: number;
    image: string;
}

export interface NewsVideo {
    id: number;
    video_url: string;
}

export interface NewsArticle {
    id: number;
    title: string;
    content: string;
    author: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        image?: string | null;
    };
    images: NewsImage[];
    videos: NewsVideo[];
    is_published: boolean;
    published_at: string | null;
    updated_at: string;
}

// ── Events ────────────────────────────────────────────────────────────────
export interface EventImage {
    id: number;
    image: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    images: EventImage[];
    program_id?: number | null;
}

// ── Gallery ───────────────────────────────────────────────────────────────
export interface GalleryImage {
    id: number;
    image: string;
}

export interface GalleryVideo {
    id: number;
    video_url: string;
}

export interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    images: GalleryImage[];
    videos: GalleryVideo[];
    created_at: string;
}

// ── Achievements ──────────────────────────────────────────────────────────
export interface Achievement {
    id: number;
    title: string;
    description: string;
    image_url?: string | null;
    achieved_at: string;
}

// ── Contact Messages ──────────────────────────────────────────────────────
export interface ContactMessage {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
    is_responded: boolean;
    response: string | null;
    responded_at: string | null;
    created_at: string;
}

// ── Subscribers ───────────────────────────────────────────────────────────
export interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
}

// ── Programs ──────────────────────────────────────────────────────────────
export interface Program {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at?: string;
}

// ── Stats / Metrics ───────────────────────────────────────────────────────
export interface StatMetric {
    id: number;
    name: string;
    value: number;
    updated_at: string;
}

// ── Staff ─────────────────────────────────────────────────────────────────
export interface Staff {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    email?: string;
    image?: string | null;
}

// ── User Roles ────────────────────────────────────────────────────────────
export interface UserRole {
    id: number;
    name: string;
    description?: string;
}

// ── Notifications ─────────────────────────────────────────────────────────
export type NotificationType = 'News' | 'Event' | 'Broadcast' | 'Update';
export type NotificationStatus = 'Sent' | 'Failed' | 'Draft' | 'Pending';

export interface NotificationLog {
    id: number;
    type: NotificationType;
    title: string;
    recipient_count: number;
    status: NotificationStatus;
    timestamp: string;
    message?: string;
}

export interface BroadcastPayload {
    subject: string;
    message: string;
}
