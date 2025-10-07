import {NavbarBadge} from "@/components/layout/NavbarBadge.tsx";
import {useParams, useNavigate} from "@tanstack/react-router";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {useState, useEffect, useRef} from "react";
import type {CarouselApi} from "@/components/ui/carousel";
import {Card} from "@/components/ui";
import {EventImage} from "@/components/feed/EventImage.tsx";
import {format} from "date-fns";
import {ko} from "date-fns/locale";
import {TopicFollowButton} from "@/components/feed/TopicFollowButton.tsx";
import {ReactionItem} from "@/components/feed/ReactionItem.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";
import {useGetTopic} from "@/api/topics/topics.ts";



const TopicDetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams({from: '/topics/$topicId'});
    const topicId = parseInt(params.topicId);
    const {data, isLoading} = useGetTopic(topicId);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [showNav, setShowNav] = useState(false);
    const hideTimerRef = useRef<number | null>(null);

    const scheduleHide = (delay = 1500) => {
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = window.setTimeout(() => {
            setShowNav(false);
        }, delay);
    };

    const handleUserActivity = () => {
        setShowNav(true);
        scheduleHide(1500);
    };

    useEffect(() => {
        if (!api) return;
        // 초기 진입 시 잠깐 보여주기
        setShowNav(true);
        scheduleHide(1500);
        return () => {
            if (hideTimerRef.current) {
                window.clearTimeout(hideTimerRef.current);
            }
        };
    }, [api]);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
            // 슬라이드 변경 시 버튼을 잠깐 보여줬다가 숨김
            handleUserActivity();
        });
    }, [api]);

    // 현재 인덱스(0-based) 계산 - api가 준비되기 전에는 0으로 안전 가드
    const currentIndex = Math.max(0, current - 1);

    const handleBackClick = () => {
        navigate({to: '/'});
    };

    if (isLoading || !data) {
        return;
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-[#323b86] to-[#3f1f76]">
            <div className="h-[52px] flex items-center justify-between sticky py-2 pl-3 pr-4">
                <div className="flex items-center">
                    <ChevronLeft
                        size={27}
                        className="mr-1 text-white cursor-pointer hover:opacity-80"
                        onClick={handleBackClick}
                    />
                    <NavbarBadge text={data.title}/>
                </div>
                <div className="py-4 text-sm text-background flex gap-0.5">
                    <span className="font-semibold">{current}</span>
                    <span className="opacity-50">/</span>
                    <span className="opacity-50">{count}</span>
                </div>
            </div>


            <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-52px)]">
                <div className="w-full max-w-md">
                    {/* 타임라인(Date + 선) - Carousel 밖으로 이동 */}
                    {data?.events?.length > 0 && (
                        <div className="w-full flex flex-col justify-center items-center gap-1 mb-3">
                            <span className="font-sm font-semibold text-white">
                                {format(new Date(data.events[currentIndex]?.eventTime ?? data.events[0].eventTime), 'yyyy년 M월 d일 a h:mm', {locale: ko})}
                            </span>
                            <div className="w-full flex items-center relative py-1">
                                {/* 첫 번째가 아닌 경우에만 왼쪽 선 표시 - 컨테이너 왼쪽 끝까지 */}
                                {currentIndex > 0 && (
                                    <div
                                        className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-px bg-white/30"></div>
                                )}
                                {/* 마지막이 아닌 경우에만 오른쪽 선 표시 - 컨테이너 오른쪽 끝까지 */}
                                {currentIndex < (data?.events?.length ?? 0) - 1 && (
                                    <div
                                        className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-px bg-white/30"></div>
                                )}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3">
                                    <div
                                        className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Carousel + 모바일 내비 버튼 */}
                    <div
                        className="relative"
                        onTouchStart={handleUserActivity}
                        onPointerDown={handleUserActivity}
                        onMouseMove={handleUserActivity}
                    >
                        <Carousel setApi={setApi} className="w-full max-w-md">
                            <CarouselContent>
                                {data?.events?.map((event) => (
                                    <CarouselItem key={event.id} className="basis-[95%]">
                                        <div className="flex flex-col gap-3">
                                            {/* 아이템 내부 타임라인 제거 */}
                                            <Card className="h-[560px] p-4 flex flex-col gap-3">
                                                <h3 className="text-lg font-bold mb-0.5">
                                                    {event.title}
                                                </h3>
                                                <EventImage imageUrl={event.imageUrl} title={event.title}/>
                                                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                                                    {event.content}
                                                </p>
                                                <div className="flex gap-2.5 items-center justify-center">
                                                    <ReactionItem reactionTypeId={1} eventId={event.id}
                                                                  icon={ReactionIcons[1]}
                                                                  count={event.likeCount}/>
                                                    <TopicFollowButton topicId={topicId} isFollowing={data?.isFollowing ?? false}
                                                                       variant="default"/>
                                                </div>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {/*<CarouselPrevious className="text-white border-white hover:bg-white hover:text-gray-900"/>*/}
                            {/*<CarouselNext className="text-white border-white hover:bg-white hover:text-gray-900"/>*/}
                        </Carousel>

                        {/* 모바일 전용 좌/우 버튼 - 유저 활동 시 잠시 표시 */}
                        <button
                            type="button"
                            aria-label="이전"
                            aria-hidden={!showNav}
                            onClick={() => {
                                api?.scrollPrev();
                                handleUserActivity();
                            }}
                            disabled={currentIndex === 0}
                            className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-3 bg-black/30 text-white shadow-lg backdrop-blur-sm transition-opacity duration-300 ${showNav ? 'opacity-100 disabled:opacity-40' : 'opacity-0 pointer-events-none'}`}
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            type="button"
                            aria-label="다음"
                            aria-hidden={!showNav}
                            onClick={() => {
                                api?.scrollNext();
                                handleUserActivity();
                            }}
                            disabled={currentIndex === ((data?.events?.length ?? 0) - 1)}
                            className={`md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-3 bg-black/30 text-white shadow-lg backdrop-blur-sm transition-opacity duration-300 ${showNav ? 'opacity-100 disabled:opacity-40' : 'opacity-0 pointer-events-none'}`}
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicDetailsPage;
