import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-zinc-50">
            <aside className="w-64 bg-zinc-900 text-white p-4">Admin Sidebar</aside>
            <div className="flex-1">
                <header className="p-4 border-b bg-white">Admin Header</header>
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
