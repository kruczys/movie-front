// src/components/movies/PopularMovies.tsx
import { usePopularMovies } from '@/hooks/useMovies';
import MovieCard from './MovieCard';

export default function PopularMovies() {
    const { movies, isLoading, error } = usePopularMovies();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading movies</div>;
    if (!movies) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}