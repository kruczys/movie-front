import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthUser } from '@/types/auth';

type AuthState = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
};

type AuthAction =
    | { type: 'LOGIN_SUCCESS'; payload: AuthUser }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true
};

const AuthContext = createContext<{
    state: AuthState;
    login: (user: AuthUser) => void;
    logout: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user: AuthUser) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}