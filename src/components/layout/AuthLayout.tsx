import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
