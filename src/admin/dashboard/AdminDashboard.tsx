import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
                    <h3 className="text-zinc-500 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold mt-1">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
                    <h3 className="text-zinc-500 text-sm font-medium">Active Orders</h3>
                    <p className="text-3xl font-bold mt-1">56</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
                    <h3 className="text-zinc-500 text-sm font-medium">Revenue</h3>
                    <p className="text-3xl font-bold mt-1">$12,345</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;