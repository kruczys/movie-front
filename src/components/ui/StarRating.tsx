interface StarRatingProps {
    rating: number;
    onChange?: (rating: number) => void;
    readonly?: boolean;
}

export default function StarRating({
                                       rating,
                                       onChange,
                                       readonly = true
                                   }: StarRatingProps) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    disabled={readonly}
                    onClick={() => onChange?.(star)}
                    className={`text-2xl ${
                        star <= rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                    }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}