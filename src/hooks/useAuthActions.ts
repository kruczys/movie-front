import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export function useAuthActions() {
    const { login, logout } = useAuth();

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const registerUser = async (username: string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', {
                username,
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await api.post('/auth/logout');
            logout();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return { loginUser, registerUser, logoutUser };
}