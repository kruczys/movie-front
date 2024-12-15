export default function Navbar() {
    return (
        <nav className="bg-slate-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-xl font-bold">
                            MovieApp
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="/movies" className="hover:text-gray-300">Movies</a>
                        <a href="/search" className="hover:text-gray-300">Search</a>
                        <a href="/login" className="hover:text-gray-300">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}