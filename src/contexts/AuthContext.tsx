import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import {useUserMe} from '@/hooks/useUserMe';
import type User from "@/types/user.ts";


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

    const {
        data: userData,
        isLoading: isUserLoading,
        error,
        refetch: refetchUser,
    } = useUserMe();

    const isAuthenticated = !!user;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setIsLoading(false);
            return;
        }

        if (userData) {
            setUser(userData);
            console.log(userData);
        } else if (error) {
            console.error('사용자 정보를 가져오는데 실패했습니다:', error);
            // 토큰이 유효하지 않으면 삭제
            localStorage.removeItem('accessToken');
            setUser(null);
        }

        setIsLoading(isUserLoading);
    }, [userData, error, isUserLoading]);

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        refetchUser();
        window.location.href = '/';
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        window.location.href = '/';
    };

    const refreshUser = async () => {
        await refetchUser();
    };

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