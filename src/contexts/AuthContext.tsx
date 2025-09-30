import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import type User from "@/types/user.ts";
import {storage} from "@/lib/stoarge.ts";
import {useGetCurrentUser} from "@/api/user-query-api/user-query-api.ts";

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
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAccessToken = async () => {
            const token = await storage.get('accessToken');
            setToken(token);
            setLoading(false);
        }

        loadAccessToken();
    }, []);

    const {
        data: userData,
        isLoading: isUserLoading,
        error,
        refetch: refetchUser,
    } = useGetCurrentUser({
        query: {
            enabled: !loading && !!token,
        }
    });

    const isAuthenticated = !!user;

    useEffect(() => {
        checkTokenAndUser();
    }, [userData, error, isUserLoading]);

    const checkTokenAndUser = async () => {
        const token = await storage.get('accessToken');
        if (!token) {
            setIsLoading(false);
            return;
        }

        if (userData) {
            setUser(userData);
            console.log(userData);
            
            // 프로필 완성 여부 체크 - profile-complete 페이지가 아닌 경우만
            if (userData.isProfileComplete === false && 
                !window.location.pathname.includes('/auth/profile-complete')) {
                window.location.href = '/auth/profile-complete';
                return;
            }
        } else if (error) {
            console.error('사용자 정보를 가져오는데 실패했습니다:', error);
            // 토큰이 유효하지 않으면 삭제
            await storage.remove('accessToken');
            setUser(null);
        }

        setIsLoading(isUserLoading);
    };

    const login = async (token: string) => {
        await storage.set('accessToken', token);
        
        // 사용자 정보를 조회하여 프로필 완성 여부를 확인
        refetchUser();
        window.location.href = '/';
    };

    const logout = async () => {
        await storage.remove('accessToken');
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