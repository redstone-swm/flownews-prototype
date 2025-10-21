import {getUserEventFeed, useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {useEffect, useState} from "react";
import React from "react";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";
import {AdFeed} from "@/components/feed/AdFeed.tsx";
import PullToRefresh from "react-simple-pull-to-refresh";

export const Feeds = () => {
    const {isAuthenticated} = useAuth();
    const [activeCategory, setActiveCategory] = useState('MY');

    const params = activeCategory === 'MY' ? undefined : {category: activeCategory};
    const {data, refetch} = useGetUserEventFeed(
        params, {
            // query: {enabled: isAuthenticated}
        });

    // 누적 아이템, 추가 로딩 여부, 더 불러올 수 있는지 여부
    const [items, setItems] = useState<number[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    // 카테고리 변경 시 items 리셋
    useEffect(() => {
        setItems([]);
        setHasMore(true);
    }, [activeCategory]);

    // 최초 로드 시 쿼리 데이터로 초기화 (1회)
    useEffect(() => {
        if (data?.eventIds) {
            setItems(data.eventIds);
            // 데이터가 없거나 적으면 더 이상 로드할 게 없다고 가정
            const eventIds = data.eventIds ?? [];
            setHasMore(eventIds.length > 0);
        }
    }, [data?.eventIds]);

    const handleRefresh = async () => {
        try {
            setHasMore(true);
            setLoadingMore(false);
            await refetch();
        } catch (e) {
            console.error("Refresh failed", e);
        }
    };

    const fetchMore = async () => {
        if (!isAuthenticated) return;
        setLoadingMore(true);
        try {
            const next = await getUserEventFeed(params);
            const nextIds = next?.eventIds ?? [];

            // 새로운 데이터가 없으면 무한 스크롤 중지
            if (nextIds.length === 0) {
                setHasMore(false);
                return;
            }

            setItems(prev => {
                if (prev.length === 0) {
                    // 첫 번째 로드인 경우
                    if (nextIds.length === 0) {
                        setHasMore(false);
                    }
                    return nextIds;
                }

                const seen = new Set(prev);
                const append = nextIds.filter(id => !seen.has(id));

                // 새로운 아이템이 없으면 무한 스크롤 중지
                if (append.length === 0) {
                    setHasMore(false);
                    return prev;
                }

                return [...prev, ...append];
            });
        } catch (e) {
            console.error("Fetch more failed", e);
            // 에러 발생 시에도 무한 스크롤 중지
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    };


    // if (isLoading && items.length === 0) return null;

    return (<PullToRefresh
            onRefresh={handleRefresh}
            canFetchMore={true}
            onFetchMore={fetchMore}
            pullingContent={
                <div className="w-full h-10 flex items-center justify-center text-sm text-gray-500 select-none">
                    당겨서 새로고침
                </div>
            }
            pullDownThreshold={80}
            className="overflow-y-auto"
        >
            <div
                className="  pb-4"
            >

                <div className="flex flex-col gap-4">
                    <CategoryBar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                    {items.map((e, index) => (
                        <React.Fragment key={e || Math.random()}>
                            <EventFeed eventId={e}/>
                            {index === 1 && <AdFeed/>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </PullToRefresh>
    )
}