'use client';
import { useState } from 'react';

export interface FilterOptions {
    genre: string;
    year: string;
    sortBy: 'rating' | 'releaseDate' | 'title';
    sortOrder: 'asc' | 'desc';
}

interface MovieFiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
    genres: string[];
}

export default function MovieFilters({ onFilterChange, genres }: MovieFiltersProps) {
    const [filters, setFilters] = useState<FilterOptions>({
        genre: '',
        year: '',
        sortBy: 'rating',
        sortOrder: 'desc'
    });

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        const newFilters = {
            ...filters,
            [key]: value
        } as FilterOptions;
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium">Genre</label>
                <select
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Year</label>
                <select
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">All Years</option>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Sort By</label>
                <div className="flex space-x-2">
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterOptions['sortBy'])}
                        className="flex-1 p-2 border rounded"
                    >
                        <option value="rating">Rating</option>
                        <option value="releaseDate">Release Date</option>
                        <option value="title">Title</option>
                    </select>
                    <select
                        value={filters.sortOrder}
                        onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                        className="w-24 p-2 border rounded"
                    >
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                    </select>
                </div>
            </div>
        </div>
    );
}