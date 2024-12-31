'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { User, Movie } from '@/types';
import MovieCard from '@/components/movies/MovieCard';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'favorites' | 'watchlist' | 'ignored'>('favorites');
    const { data: user } = useSWR<User>('/api/users/me');
    const { data: favorites } = useSWR<Movie[]>('/api/users/me/favorites');
    const { data: watchlist } = useSWR<Movie[]>('/api/users/me/watchlist');
    const { data: ignored } = useSWR<Movie[]>('/api/users/me/ignored');

    if (!user) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white p-6 rounded-lg shadow">
    <h1 className="text-2xl font-bold mb-2">{user.username}'s Profile</h1>
    <p className="text-gray-600">{user.email}</p>
        </div>

    {/* Movie Lists Tabs */}
    <div className="border-b">
    <nav className="-mb-px flex space-x-8">
        {['favorites', 'watchlist', 'ignored'].map((tab) => (
        <button
            key={tab}
    onClick={() => setActiveTab(tab as typeof activeTab)}
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

    {/* Movie Lists */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === 'favorites' && favorites?.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
))}
    {activeTab === 'watchlist' && watchlist?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
    ))}
    {activeTab === 'ignored' && ignored?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
    ))}
    </div>
    </div>
);
}