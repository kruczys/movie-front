'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import StarRating from './StarRating';
import CommentSection from "@/components/movies/CommentSection";
import { api } from '@/lib/api';
import { Review } from '@/types';
import useSWR from "swr";
import {  mutate } from 'swr';

interface ReviewSectionProps {
    movieId: number;
}

export default function ReviewSection({ movieId }: ReviewSectionProps) {
    const { state } = useAuth();
    const [newRating, setNewRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: reviews } = useSWR<Review[]>(`/api/reviews/movie/${movieId}`);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.isAuthenticated) return;

        setIsSubmitting(true);
        try {
            await api.post(`/api/reviews/movie/${movieId}/user/${state.user?.id}`, {
                rating: newRating,
                content: reviewContent
            });

            // Reset form and refresh reviews
            setNewRating(0);
            setReviewContent('');
            mutate(`/api/reviews/movie/${movieId}`);
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Review Form */}
            {state.isAuthenticated && (
                <form onSubmit={handleSubmitReview} className="space-y-4 bg-white p-4 rounded-lg shadow">
                    <div>
                        <label className="block mb-2">Your Rating</label>
                        <StarRating
                            rating={newRating}
                            onChange={setNewRating}
                            readOnly={false}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Your Review</label>
                        <textarea
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Write your review here..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !newRating || !reviewContent}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Reviews</h3>
                {reviews?.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <StarRating rating={review.rating} />
                                <p className="mt-2">{review.content}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <CommentSection reviewId={review.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}