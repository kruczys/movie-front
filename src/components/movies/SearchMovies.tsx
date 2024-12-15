'use client';
import { useState } from 'react';
import { useMovieSearch } from '@/hooks/useMovies';
import { Movie } from '@/types';
import MovieCard from './MovieCard';
import SearchBar from '../ui/SearchBar';
import Pagination from '../ui/Pagination';

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const { results, totalPages, isLoading } = useMovieSearch(query, page);

    return (
        <div className="space-y-6">
            <SearchBar
                value={query}
                onChange={(value) => {
                    setQuery(value);
                    setPage(0);
                }}
                placeholder="Search movies..."
            />

            {isLoading ? (
                <div>Loading...</div>
            ) : results && results.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages || 1}
                        onPageChange={setPage}
                    />
                </>
            ) : (
                <div className="text-center text-gray-500">
                    {query ? 'No movies found' : 'Start typing to search movies'}
                </div>
            )}
        </div>
    );
}