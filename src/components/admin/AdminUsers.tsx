'use client';
// import { useState } from 'react';
import { User } from '@/types';
import useSWR from 'swr';
import { api } from '@/lib/api';

export default function AdminUsers() {
    const { data: users, error, mutate } = useSWR<User[]>('/api/users');
    // const [editingId, setEditingId] = useState<number | null>(null);

    const handleRoleChange = async (userId: number, newRole: 'USER' | 'ADMIN') => {
        try {
            await api.patch(`/api/users/${userId}`, { role: newRole });
            await mutate();
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Error updating user role');
        }
    };

    const handleDelete = async (userId: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/api/users/${userId}`);
            await mutate();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    if (error) return <div>Error loading users</div>;
    if (!users) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}