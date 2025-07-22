// src/pages/TopicHistoryPage.tsx
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "@tanstack/react-router";
import {useTopicDetails} from "@/hooks/useTopicDetails.tsx";
import {useTopicHistoryRecord} from "@/hooks/useTopicHistoryRecord";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel.tsx";
import {NavigationArrows} from "@/components/topic/timeline/NavigationArrows.tsx";
import {motion, AnimatePresence} from "framer-motion";
import NavbarOverlayLayout from "@/layouts/NavbarOverlayLayout.tsx";
import TopicTimelineCarousel from "@/components/topic/timeline/TopicTimelineCarousel.tsx";
import TopicTimelineIndicator from "@/components/topic/timeline/TopicTimelineIndicator.tsx";


export default function TopicHistoryPage() {
    const {topicId} = useParams({from: "/topics/$topicId/"});
    const {data, isLoading, error} = useTopicDetails(Number(topicId));
    const historyRecordMutation = useTopicHistoryRecord();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hApi, setHApi] = useState<CarouselApi>(); // 가로 Carousel API
    const [vApi, setVApi] = useState<CarouselApi>(); // 세로 Carousel API
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [eventStartTime, setEventStartTime] = useState<number>(Date.now());

    const navigate = useNavigate();

    // IP 주소 가져오기 (실제 환경에서는 서버에서 처리하거나 다른 방법 사용)
    const getClientIP = () => {
        // 개발 환경에서는 임시로 localhost 사용
        return "127.0.0.1";
    };

    // 히스토리 기록 전송 함수
    const recordEventHistory = (eventId: number | null, direction: 'forward' | 'backward' | 'downward' | 'upward') => {
        const elapsedTime = (Date.now() - eventStartTime);

        historyRecordMutation.mutate({
            topicId: Number(topicId),
            eventId,
            ipAddress: getClientIP(),
            elapsedTime,
            direction
        });
    };


    useEffect(() => {
        if (!hApi) return;
        if (!data) return;

        const handleSelect = () => {
            const newIndex = hApi.selectedScrollSnap();
            const oldIndex = currentIndex;

            // 이전 이벤트 기록 전송 (intro가 아닌 경우만)
            if (oldIndex > 0 && oldIndex <= data?.events.length) {
                const eventId = data.events[oldIndex - 1].id;
                const direction = newIndex > oldIndex ? 'forward' : 'backward';
                recordEventHistory(eventId, direction);
            }

            setCurrentIndex(newIndex);
            setIsTextVisible(false);
            setTimeout(() => setIsTextVisible(true), 200);

            // 새로운 이벤트 시작 시간 기록
            setEventStartTime(Date.now());
        };

        hApi.on("select", handleSelect);

        // cleanup 함수로 이전 리스너 제거
        return () => {
            hApi.off("select", handleSelect);
        };
    }, [hApi, currentIndex, data]);

    /* ------------- 세로 Carousel(페이지 전환용) select 감지 & redirect ------------- */
    useEffect(() => {
        if (!vApi) return;
        if (!data) return;

        const handleSelect = () => {
            const idx = vApi.selectedScrollSnap();
            // 아래로 스와이프해 idx 1에 도달하면 페이지 이동
            if (idx === 1) {
                if (currentIndex > 0 && currentIndex <= data?.events.length) {
                    const eventId = data.events[currentIndex - 1].id;
                    recordEventHistory(eventId, 'downward');
                } else if (currentIndex === 0) {
                    recordEventHistory(null, 'downward');
                }

                setTimeout(() => navigate({
                    to: "/topics/$topicId",
                    params: {topicId: String(data?.recommendTopics[0].id)}
                }), 300);
            }
        };

        vApi.on("select", handleSelect);

        // cleanup 함수로 이전 리스너 제거
        return () => {
            vApi.off("select", handleSelect);
        };
    }, [vApi, navigate, currentIndex, data]);

    useEffect(() => {
        const timer = setTimeout(() => setIsTextVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading || !data || error) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center">
            </div>
        );
    }


    const events = data.events;
    const currentEvent = events[currentIndex - 1];
    const totalItems = events.length + 2; // Intro + events + Outro

    const goToPrevious = () => {
        if (hApi) {
            hApi.scrollPrev();
        }
    };

    const goToNext = () => {
        if (hApi) {
            hApi.scrollNext();
        }
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            goToPrevious();
        }
        if (e.key === "ArrowRight") {
            goToNext();
        }
    };


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
                                filter: "blur(2px) brightness(0.4)",
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
                                filter: "blur(2px) brightness(0.4)",
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
                            className="absolute inset-0 bg-gradient-to-br from-purple-700/50 via-blue-700/50 z-0"
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"/>

                <div className="relative z-20 h-full flex flex-col">
                    {/* 페이지 indicator 점 */}
                    <TopicTimelineIndicator
                        totalItems={totalItems}
                        currentIndex={currentIndex}
                    />

                    {/* 좌우 화살표 */}
                    <NavigationArrows
                        currentIndex={currentIndex}
                        totalItems={totalItems}
                        onNext={goToNext}
                        onPrevious={goToPrevious}
                    />

                    {/* ---------------- 세로 Carousel ---------------- */}
                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="w-screen">
                            <Carousel
                                opts={{
                                    axis: "y",
                                    align: "start", loop: false
                                }}
                                orientation="vertical"
                                className="h-screen"
                                setApi={setVApi}
                            >
                                <CarouselContent className="-mt-0 h-screen">
                                    <CarouselItem className="pt-0">
                                        <TopicTimelineCarousel
                                            data={data}
                                            events={events}
                                            currentIndex={currentIndex}
                                            totalItems={totalItems}
                                            isTextVisible={isTextVisible}
                                            setHApi={setHApi}
                                        />
                                    </CarouselItem>

                                    {/* --- 빈 슬라이드: 아래로 스와이프 시 '/topics'로 이동 --- */}
                                    <CarouselItem className="pt-0">
                                        <div className="w-screen h-screen flex justify-center mt-5">
                                            <div className="text-center">
                                                <p className="text-lg text-white/40 ">
                                                    아래로 스와이프하여 다음 토픽 보기
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-0 z-0"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                />
            </div>
        </NavbarOverlayLayout>
    );
}