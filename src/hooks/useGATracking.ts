import {useCallback} from 'react';

// GA4 이벤트 타입 정의
export interface GAEvent {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
}

// gtag 함수 타입 정의
declare global {
    interface Window {
        gtag?: (command: string, ...args: any[]) => void;
    }
}

export const useGATracking = () => {
    const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, parameters);
        } else {
            console.log('GA4 Event:', eventName, parameters);
        }
    }, []);

    // 로그인 모달이 표시될 때
    const trackLoginModalShown = useCallback(() => {
        trackEvent('login_modal_shown', {
            event_category: 'engagement',
            event_label: 'login_modal_display'
        });
    }, [trackEvent]);

    // 구글 로그인 버튼 클릭
    const trackLoginClick = useCallback(() => {
        trackEvent('login_click', {
            event_category: 'auth',
            event_label: 'google_login_button',
            method: 'google'
        });
    }, [trackEvent]);

    // 관심 토픽 선택 완료
    const trackInterestedTopicClick = useCallback((topicIds: number[]) => {
        trackEvent('interested_topic_click', {
            event_category: 'onboarding',
            event_label: 'topic_selection_completed',
            topic_count: topicIds.length,
            selected_topics: topicIds.join(',')
        });
    }, [trackEvent]);

    // 토픽 상세화면에서 팔로우
    const trackTopicFollow = useCallback((topicId: number, topicTitle?: string, isFollowing?: boolean) => {
        trackEvent('topic_follow', {
            event_category: 'engagement',
            event_label: 'topic_detail_follow',
            topic_id: topicId,
            topic_title: topicTitle,
            action: isFollowing ? 'follow' : 'unfollow'
        });
    }, [trackEvent]);

    // 메인 피드에서 팔로우
    const trackTopicFollowFromFeed = useCallback((topicId: number, topicTitle?: string, isFollowing?: boolean) => {
        trackEvent('topic_follow_from_feed', {
            event_category: 'engagement',
            event_label: 'feed_follow',
            topic_id: topicId,
            topic_title: topicTitle,
            action: isFollowing ? 'follow' : 'unfollow'
        });
    }, [trackEvent]);

    // 푸시 알림 클릭
    const trackNewEventPushClick = useCallback((eventId?: number, topicId?: number) => {
        trackEvent('new_event_push_click', {
            event_category: 'notification',
            event_label: 'push_notification_click',
            event_id: eventId,
            topic_id: topicId
        });
    }, [trackEvent]);

    return {
        trackEvent,
        trackLoginModalShown,
        trackLoginClick,
        trackInterestedTopicClick,
        trackTopicFollow,
        trackTopicFollowFromFeed,
        trackNewEventPushClick,
    };
};