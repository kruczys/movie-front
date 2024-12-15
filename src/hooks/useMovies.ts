import useSWR from 'swr';
import {Movie, PaginatedResponse} from '@/types';
import { api } from '@/lib/api'

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function usePopularMovies() {
    const { data, error, isLoading } = useSWR<Movie[]>('/movies/popular', fetcher);
    return {
        movies: data,
        isLoading,
        error
    };
}

export function useMovieSearch(query: string, page: number = 0) {
    const { data, error, isLoading } = useSWR<PaginatedResponse<Movie>>(
        query ? `/movies/search?title=${query}&page=${page}` : null,
        fetcher
    );
    return {
        results: data?.content,
        totalPages: data?.totalPages,
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