'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import StarRating from '../ui/StarRating';
import { useSWRConfig } from 'swr';

interface ReviewFormProps {
    movieId: number;
}

export default function ReviewForm({ movieId }: ReviewFormProps) {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate } = useSWRConfig();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content || !rating) return;

        setIsSubmitting(true);
        try {
            await api.post(`/reviews/movie/${movieId}/user/1`, { // TODO: Use actual user ID
                content,
                rating
            });
            // Reset form
            setContent('');
            setRating(0);
            // Revalidate reviews list
            mutate(`/reviews/movie/${movieId}`);
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
            <div>
                <label className="block mb-2">Your Rating</label>
                <StarRating
                    rating={rating}
                    onChange={setRating}
                    readonly={false}
                />
            </div>

            <div>
                <label className="block mb-2">Your Review</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Write your review here..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !content || !rating}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
}