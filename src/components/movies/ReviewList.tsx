import {useState} from "react";
import {useMovieReviews} from "@/hooks/useReviews";
import Pagination from "@/components/ui/Pagination";
import StarRating from "@/components/ui/StarRating";

export default function ReviewList({ movieId }: { movieId: number }) {
    const [page, setPage] = useState(0);
    const { reviews, totalPages, isLoading } = useMovieReviews(movieId, page);

    if (isLoading) return <div>Loading reviews...</div>;
    if (!reviews?.length) return <div>No reviews yet</div>;

    return (
        <div className="space-y-4">
            {reviews.map(review => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center">
                                <StarRating rating={review.rating} />
                                <span className="ml-2 text-gray-600">
                                    by {review.userId}
                                </span>
                            </div>
                            <p className="mt-2">{review.content}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}

            <Pagination
                currentPage={page}
                totalPages={totalPages || 1}
                onPageChange={setPage}
            />
        </div>
    );
}