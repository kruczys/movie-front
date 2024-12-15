import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
                <Image
                    src={movie.imageUrl || '/placeholder.jpg'}
                    alt={movie.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                    {movie.description.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(movie.releaseDate).getFullYear()}
          </span>
                    <Link
                        href={`/movies/${movie.id}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}