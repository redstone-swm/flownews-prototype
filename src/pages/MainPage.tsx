import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect} from "react";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import {useFirebaseMessaging} from "@/hooks/useFirebaseMessaging.ts";
import {Feeds} from "@/components/feed/Feeds.tsx";
import {storage} from "@/lib/stoarge.ts";
import {useLoginModal} from "@/contexts/ModalContext.tsx";

export default function MainPage() {
    const {isAuthenticated, isLoading: authLoading} = useAuth();
    const {open: openLoginModal} = useLoginModal();

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
                    openLoginModal();
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

    return (
        <>
            <NavbarLayout>
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
        </>
    );
}