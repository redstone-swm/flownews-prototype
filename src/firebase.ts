import { Capacitor } from '@capacitor/core';
import { PushNotifications, type Token } from '@capacitor/push-notifications';
import {Router} from "@tanstack/react-router";

// @ts-ignore
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
    localStorage.setItem('deviceToken', token.value);
  }).catch(e => console.error('Push registration error:', e));

  // 푸시 알림 액션 이벤트
  PushNotifications.addListener('pushNotificationActionPerformed', ({ notification }) => {
    const { topicId } = notification?.data;
    if (topicId) {
      router.navigate({ to: `/topics/${topicId}` });
    }
  }).catch(e => console.error('Push notification action error:', e));
}
