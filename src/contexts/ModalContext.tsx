import { createContext, useContext, useState, type ReactNode } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import { useGATracking } from '@/hooks/useGATracking';

interface LoginModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

interface LoginModalProviderProps {
    children: ReactNode;
}

export function LoginModalProvider({ children }: LoginModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { trackLoginModalShown } = useGATracking();

    const open = () => {
        setIsOpen(true);
        trackLoginModalShown();
    };
    const close = () => setIsOpen(false);

    const value: LoginModalContextType = {
        isOpen,
        open,
        close,
    };

    return (
        <LoginModalContext.Provider value={value}>
            {children}
            <LoginModal 
                open={isOpen} 
                onOpenChange={setIsOpen}
            />
        </LoginModalContext.Provider>
    );
}

export function useLoginModal() {
    const context = useContext(LoginModalContext);
    if (context === undefined) {
        throw new Error('useLoginModal must be used within a LoginModalProvider');
    }
    return context;
}