import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {useGetUserEventFeed, getUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect, useState} from "react";
import {useGetTopKTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import {Feeds} from "@/components/feed/Feeds.tsx";

export default function MainPage() {
    const {isAuthenticated, isLoading: authLoading} = useAuth();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            window.location.href = "/auth/login";
        }
    }, [isAuthenticated, authLoading]);

    const {data: topKTopics, isLoading: topKLoading} = useGetTopKTopics(
        {limit: 5},
        {query: {enabled: isAuthenticated}}
    );


    if (authLoading || !isAuthenticated) return null;

    return (
        <NavbarLayout topKTopics={topKTopics} topKLoading={topKLoading}>
            <Tabs defaultValue="feed">
                <TabsList variant="outline" className="w-full ">
                    <TabsTrigger value="feed" variant="outline" className="flex-1">
                        기사 모아보기
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" variant="outline" className="flex-1">
                        대시보드
                    </TabsTrigger>
                    <TabsTrigger value="myinfo" variant="outline" className="flex-1">
                        내 정보
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="feed">
                    <Feeds/>
                </TabsContent>

                <TabsContent value="dashboard">Change your password here.</TabsContent>
            </Tabs>

        </NavbarLayout>
    );
}