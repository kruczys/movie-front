'use client';
import { useMovieDetails } from '@/hooks/useMovies';
// import { useMovieReviews } from '@/hooks/useReviews';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Image from 'next/image';
import MovieActions from "@/components/movies/MovieActions";

interface MovieDetailsProps {
    movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
    const {movie, isLoading, error} = useMovieDetails(movieId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading movie details</div>;
    if (!movie) return null;

    return (
        <div className="space-y-8">
            {/* Movie Header */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="relative h-96">
                    <Image
                        src={movie.imageUrl || '/placeholder.jpg'}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-gray-600">{movie.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Release Date</h3>
                            <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Genres</h3>
                            <p>{movie.genres.map(g => g.name).join(', ')}</p>
                        </div>
                    </div>
                    <MovieActions movieId={movieId} />
                    {movie.trailerUrl && (
                        <div>
                            <h3 className="font-semibold mb-2">Trailer</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src={movie.trailerUrl}
                                allowFullScreen
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <ReviewList movieId={movieId}/>
                <ReviewForm movieId={movieId}/>
            </div>
        </div>
    );
}