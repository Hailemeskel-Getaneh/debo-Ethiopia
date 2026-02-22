import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <header className="p-4 border-b bg-brand-main text-white">User Header</header>
            <main id="main-content" className="p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
