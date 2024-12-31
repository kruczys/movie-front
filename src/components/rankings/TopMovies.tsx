'use client';
import useSWR from 'swr';
import { Movie } from '@/types';
import MovieCard from '../movies/MovieCard';

export default function TopMovies() {
    const { data: movies, isLoading } = useSWR<Movie[]>('/api/movies/popular');

    if (isLoading) return <div>Loading popular movies...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Most Popular Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}