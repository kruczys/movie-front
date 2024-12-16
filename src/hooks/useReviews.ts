import useSWR from 'swr';
import { api } from '@/lib/api';
import { Review, PaginatedResponse } from '@/types';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useMovieReviews(movieId: number, page: number = 0) {
    const { data, error, isLoading } = useSWR<PaginatedResponse<Review>>(
        `/reviews/movie/${movieId}?page=${page}`,
        fetcher
    );

    return {
        reviews: data?.content,
        totalPages: data?.totalPages,
        isLoading,
        error
    };
}