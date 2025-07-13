// src/pages/TopicHistoryPage.tsx
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "@tanstack/react-router";
import {useTopicDetails} from "@/hooks/useTopicDetails.tsx";
import {useTopicList} from "@/hooks/useTopicList.tsx";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import {ChevronLeft, ChevronRight,} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import NavbarOverlayLayout from "@/layouts/NavbarOverlayLayout.tsx";
import EventItem from "@/components/topic/timeline/EventItem.tsx";
import TopicIntro from "@/components/topic/timeline/TopicIntro.tsx";
import TopicOutro from "@/components/topic/timeline/TopicOutro.tsx";

export default function TopicHistoryPage() {
    const {topicId} = useParams({from: "/topics/$topicId/"});
    const navigate = useNavigate();
    const {data, isLoading, error} = useTopicDetails(Number(topicId));
    const {data: topicList} = useTopicList();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>()
    const [isTextVisible, setIsTextVisible] = useState(false);

    // 세로 스와이프 관련 상태
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 현재 토픽의 인덱스 찾기
    const currentTopicIndex = topicList?.findIndex(topic => topic.id === Number(topicId)) ?? -1;

    // 스와이프 감지 함수들
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd || !topicList || isTransitioning) return;

        const deltaX = touchStart.x - touchEnd.x;
        const deltaY = touchStart.y - touchEnd.y;
        const minSwipeDistance = 50;

        // 세로 스와이프가 가로 스와이프보다 클 때만 토픽 전환
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                // 위로 스와이프 - 다음 토픽
                if (currentTopicIndex < topicList.length - 1) {
                    navigateToTopic(topicList[currentTopicIndex + 1].id);
                }
            } else {
                // 아래로 스와이프 - 이전 토픽
                if (currentTopicIndex > 0) {
                    navigateToTopic(topicList[currentTopicIndex - 1].id);
                }
            }
        }
    };

    const navigateToTopic = (newTopicId: number) => {
        setIsTransitioning(true);
        navigate({
            to: `/topics/${newTopicId}`,
            replace: true
        });
    };

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
            setIsTextVisible(false);
            setTimeout(() => setIsTextVisible(true), 200); // 이전: 500
        });
    }, [api]);

    useEffect(() => {
        const timer = setTimeout(() => setIsTextVisible(true), 300); // 이전: 1000
        return () => clearTimeout(timer);
    }, []);

    if (isLoading || !data || error) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const events = data.events;
    const currentEvent = events[currentIndex - 1]; // 인덱스 조정 (첫 번째는 토픽 소개)
    const totalItems = events.length + 2;

    const recommendedTopics = [
        {
            topicId: 1,
            title: "AI 혁명",
            subtitle: "인공지능이 바꾸는 세상",
            imageUrl: "https://picsum.photos/400/300?random=1"
        },
        {
            topicId: 2,
            title: "기후 변화",
            subtitle: "지구를 위한 행동",
            imageUrl: "https://picsum.photos/400/300?random=2"
        },
        {
            topicId: 3,
            title: "우주 탐사",
            subtitle: "새로운 세계를 향해",
            imageUrl: "https://picsum.photos/400/300?random=3"
        },
        {
            topicId: 4,
            title: "바이오 기술",
            subtitle: "생명과학의 미래",
            imageUrl: "https://picsum.photos/400/300?random=4"
        }
    ];

    const goToPrevious = () => api?.scrollPrev();
    const goToNext = () => api?.scrollNext();

    return (
        <NavbarOverlayLayout>
            <div className="relative w-full h-screen overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    {currentEvent?.imageUrl && (
                        <motion.div
                            key={`bg-${currentEvent.id}`}
                            initial={{opacity: 0, scale: 1.05}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.97}}
                            transition={{duration: 0.6, ease: "easeInOut"}}
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: `url(${currentEvent.imageUrl})`,
                                filter: 'blur(2px) brightness(0.4)'
                            }}
                        />
                    )}
                    {currentIndex === 0 && data.imageUrl && (
                        <motion.div
                            key={`bg-topic-intro`}
                            initial={{opacity: 0, scale: 1.05}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.97}}
                            transition={{duration: 0.6, ease: "easeInOut"}}
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: `url(${data.imageUrl})`,
                                filter: 'blur(2px) brightness(0.4)'
                            }}
                        />
                    )}
                    {currentIndex === totalItems - 1 && (
                        <motion.div
                            key={`bg-topic-outro`}
                            initial={{opacity: 0, scale: 1.05}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.97}}
                            transition={{duration: 0.6, ease: "easeInOut"}}
                            className="absolute inset-0 bg-gradient-to-br from-purple-700/50 via-blue-700/50  z-0"
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"/>

                <div className="relative z-20 h-full flex flex-col">
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="flex space-x-2">
                            {Array.from({length: totalItems}).map((_, index) => (
                                <motion.div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex ? 'bg-white' : 'bg-white/30'
                                    }`}
                                    initial={{scale: 0.8}}
                                    animate={{scale: index === currentIndex ? 1.2 : 0.8}}
                                />
                            ))}
                        </div>
                    </div>

                    {currentIndex !== totalItems - 1 && (
                        <button
                            onClick={goToNext}
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
                        >
                            <ChevronRight size={24}/>
                        </button>
                    )}

                    {currentIndex !== 0 && (
                        <button
                            onClick={goToPrevious}
                            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
                        >
                            <ChevronLeft size={24}/>
                        </button>
                    )}

                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="w-full max-w-6xl">
                            <Carousel
                                opts={{align: "center", loop: false}}
                                setApi={setApi}
                                className="w-full"
                            >
                                <CarouselContent>
                                    <CarouselItem key="topic-intro" className="basis-full">
                                        <AnimatePresence>
                                            <TopicIntro
                                                topic={data}
                                                isActive={currentIndex === 0}
                                                isTextVisible={isTextVisible}
                                            />
                                        </AnimatePresence>
                                    </CarouselItem>
                                    {events.map((event, index) => (
                                        <CarouselItem key={event.id} className="basis-full">
                                            <AnimatePresence>
                                                <EventItem
                                                    event={event}
                                                    isActive={index === currentIndex - 1}
                                                    isTextVisible={isTextVisible}
                                                />
                                            </AnimatePresence>
                                        </CarouselItem>
                                    ))}
                                    <CarouselItem key="topic-outro" className="basis-full">
                                        <AnimatePresence>
                                            <TopicOutro
                                                recommendedTopics={recommendedTopics}
                                                isActive={currentIndex === totalItems - 1}
                                                isTextVisible={isTextVisible}
                                            />
                                        </AnimatePresence>
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-0 z-0"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') goToPrevious();
                        if (e.key === 'ArrowRight') goToNext();
                    }}
                    tabIndex={0}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                />
            </div>
        </NavbarOverlayLayout>
    );
}