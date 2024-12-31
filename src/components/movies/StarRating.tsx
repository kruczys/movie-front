'use client';
import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
}

export default function StarRating({ rating, onChange, readOnly = true }: StarRatingProps) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readOnly}
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => !readOnly && setHover(star)}
                    onMouseLeave={() => !readOnly && setHover(0)}
                    className={`text-2xl ${
                        star <= (hover || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                    } ${!readOnly && 'cursor-pointer'}`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}