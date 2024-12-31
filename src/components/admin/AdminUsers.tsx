'use client';
import { useState } from 'react';
import { User } from '@/types';
import { api } from '@/lib/api';
import useSWR from "swr";
import { mutate } from 'swr';

export default function AdminUsers() {
    const { data: users, error } = useSWR<User[]>('/api/users');
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleRoleChange = async (userId: number, newRole: 'USER' | 'ADMIN') => {
        try {
            await api.patch(`/api/users/${userId}`, { role: newRole });
            mutate('/api/users');
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/api/users/${userId}`);
            mutate('/api/users');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">User Management</h2>
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
                    {users?.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
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
    );
}