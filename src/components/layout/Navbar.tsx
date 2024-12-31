'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useAuthActions } from '@/hooks/useAuthActions';

export default function Navbar() {
    const { state } = useAuth();
    const { logoutUser } = useAuthActions();

    return (
        <nav className="bg-slate-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            MovieApp
                        </Link>
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/movies" className="hover:text-gray-300">
                                Movies
                            </Link>
                            <Link href="/search" className="hover:text-gray-300">
                                Search
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {state.isAuthenticated ? (
                            <>
                                <Link href="/profile" className="hover:text-gray-300">
                                    Profile
                                </Link>
                                {state.user?.role === 'ADMIN' && (
                                    <Link href="/admin" className="hover:text-gray-300">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={logoutUser}
                                    className="hover:text-gray-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-gray-300">
                                    Login
                                </Link>
                                <Link href="/register" className="hover:text-gray-300">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}