import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect} from "react";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import {useFirebaseMessaging} from "@/hooks/useFirebaseMessaging.ts";


export default function MainPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const {data, isLoading, refetch} = useGetUserEventFeed({
        query: {
            enabled: isAuthenticated
        }
    });
    
    const {data: topKTopics, isLoading: topKLoading} = useGetTopKTopics({ limit: 5 }, {
        query: {
            enabled: isAuthenticated
        }
    });

    useFirebaseMessaging();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            window.location.href = '/auth/login';
        }
    }, [isAuthenticated, authLoading]);

    const handleRefresh = async () => {
        await refetch();
    };

    if (authLoading || !isAuthenticated) {
        return <div>로딩 중...</div>;
    }

    if (isLoading || !data) {
        return <div>피드 로딩 중...</div>;
    }

    console.log(data)
    return (
        <NavbarLayout topKTopics={topKTopics} topKLoading={topKLoading}>
            {/*<PullToRefresh onRefresh={handleRefresh}>*/}
            <Tabs defaultValue="feed">
                <TabsList variant="outline" className="w-full ">
                    <TabsTrigger
                        value="feed"
                        variant="outline"
                        className="flex-1"
                    >
                        기사 모아보기
                    </TabsTrigger>
                    <TabsTrigger
                        value="dashboard"
                        variant="outline"
                        className="flex-1"
                    >
                        대시보드
                    </TabsTrigger>
                    <TabsTrigger
                        value="myinfo"
                        variant="outline"
                        className="flex-1"
                    >
                        내 정보
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="feed">
                    <div className="flex flex-col gap-4">
                        <CategoryBar/>
                        <div className="px-3 flex flex-col gap-4">
                            {data.eventIds.map((e) => (
                                <EventFeed key={e || Math.random()} eventId={e}/>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="dashboard">
                    Change your password here.
                </TabsContent>
            </Tabs>

            {/*</PullToRefresh>*/}
        </NavbarLayout>
    );
}
