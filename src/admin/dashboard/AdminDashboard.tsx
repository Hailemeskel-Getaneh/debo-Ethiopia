import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold">Total Donations</h2>
                    <p className="text-3xl font-bold text-primary-600">$0.00</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold">New Messages</h2>
                    <p className="text-3xl font-bold text-secondary-500">0</p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold">Subscribers</h2>
                    <p className="text-3xl font-bold text-accent-500">0</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
