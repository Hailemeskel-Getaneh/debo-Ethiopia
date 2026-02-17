import React from 'react';

const Register: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>
            <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <button className="w-full bg-zinc-900 text-white p-2 rounded hover:bg-zinc-800">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Register;
