import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect, useState} from "react";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import {useFirebaseMessaging} from "@/hooks/useFirebaseMessaging.ts";
import {Feeds} from "@/components/feed/Feeds.tsx";
import {storage} from "@/lib/stoarge.ts";
import LoginModal from "@/components/auth/LoginModal.tsx";
import {useGATracking} from "@/hooks/useGATracking.ts";

export default function MainPage() {
    const {isAuthenticated, isLoading: authLoading} = useAuth();
    const {trackLoginModalShown} = useGATracking();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const {data: topKTopics, isLoading: topKLoading} = useGetTopKTopics(
        {limit: 5}
    );

    useFirebaseMessaging();

    // 메인페이지 진입 시 view_count 체크 및 로그인 모달 표시
    useEffect(() => {
        const checkViewCount = async () => {
            try {
                const currentCount = await storage.get('view_count');
                const viewCount = currentCount ? parseInt(currentCount, 10) : 0;
                const hasShownModal = await storage.get('login_modal_shown');

                // 비로그인 상태이면서 view_count >= 2이고 모달을 보여준 적이 없다면 표시
                if (!isAuthenticated && viewCount >= 2 && !hasShownModal) {
                    setShowLoginModal(true);
                    trackLoginModalShown();
                    await storage.set('login_modal_shown', 'true');
                }
            } catch (error) {
                console.error('Failed to check view count:', error);
            }
        };

        if (!authLoading) {
            checkViewCount();
        }
    }, [isAuthenticated, authLoading]);

    // useEffect(() => {
    //     if (!authLoading && !isAuthenticated) {
    //         window.location.href = "/auth/login";
    //     }
    // }, [isAuthenticated, authLoading]);

    // if (authLoading || !isAuthenticated) {
    //     return null;
    // }

    return (
        <>
            <NavbarLayout topKTopics={topKTopics} topKLoading={topKLoading}>
                {/*<Tabs defaultValue="feed">*/}
                {/*    <TabsList variant="outline" className="w-full ">*/}
                {/*        <TabsTrigger value="feed" variant="outline" className="flex-1">*/}
                {/*            기사 모아보기*/}
                {/*        </TabsTrigger>*/}
                {/*        <TabsTrigger value="dashboard" variant="outline" className="flex-1">*/}
                {/*            대시보드*/}
                {/*        </TabsTrigger>*/}
                {/*        <TabsTrigger value="myinfo" variant="outline" className="flex-1">*/}
                {/*            내 정보*/}
                {/*        </TabsTrigger>*/}
                {/*    </TabsList>*/}

                {/*    <TabsContent value="feed">*/}
                {/*        <Feeds/>*/}
                {/*    </TabsContent>*/}

                {/*    <TabsContent value="dashboard">Change your password here.</TabsContent>*/}
                {/*</Tabs>*/}

                <Feeds/>
            </NavbarLayout>
            <LoginModal open={showLoginModal}/>
        </>
    );
}