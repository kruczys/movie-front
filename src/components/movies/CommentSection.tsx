'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Comment } from '@/types';
import useSWR from 'swr';

interface CommentSectionProps {
    reviewId: number;
}

export default function CommentSection({ reviewId }: CommentSectionProps) {
    const { state } = useAuth();
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: comments, mutate } = useSWR<Comment[]>(`/api/comments/review/${reviewId}`);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.isAuthenticated) return;

        setIsSubmitting(true);
        try {
            await api.post(`/api/comments/review/${reviewId}/user/${state.user?.id}`, {
                content: comment
            });

            setComment('');
            mutate();
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 space-y-4">
            {state.isAuthenticated && (
                <form onSubmit={handleSubmitComment} className="space-y-2">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Add a comment..."
                        rows={2}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || !comment}
                        className="bg-gray-100 px-3 py-1 rounded text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>
            )}

            {/* Comments List */}
            <div className="space-y-2">
                {comments?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm">{comment.content}</p>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}