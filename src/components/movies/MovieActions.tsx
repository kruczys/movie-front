'use client';
import { useUserLists } from '@/hooks/useUserLists';

interface MovieActionsProps {
    movieId: number;
}

export default function MovieActions({ movieId }: MovieActionsProps) {
    const { favorites, watchlist, ignored, addToList, removeFromList } = useUserLists(1); // TODO: Use actual user ID

    const isFavorite = favorites?.some(m => m.id === movieId);
    const isInWatchlist = watchlist?.some(m => m.id === movieId);
    const isIgnored = ignored?.some(m => m.id === movieId);

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => {
                    if (isFavorite) {
                        removeFromList('favorites', movieId);
                    } else {
                        addToList('favorites', movieId);
                    }
                }}
                className={`px-4 py-2 rounded-lg ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'
                }`}
            >
                {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>

            <button
                onClick={() => {
                    if (isInWatchlist) {
                        removeFromList('watchlist', movieId);
                    } else {
                        addToList('watchlist', movieId);
                    }
                }}
                className={`px-4 py-2 rounded-lg ${
                    isInWatchlist ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
                {isInWatchlist ? '📌 In Watchlist' : '➕ Add to Watchlist'}
            </button>

            <button
                onClick={() => {
                    if (isIgnored) {
                        removeFromList('ignored', movieId);
                    } else {
                        addToList('ignored', movieId);
                    }
                }}
                className={`px-4 py-2 rounded-lg ${
                    isIgnored ? 'bg-gray-500 text-white' : 'bg-gray-200'
                }`}
            >
                {isIgnored ? '🚫 Ignored' : '⌚ Ignore'}
            </button>
        </div>
    );
}