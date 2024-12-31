import TopMovies from '@/components/rankings/TopMovies';
import TopUsers from '@/components/rankings/TopUsers';

export default function RankingsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Rankings</h1>
            <TopMovies />
            <TopUsers />
        </div>
    );
}