'use client';
import { useState } from 'react';
import AdminMovies from '@/components/admin/AdminMovies';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminComments from '@/components/admin/AdminComments';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('movies');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Panel</h1>

            {/* Tabs */}
            <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                    {['movies', 'users', 'comments'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'movies' && <AdminMovies />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'comments' && <AdminComments />}
        </div>
    );
}
