export type AuthUser = {
    id: number;
    email: string;
    username: string;
    role: 'USER' | 'ADMIN';
};