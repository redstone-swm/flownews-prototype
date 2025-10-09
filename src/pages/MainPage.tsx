import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeedList} from "@/components/feed/EventFeedList.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect, useState} from "react";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";


export default function MainPage() {
    const {isAuthenticated, isLoading: authLoading} = useAuth();
    const [activeCategory, setActiveCategory] = useState('MY');

    const {data: topKTopics, isLoading: topKLoading} = useGetTopKTopics({limit: 5}, {
        query: {
            enabled: isAuthenticated
        }
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            window.location.href = '/auth/login';
        }
    }, [isAuthenticated, authLoading]);

    if (authLoading || !isAuthenticated) {
        return;
    }
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
                        <CategoryBar 
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                        <EventFeedList activeCategory={activeCategory} />
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
