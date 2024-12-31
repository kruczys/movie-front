'use client';
import { useState } from 'react';
import AdminMovies from '@/components/admin/AdminMovies';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminComments from '@/components/admin/AdminComments';
import ImportExport from '@/components/admin/ImportExport';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('movies');

    const tabs = [
        { id: 'movies', label: 'Movies' },
        { id: 'users', label: 'Users' },
        { id: 'comments', label: 'Comments' },
        { id: 'import-export', label: 'Import/Export' }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>

            {/* Tabs */}
            <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === 'movies' && <AdminMovies />}
                {activeTab === 'users' && <AdminUsers />}
                {activeTab === 'comments' && <AdminComments />}
                {activeTab === 'import-export' && <ImportExport />}
            </div>
        </div>
    );
}