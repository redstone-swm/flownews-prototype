import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import React, {useEffect, useState, useRef} from "react";
import {useFirebaseMessaging} from "@/hooks/useFirebaseMessaging.ts";
import {storage} from "@/lib/stoarge.ts";
import {useLoginModal} from "@/contexts/ModalContext.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";
import {AdFeed} from "@/components/feed/AdFeed.tsx";
import PullToRefresh from "react-simple-pull-to-refresh";
import {getUserEventFeed, useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {Spinner} from "@/components/ui/spinner.tsx";

export default function MainPage() {
    const {isAuthenticated, isLoading: authLoading} = useAuth();
    const {open: openLoginModal} = useLoginModal();

    const [activeCategory, setActiveCategory] = useState('MY');
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const params = activeCategory === 'MY' ? undefined : {category: activeCategory};
    const {data, refetch} = useGetUserEventFeed(params);

    // 누적 아이템, 추가 로딩 여부, 더 불러올 수 있는지 여부
    const [items, setItems] = useState<number[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // 카테고리 저장 여부 판단을 위해
    const isInitialMount = useRef(true);

    useFirebaseMessaging();

    // 스크롤 위치와 카테고리 복원
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem('mainpage-scroll-position');
        const savedCategory = sessionStorage.getItem('mainpage-active-category');

        if (savedCategory) {
            setActiveCategory(savedCategory);
        }

        if (savedScrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScrollPosition, 10));
                setIsLoading(false); // 스크롤 복구 완료 후 로딩 종료
            }, 300);
        } else {
            setIsLoading(false); // 저장된 스크롤 위치가 없으면 바로 로딩 종료
        }
    }, []);

    // 스크롤 위치 저장
    useEffect(() => {
        const saveScrollPosition = () => {
            sessionStorage.setItem('mainpage-scroll-position', window.scrollY.toString());
        };

        const handleBeforeUnload = () => {
            saveScrollPosition();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('scroll', saveScrollPosition);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('scroll', saveScrollPosition);
        };
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        sessionStorage.setItem('mainpage-active-category', activeCategory);
        setItems([]);
        setHasMore(true);
    }, [activeCategory]);

    // 메인페이지 진입 시 view_count 체크 및 로그인 모달 표시
    useEffect(() => {
        const checkViewCount = async () => {
            try {
                const currentCount = await storage.get('view_count');
                const viewCount = currentCount ? parseInt(currentCount, 10) : 0;
                const hasShownModal = await storage.get('login_modal_shown');

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

    // 카테고리 변경 시 items 리셋
    useEffect(() => {
        setItems([]);
        setHasMore(true);
    }, [activeCategory]);

    // 최초 로드 시 쿼리 데이터로 초기화 (1회)
    useEffect(() => {
        if (data?.eventIds) {
            setItems(data.eventIds);
            const eventIds = data.eventIds ?? [];
            setHasMore(eventIds.length > 0);
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
            const next = await getUserEventFeed(params);
            const nextIds = next?.eventIds ?? [];

            if (nextIds.length === 0) {
                return;
            }

            setItems(prev => {
                if (prev.length === 0) {
                    return nextIds;
                }

                const seen = new Set(prev);
                const append = nextIds.filter(id => !seen.has(id));

                if (append.length === 0) {
                    return prev;
                }

                return [...prev, ...append];
            });
        } catch (e) {
            console.error("Fetch more failed", e);
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    };

    if (isLoading) {
        return (
            <NavbarLayout>
                <div className="flex items-center justify-center h-64">
                    <Spinner/>
                </div>
            </NavbarLayout>
        );
    }

    return (
        <>
            <NavbarLayout>
                <PullToRefresh
                    onRefresh={handleRefresh}
                    onFetchMore={fetchMore}
                    canFetchMore={hasMore}
                    pullingContent={
                        <div className="w-full h-10 flex items-center justify-center text-sm text-gray-500 select-none">
                            당겨서 새로고침
                        </div>
                    }
                    pullDownThreshold={80}
                    className="overflow-y-auto"
                >
                    <div className="pb-4">
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
            </NavbarLayout>
        </>
    );
}
