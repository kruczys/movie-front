export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
    trailerUrl: string;
    genres: Genre[];
    reviews: Review[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    content: string;
    rating: number;
    userId: number;
    movieId: number;
    createdAt: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
}