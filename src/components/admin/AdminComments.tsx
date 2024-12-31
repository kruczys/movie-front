'use client';
// import { useState } from 'react';
import { Review, Comment } from '@/types';
import { api } from '@/lib/api';
import useSWR from "swr";
import { mutate } from 'swr';

export default function AdminComments() {
    const { data: reviews } = useSWR<Review[]>('/api/reviews');
    const { data: comments } = useSWR<Comment[]>('/api/comments');

    const handleDeleteReview = async (reviewId: number) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            await api.delete(`/api/reviews/${reviewId}`);
            mutate('/api/reviews');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await api.delete(`/api/comments/${commentId}`);
            mutate('/api/comments');
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="space-y-8">
            {/* Reviews Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Reviews Management</h2>
                <div className="space-y-4">
                    {reviews?.map(review => (
                        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">Movie: {review.movieId}</p>
                                    <p>Rating: {review.rating}/5</p>
                                    <p>{review.content}</p>
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

            {/* Comments Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Comments Management</h2>
                <div className="space-y-4">
                    {comments?.map(comment => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">Review: {comment.reviewId}</p>
                                    <p>{comment.content}</p>
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
    );
}