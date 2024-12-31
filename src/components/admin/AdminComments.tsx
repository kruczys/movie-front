'use client';
// import { useState } from 'react';
import { Comment, Review } from '@/types';
import useSWR from 'swr';
import { api } from '@/lib/api';

export default function AdminComments() {
    const { data: reviews, error: reviewsError, mutate: mutateReviews } = useSWR<Review[]>('/api/reviews');
    const { data: comments, error: commentsError, mutate: mutateComments } = useSWR<Comment[]>('/api/comments');

    const handleDeleteReview = async (reviewId: number) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            await api.delete(`/api/reviews/${reviewId}`);
            await mutateReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review');
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await api.delete(`/api/comments/${commentId}`);
            await mutateComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Error deleting comment');
        }
    };

    if (reviewsError || commentsError) return <div>Error loading data</div>;
    if (!reviews || !comments) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Manage Reviews</h2>
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">Movie: {review.movieId}</p>
                                        <p>Rating: {review.rating}/5</p>
                                        <p className="mt-2">{review.content}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteReview(review.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Manage Comments</h2>
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">Review: {comment.reviewId}</p>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}