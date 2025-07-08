import {Capacitor} from '@capacitor/core';
import {PushNotifications, type Token} from '@capacitor/push-notifications';
import {Router} from "@tanstack/react-router";
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from "@firebase/analytics";
// @ts-ignore

// 알림 설정
export function initializeFirebaseMessaging(router: Router) {
    if (!Capacitor.isNativePlatform()) {
        return;
    }

    // 권한 요청 및 등록
    PushNotifications.requestPermissions().then(permission => {
        if (permission.receive === 'granted') {
            PushNotifications.register();
        }
    });

    // 토큰 등록 이벤트
    PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token:', token.value);
    }).catch(e => console.error('Push registration error:', e));

    // 푸시 알림 액션 이벤트
    PushNotifications.addListener('pushNotificationActionPerformed', ({notification}) => {
        const {topicId} = notification?.data;
        if (topicId) {
            router.navigate({to: `/topics/${topicId}`});
        }
    }).catch(e => console.error('Push notification action error:', e));
}

// firestore 설정
const firebaseConfig = {
    apiKey: "AIzaSyBqw_MV1rw9HrJJvs_dKLboUpfaIzGwcsQ",
    authDomain: "sijeom-db66d.firebaseapp.com",
    projectId: "sijeom-db66d",
    storageBucket: "sijeom-db66d.firebasestorage.app",
    messagingSenderId: "392894561750",
    appId: "1:392894561750:web:ffad8aaad34dfca3157877",
    measurementId: "G-FZB90NJQ3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
