import { useState } from 'react';
import { Movie } from '@/types';
import { useMovies } from '@/hooks/useMovies';
import { api } from '@/lib/api';
import { useSWRConfig } from 'swr';

export default function AdminMovies() {
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Movie>>({});
    const { mutate } = useSWRConfig();

    // Get all movies with pagination
    const { data: movies, isLoading } = useMovies();

    const handleEdit = async (movieId: number) => {
        if (isEditing === movieId) {
            try {
                await api.put(`/movies/${movieId}`, formData);
                mutate('/movies'); // Refresh movie list
                setIsEditing(null);
                setFormData({});
            } catch (error) {
                console.error('Error updating movie:', error);
            }
        } else {
            setIsEditing(movieId);
            const movie = movies?.find(m => m.id === movieId);
            if (movie) setFormData(movie);
        }
    };

    const handleDelete = async (movieId: number) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await api.delete(`/movies/${movieId}`);
                mutate('/movies'); // Refresh movie list
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Movies</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Add New Movie
                </button>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {movies?.map((movie) => (
                            <tr key={movie.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {isEditing === movie.id ? (
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        movie.title
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {isEditing === movie.id ? (
                                        <input
                                            type="date"
                                            value={formData.releaseDate || ''}
                                            onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        new Date(movie.releaseDate).toLocaleDateString()
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(movie.id)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        {isEditing === movie.id ? 'Save' : 'Edit'}
                                    </button>
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
            )}
        </div>
    );
}