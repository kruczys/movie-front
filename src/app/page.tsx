import { Suspense } from 'react';
import PopularMovies from '@/components/movies/PopularMovies';

export default function Home() {
  return (
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MovieApp</h1>
          <p className="text-xl text-gray-600">Discover and review your favorite movies</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
          <Suspense fallback={<div>Loading popular movies...</div>}>
            <PopularMovies />
          </Suspense>
        </section>
      </div>
  );
}