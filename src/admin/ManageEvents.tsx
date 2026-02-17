import React from 'react';

const ManageProducts: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Products</h2>
                <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800">
                    Add Product
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="aspect-square bg-zinc-100 rounded-md mb-4 flex items-center justify-center text-zinc-400">Image</div>
                    <h3 className="font-bold">Product A</h3>
                    <p className="text-zinc-500 text-sm">$49.99</p>
                </div>
                {/* More products */}
            </div>
        </div>
    );
};

export default ManageProducts;
