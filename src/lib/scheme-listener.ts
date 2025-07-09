import { useEffect } from 'react';
import { App, type URLOpenListenerEvent } from '@capacitor/app';
import {useNavigate} from "@tanstack/react-router";

const AppUrlListener = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (event: URLOpenListenerEvent) => {
            const url = new URL(event.url); // URL 파싱 API 사용
            const pathname = url.pathname;  // /auth/callback
            const search = url.search;      // ?token=abc123

            // TanStack Router로 이동
            navigate({ to: `${pathname}${search}` });
        };

        App.addListener('appUrlOpen', handler);
    }, [navigate]);

    return null;
};

export default AppUrlListener;
