import {getUserEventFeed, useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@/contexts/AuthContext.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";

export const Feeds = () => {
    const {isAuthenticated, isLoading: authLoading} = useAuth();

    const {data, isLoading, refetch} = useGetUserEventFeed({
        query: {enabled: isAuthenticated}
    });

    // 누적 아이템, 추가 로딩 여부, 더 불러올 수 있는지 여부
    const [items, setItems] = useState<number[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    // 최초 로드 시 쿼리 데이터로 초기화 (1회)
    useEffect(() => {
        if (items.length === 0 && data?.eventIds) {
            setItems(data.eventIds);
            setHasMore((data.eventIds ?? []).length > 0);
        }
    }, [data?.eventIds]);

    const handleRefresh = async () => {
        try {
            setHasMore(true);
            setLoadingMore(false);
            const fresh = await getUserEventFeed();
            const freshIds = fresh?.eventIds ?? [];
            setItems(freshIds);
            setHasMore(freshIds.length > 0);
            await refetch();
        } catch (e) {
            console.error("Refresh failed", e);
        }
    };

    const fetchMore = async () => {
        if (!isAuthenticated || loadingMore || !hasMore) return;
        setLoadingMore(true);
        try {
            const next = await getUserEventFeed();
            const nextIds = next?.eventIds ?? [];
            if (nextIds.length === 0) {
                setHasMore(false);
                return;
            }
            setItems(prev => {
                if (prev.length === 0) return nextIds;
                const seen = new Set(prev);
                const append = nextIds.filter(id => !seen.has(id));
                if (append.length === 0) {
                    setHasMore(false);
                    return prev;
                }
                return [...prev, ...append];
            });
        } catch (e) {
            console.error("Fetch more failed", e);
        } finally {
            setLoadingMore(false);
        }
    };


    // if (isLoading && items.length === 0) return null;

    return (
        <div
            className="overflow-y-auto overscroll-contain"
        >
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<div className="py-4 text-center text-sm text-muted-foreground">Loading…</div>}
                endMessage={
                    <div className="py-4 text-center text-xs text-muted-foreground">
                        더 볼 항목이 없어요
                    </div>
                }

                pullDownToRefresh
                pullDownToRefreshThreshold={100}
                refreshFunction={handleRefresh}
                pullDownToRefreshContent={
                    <div className="py-4 text-center text-sm text-muted-foreground">
                        ↓ 당겨서 새로고침
                    </div>
                }
                releaseToRefreshContent={
                    <div className="py-4 text-center text-sm text-muted-foreground">
                        ↻ 놓으면 새로고침
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                <div className="flex flex-col gap-4">
                    <CategoryBar/>
                    <div className="px-3 flex flex-col gap-4">
                        {items.map((e) => (
                            <EventFeed key={e} eventId={e}/>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}