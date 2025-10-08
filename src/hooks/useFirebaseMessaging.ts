import {Capacitor} from '@capacitor/core';
import {PushNotifications, type Token} from '@capacitor/push-notifications';
import {useRouter} from "@tanstack/react-router";
import {storage} from "@/lib/stoarge.ts";
import {useUpdateDeviceToken} from "@/api/user-profile/user-profile.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect, useState} from 'react';

export function useFirebaseMessaging() {
    const router = useRouter();
    const { user } = useAuth();
    const updateDeviceToken = useUpdateDeviceToken();
    const DEVICE_TOKEN_KEY = 'deviceToken';
    const [deviceToken, setDeviceToken] = useState<string | null>(null);

    const setupListeners = async () => {
        const registrationListener = await PushNotifications.addListener('registration', (token: Token) => {
            console.log('Push registration success, token:', token.value);
            storage.set(DEVICE_TOKEN_KEY, token.value);
        });

        const actionListener = await PushNotifications.addListener('pushNotificationActionPerformed', ({notification}) => {
            const {topicId} = notification?.data;
            if (topicId) {
                router.navigate({to: `/topics/${topicId}`});
            }
        });

        return { registrationListener, actionListener };
    };

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            return;
        }

        PushNotifications.requestPermissions().then(permission => {
            if (permission.receive === 'granted') {
                PushNotifications.register();
            }
        });

        let listeners: { registrationListener: any; actionListener: any } | null = null;
        
        setupListeners().then((result) => {
            listeners = result;
        });

        return () => {
            if (listeners) {
                listeners.registrationListener?.remove();
                listeners.actionListener?.remove();
            }
        };
    }, []);

    useEffect(() => {
        const loadDeviceToken = async () => {
            const token = await storage.get(DEVICE_TOKEN_KEY);
            setDeviceToken(token);
        }

        loadDeviceToken();

        if(!deviceToken || !user?.id) return;

        updateDeviceToken.mutate({
            data: { deviceToken, userId: user?.id },
        });

    }, [user?.id, deviceToken, updateDeviceToken]);
}