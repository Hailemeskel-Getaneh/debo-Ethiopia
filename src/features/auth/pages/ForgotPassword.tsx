import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Reset Password</h2>
            <p className="text-gray-500 text-center">Enter your email and we'll send you a reset link.</p>
            <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full p-2 border rounded" />
                <button className="w-full bg-zinc-900 text-white p-2 rounded hover:bg-zinc-800">
                    Send Reset Link
                </button>
            </div>
            <div className="text-center">
                <Link to="/login" className="text-zinc-600 hover:underline">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
