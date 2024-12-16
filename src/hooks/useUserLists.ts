import useSWR from 'swr';
import { api } from '@/lib/api';
import { Movie } from '@/types';

export function useUserLists(userId: number) {
    const { data: favorites, mutate: mutateFavorites } = useSWR<Movie[]>(
        `/users/${userId}/favorites`
    );

    const { data: watchlist, mutate: mutateWatchlist } = useSWR<Movie[]>(
        `/users/${userId}/watchlist`
    );

    const { data: ignored, mutate: mutateIgnored } = useSWR<Movie[]>(
        `/users/${userId}/ignored`
    );

    const addToList = async (listType: 'favorites' | 'watchlist' | 'ignored', movieId: number) => {
        await api.post(`/users/1/${listType}/${movieId}`);
        // Revalidate the appropriate list
        switch (listType) {
            case 'favorites':
                mutateFavorites();
                break;
            case 'watchlist':
                mutateWatchlist();
                break;
            case 'ignored':
                mutateIgnored();
                break;
        }
    };

    const removeFromList = async (listType: 'favorites' | 'watchlist' | 'ignored', movieId: number) => {
        await api.delete(`/users/1/${listType}/${movieId}`);
        // Revalidate the appropriate list
        switch (listType) {
            case 'favorites':
                mutateFavorites();
                break;
            case 'watchlist':
                mutateWatchlist();
                break;
            case 'ignored':
                mutateIgnored();
                break;
        }
    };

    return {
        favorites,
        watchlist,
        ignored,
        addToList,
        removeFromList
    };
}