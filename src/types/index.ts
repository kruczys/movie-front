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

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    reviewId: number;
    user?: User;
}