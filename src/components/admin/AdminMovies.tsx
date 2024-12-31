'use client';
import { useState } from 'react';
import { Movie } from '@/types';
import useSWR from 'swr';
import { api } from '@/lib/api';

export default function AdminMovies() {
    const { data: movies, error, mutate } = useSWR<Movie[]>('/api/movies');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Movie>>({});

    const handleEdit = (movie: Movie) => {
        setEditingId(movie.id);
        setEditForm(movie);
    };

    const handleSave = async () => {
        if (!editingId) return;

        try {
            await api.put(`/api/movies/${editingId}`, editForm);
            await mutate(); // Odśwież listę
            setEditingId(null);
            setEditForm({});
        } catch (error) {
            console.error('Error updating movie:', error);
            alert('Error updating movie');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this movie?')) return;

        try {
            await api.delete(`/api/movies/${id}`);
            await mutate(); // Odśwież listę
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Error deleting movie');
        }
    };

    if (error) return <div>Error loading movies</div>;
    if (!movies) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Manage Movies</h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => {/* TODO: Add new movie modal */}}
                    >
                        Add New Movie
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Release Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genres</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === movie.id ? (
                                        <input
                                            type="text"
                                            value={editForm.title || ''}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        movie.title
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === movie.id ? (
                                        <input
                                            type="date"
                                            value={editForm.releaseDate || ''}
                                            onChange={(e) => setEditForm({ ...editForm, releaseDate: e.target.value })}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        new Date(movie.releaseDate).toLocaleDateString()
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {movie.genres?.map(g => g.name).join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editingId === movie.id ? (
                                        <button
                                            onClick={handleSave}
                                            className="text-green-600 hover:text-green-900 mr-4"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(movie)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(movie.id)}
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