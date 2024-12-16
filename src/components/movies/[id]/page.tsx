import MovieDetails from '@/components/movies/MovieDetails';

export default function MoviePage({ params }: { params: { id: string } }) {
    return <MovieDetails movieId={parseInt(params.id)} />;
}
