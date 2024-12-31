import useSWR from 'swr';
import {Movie, PaginatedResponse} from '@/types';
import { api } from '@/lib/api'

interface SearchFilters {
    genre?: string;
    year?: string;
    sortBy?: 'rating' | 'releaseDate' | 'title';
    sortOrder?: 'asc' | 'desc';
}

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function usePopularMovies() {
    const { data, error, isLoading } = useSWR<Movie[]>('/movies/popular', fetcher);
    return {
        movies: data,
        isLoading,
        error
    };
}

export function useMovieSearch(
    query: string,
    page: number = 0,
    filters: SearchFilters = {}
) {
    const {genre, year, sortBy = 'rating', sortOrder = 'desc'} = filters;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: '10',
        sort: `${sortBy},${sortOrder}`
    });

    if (query) queryParams.append('title', query);
    if (genre) queryParams.append('genre', genre);
    if (year) queryParams.append('year', year);

    const {data, error, isLoading} = useSWR<PaginatedResponse<Movie>>(
        `/movies/search?${queryParams.toString()}`,
        fetcher
    );

    return {
        data,
        isLoading,
        error
    };
}



export function useMovieDetails(id: number) {
    const { data, error, isLoading } = useSWR<Movie>(
        id ? `/movies/${id}` : null,
        fetcher
    );
    return {
        movie: data,
        isLoading,
        error
    };
}