import React from 'react';

const ManageUsers: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800">
                    Add New User
                </button>
            </div>
            <div className="p-0">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 text-zinc-500 text-sm font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        <tr>
                            <td className="px-6 py-4">Alice Smith</td>
                            <td className="px-6 py-4">alice@example.com</td>
                            <td className="px-6 py-4"><span className="bg-zinc-100 text-zinc-700 px-2 py-1 rounded text-xs">Admin</span></td>
                            <td className="px-6 py-4 text-right text-zinc-400">...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
