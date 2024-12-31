'use client';
import { useState } from 'react';
import { useMovieSearch } from '@/hooks/useMovies';
import MovieCard from './MovieCard';
import MovieFilters, { FilterOptions } from './MovieFilters';
import SearchBar from '../ui/SearchBar';
import Pagination from '../ui/Pagination';
import { Movie } from '@/types';

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState<FilterOptions>({
        genre: '',
        year: '',
        sortBy: 'rating',
        sortOrder: 'desc'
    });

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        setPage(0); // Reset page when filters change
    };

    const { data, isLoading } = useMovieSearch(query, page, filters);
    const movies = data?.content || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
                <MovieFilters
                    onFilterChange={handleFilterChange}
                    genres={['Action', 'Comedy', 'Drama']} // Get from API
                />
            </div>

            {/* Movies Grid */}
            <div className="md:col-span-3 space-y-6">
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
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {movies.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        {query ? 'No movies found' : 'Start typing to search movies'}
                    </div>
                )}
            </div>
        </div>
    );
}