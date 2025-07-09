import {useEffect} from 'react';
import {App, type URLOpenListenerEvent} from '@capacitor/app';
import {useNavigate} from "@tanstack/react-router";
import {useAuth} from "@/contexts/AuthContext.tsx";

const AppUrlListener = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    console.log('AppUrlListener initialized');

    useEffect(() => {
        const handler = (event: URLOpenListenerEvent) => {
            const url = new URL(event.url);
            const token = url.searchParams.get('token');

            if (token) {
                login(token);
                navigate({ to: '/' });
            } else {
                navigate({ to: '/auth/login' });
            }
        };

        App.addListener('appUrlOpen', handler);
    }, [navigate, login]);

    return null;
};

export default AppUrlListener;

