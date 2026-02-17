import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-100 flex">
            <aside className="w-64 bg-zinc-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>Dashboard</li>
                        <li>Users</li>
                        <li>Products</li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
