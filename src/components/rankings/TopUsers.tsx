'use client';
import useSWR from 'swr';
import { User } from '@/types';
import Link from 'next/link';

export default function TopUsers() {
    const { data: users, isLoading } = useSWR<User[]>('/api/users/most-active');

    if (isLoading) return <div>Loading active users...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Most Active Users</h2>
            <div className="bg-white rounded-lg shadow">
                {users?.map((user, index) => (
                    <div
                        key={user.id}
                        className="flex items-center p-4 border-b last:border-b-0"
                    >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            {index + 1}
                        </div>
                        <div className="ml-4">
                            <Link
                                href={`/users/${user.id}`}
                                className="font-medium hover:text-blue-500"
                            >
                                {user.username}
                            </Link>
                            <p className="text-sm text-gray-500">
                                Reviews: {user.reviews?.length || 0}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}