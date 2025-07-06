import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import axiosInstance from '@/api/axiosInstance';

interface User {
    id: number;
    email: string;
    name: string;
    profileUrl?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    const fetchUser = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await axiosInstance.get('/users/me');
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('사용자 정보를 가져오는데 실패했습니다:', error);
            // 토큰이 유효하지 않으면 삭제
            localStorage.removeItem('accessToken');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        fetchUser();
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    const refreshUser = async () => {
        await fetchUser();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
