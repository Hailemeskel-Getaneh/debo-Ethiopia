import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm p-4">
                <h1 className="text-xl font-bold">User Dashboard</h1>
            </nav>
            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
