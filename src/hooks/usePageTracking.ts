import {useEffect, useRef} from 'react';
import {useLocation} from '@tanstack/react-router';
import {useAuth} from '@/contexts/AuthContext';

interface PageVisit {
    ip: string;
    userAgent: string;
    page: string;
    entryTime: number;
    exitTime?: number;
    duration?: number;
    userId: string | null;
    action: 'enter' | 'navigate' | 'exit';
    referer?: string;
}

export const usePageTracking = () => {
    const location = useLocation();
    const entryTimeRef = useRef<number>(Date.now());
    const currentPageRef = useRef<string>(location.pathname);
    const {user} = useAuth();
    const currentIpRef = useRef<string>('unknown');
    const isFirstLoadRef = useRef<boolean>(true);


    const getUserIP = async (): Promise<string> => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            currentIpRef.current = data.ip;
            return data.ip;
        } catch (error) {
            console.error('Failed to get IP:', error);
            return 'unknown';
        }
    };

    const sendPageVisitData = (visitData: PageVisit) => {
        if (visitData.action !== 'enter' && (visitData.duration == undefined || visitData.duration < 50)) {
            return;
        }

        try {
            const url = import.meta.env.VITE_FIRESTORE_URL;

            const data = {
                fields: {
                    ip: {stringValue: visitData.ip},
                    userAgent: {stringValue: visitData.userAgent},
                    page: {stringValue: visitData.page},
                    entryTime: {integerValue: visitData.entryTime.toString()},
                    exitTime: {integerValue: visitData.exitTime?.toString() || '0'},
                    duration: {integerValue: visitData.duration?.toString() || '0'},
                    userId: {stringValue: visitData.userId || ''},
                    action: {stringValue: visitData.action},
                    referer: {stringValue: visitData.referer || ''}
                }
            };

            navigator.sendBeacon(url, JSON.stringify(data));
            // console.log('Page visit data sent via sendBeacon:', visitData);
        } catch (error) {
            console.error('Failed to send page visit data sync:', error);
        }
    };

    useEffect(() => {
        getUserIP();

        const handlePageChange = async () => {
            const now = Date.now();
            const ip = await getUserIP();
            const userAgent = window.navigator.userAgent;
            const referer = document.referrer || undefined;

            if (currentPageRef.current && !isFirstLoadRef.current) {
                // 이전 페이지에서 나갈 때 (navigate)
                const duration = now - entryTimeRef.current;
                const exitData: PageVisit = {
                    ip,
                    userAgent,
                    page: currentPageRef.current,
                    entryTime: entryTimeRef.current,
                    exitTime: now,
                    duration,
                    userId: user ? user.id.toString() : "guest",
                    action: 'navigate',
                    referer
                };

                sendPageVisitData(exitData);
            }

            // 새 페이지 진입 시간 기록
            entryTimeRef.current = now;
            currentPageRef.current = location.pathname;

            // 새 페이지 진입 시 (enter)
            const enterData: PageVisit = {
                ip,
                userAgent,
                page: location.pathname,
                entryTime: now,
                userId: user ? user.id.toString() : "guest",
                action: isFirstLoadRef.current ? 'enter' : 'navigate',
                referer
            };
            sendPageVisitData(enterData);
            isFirstLoadRef.current = false;
        };

        handlePageChange();

        const handleBeforeUnload = () => {
            const now = Date.now();
            const userAgent = window.navigator.userAgent;
            const duration = now - entryTimeRef.current;
            const referer = cleanUrl(document.referrer) || undefined;

            const visitData: PageVisit = {
                ip: currentIpRef.current,
                userAgent,
                page: currentPageRef.current,
                entryTime: entryTimeRef.current,
                exitTime: now,
                duration,
                userId: user ? user.id.toString() : "guest",
                action: 'exit',
                referer
            };

            sendPageVisitData(visitData);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [location.pathname, user]);
};
