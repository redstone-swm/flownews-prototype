import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {NavbarBadge} from "@/components/layout/NavbarBadge.tsx";
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

const mockTopics =
    {
        id: 1,
        title: '2025년 뉴진스 활동',
        events: [
            {
                id: 1,
                eventTime: '2025-09-23T11:16:00',
                title: '뉴진스가 새로운 앨범(어텐션) 발표',
                description: "걸그룹 뉴진스(NewJeans)가 새로운 앨범 Attention을 발표했습니다. 이번 앨범은 뉴진스 특유의 청량하고 자유로운 감성을 담아내",
                imageUrl: 'https://picsum.photos/240/160?random=1',
                likes: 841,
                isLiked: true
            },
            {
                id: 2,
                eventTime: '2025-09-24T11:16:00',
                title: '뉴진스가 새로운 앨범(어텐션) ㅁㄴㅇㄹ',
                description: "걸그룹 뉴진스(NewJeans)가 새로운 앨범 Attention을 발표했습니다. 이번 앨범은 뉴진스 특유의 청량하고 자유로운 감성을 담아내",
                imageUrl: 'https://picsum.photos/240/160?random=2',
                likes: 841,
                isLiked: true
            },
            {
                id: 3,
                eventTime: '2025-09-25T11:16:00',
                title: '뉴진스가 새로운 앨범(어텐션) ㅁㄴㅇㄹ',
                description: "걸그룹 뉴진스(NewJeans)가 새로운 앨범 Attention을 발표했습니다. 이번 앨범은 뉴진스 특유의 청량하고 자유로운 감성을 담아내",
                imageUrl: 'https://picsum.photos/240/160?random=3',
                likes: 841,
                isLiked: true
            },

        ]
    };

export const Route = createFileRoute('/topics/$topicId/events/$eventId')({
    component: TopicDetailsPage,
})

function TopicDetailsPage() {
    const navigate = useNavigate();
    const {topicId, eventId} = Route.useParams();
    const topicIdNumber = parseInt(topicId);
    const eventIdNumber = parseInt(eventId);

    const data = mockTopics;
    const isLoading = false;

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [showNav, setShowNav] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const hideTimerRef = useRef<number | null>(null);

    // 현재 eventId에 해당하는 이벤트의 인덱스 찾기
    const initialEventIndex = data.events.findIndex(event => event.id === eventIdNumber);
    const currentEvent = data.events[currentEventIndex];

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

        // 초기 eventId에 해당하는 슬라이드로 이동
        if (initialEventIndex >= 0) {
            api.scrollTo(initialEventIndex);
            setCurrent(initialEventIndex + 1);
            setCurrentEventIndex(initialEventIndex);
        } else {
            const currentIndex = api.selectedScrollSnap();
            setCurrent(currentIndex + 1);
            setCurrentEventIndex(currentIndex);
        }

        api.on("select", () => {
            const newIndex = api.selectedScrollSnap();
            setCurrent(newIndex + 1);
            setCurrentEventIndex(newIndex);

            // URL의 eventId 업데이트
            const newEvent = data.events[newIndex];
            if (newEvent && newEvent.id !== eventIdNumber) {
                navigate({
                    to: '/topics/$topicId/events/$eventId',
                    params: {topicId, eventId: newEvent.id.toString()},
                    replace: true
                });
            }

            // 슬라이드 변경 시 버튼을 잠깐 보여줬다가 숨김
            handleUserActivity();
        });
    }, [api, initialEventIndex, eventIdNumber, topicId, navigate, data.events]);

    // URL의 eventId가 변경되었을 때 상태 동기화
    useEffect(() => {
        if (initialEventIndex >= 0 && initialEventIndex !== currentEventIndex) {
            setCurrentEventIndex(initialEventIndex);
        }
    }, [eventIdNumber, initialEventIndex, currentEventIndex]);

    const handleBackClick = () => {
        navigate({to: '/'});
    };

    if (isLoading || !data) {
        return null;
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
                    {data.events?.length > 0 && currentEvent && (
                        <div className="w-full flex flex-col justify-center items-center gap-1 mb-3">
                            <span className="font-sm font-semibold text-white">
                                {format(new Date(currentEvent.eventTime), 'yyyy년 M월 d일 a h:mm', {locale: ko})}
                            </span>
                            <div className="w-full flex items-center relative py-1">
                                {/* 첫 번째가 아닌 경우에만 왼쪽 선 표시 - 컨테이너 왼쪽 끝까지 */}
                                {currentEventIndex > 0 && (
                                    <div
                                        className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-px bg-white/30"></div>
                                )}
                                {/* 마지막이 아닌 경우에만 오른쪽 선 표시 - 컨테이너 오른쪽 끝까지 */}
                                {currentEventIndex < data.events.length - 1 && (
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
                                {data.events.map((event) => (
                                    <CarouselItem key={event.id} className="basis-[95%]">
                                        <div className="flex flex-col gap-3">
                                            {/* 아이템 내부 타임라인 제거 */}
                                            <Card className="h-[560px] p-4 flex flex-col gap-3">
                                                <h3 className="text-lg font-bold mb-0.5">
                                                    {event.title}
                                                </h3>
                                                <EventImage imageUrl={event.imageUrl} title={event.title}/>
                                                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                                                    {event.description}
                                                </p>
                                                <div className="flex gap-2.5 items-center justify-center">
                                                    <ReactionItem reactionTypeId={1} eventId={event.id}
                                                                  icon={ReactionIcons[1]}
                                                                  count={1}/>
                                                    <TopicFollowButton topicId={topicIdNumber} isFollowing={false}
                                                                       variant="default"/>
                                                </div>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
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
                            disabled={currentEventIndex === 0}
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
                            disabled={currentEventIndex === (data.events.length - 1)}
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
