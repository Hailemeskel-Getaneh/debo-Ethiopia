import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <button className="w-full bg-zinc-900 text-white p-2 rounded hover:bg-zinc-800">
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
