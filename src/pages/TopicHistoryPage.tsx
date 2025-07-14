// src/pages/TopicHistoryPage.tsx
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "@tanstack/react-router";
import {useTopicDetails} from "@/hooks/useTopicDetails.tsx";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import NavbarOverlayLayout from "@/layouts/NavbarOverlayLayout.tsx";
import EventItem from "@/components/topic/timeline/EventItem.tsx";
import TopicIntro from "@/components/topic/timeline/TopicIntro.tsx";
import TopicOutro from "@/components/topic/timeline/TopicOutro.tsx";

const recommendedTopics = [
    {
        topicId: 6,
        title: "AI 혁명",
        subtitle: "인공지능이 바꾸는 세상",
        imageUrl: "https://picsum.photos/400/300?random=1",
    },
    {
        topicId: 2,
        title: "기후 변화",
        subtitle: "지구를 위한 행동",
        imageUrl: "https://picsum.photos/400/300?random=2",
    },
    {
        topicId: 3,
        title: "우주 탐사",
        subtitle: "새로운 세계를 향해",
        imageUrl: "https://picsum.photos/400/300?random=3",
    },
    {
        topicId: 4,
        title: "바이오 기술",
        subtitle: "생명과학의 미래",
        imageUrl: "https://picsum.photos/400/300?random=4",
    },
];

export default function TopicHistoryPage() {
    const {topicId} = useParams({from: "/topics/$topicId/"});
    const {data, isLoading, error} = useTopicDetails(Number(topicId));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hApi, setHApi] = useState<CarouselApi>(); // 가로 Carousel API
    const [vApi, setVApi] = useState<CarouselApi>(); // 세로 Carousel API
    const [isTextVisible, setIsTextVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!hApi) return;
        hApi.on("select", () => {
            setCurrentIndex(hApi.selectedScrollSnap());
            setIsTextVisible(false);
            setTimeout(() => setIsTextVisible(true), 200);
        });
    }, [hApi]);

    /* ------------- 세로 Carousel(페이지 전환용) select 감지 & redirect ------------- */
    useEffect(() => {
        if (!vApi) return;
        vApi.on("select", () => {
            const idx = vApi.selectedScrollSnap();
            // 아래로 스와이프해 idx 1에 도달하면 페이지 이동
            if (idx === 1) {
                setTimeout(() => navigate({
                    to: "/topics/$topicId",
                    params: {topicId: String(recommendedTopics[0]?.topicId)}
                }), 300);
            }
        });
    }, [vApi, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => setIsTextVisible(true), 300);
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
    const currentEvent = events[currentIndex - 1];
    const totalItems = events.length + 2; // Intro + events + Outro

    const goToPrevious = () => hApi?.scrollPrev();
    const goToNext = () => hApi?.scrollNext();

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
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="flex space-x-2">
                            {Array.from({length: totalItems}).map((_, index) => (
                                <motion.div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex ? "bg-white" : "bg-white/30"
                                    }`}
                                    initial={{scale: 0.8}}
                                    animate={{scale: index === currentIndex ? 1.2 : 0.8}}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 좌우 화살표 */}
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
                                        <Carousel
                                            opts={{align: "center", loop: false}}
                                            setApi={setHApi}
                                        >
                                            <CarouselContent>
                                                {/* Intro */}
                                                <CarouselItem key="topic-intro">
                                                    <AnimatePresence>
                                                        <TopicIntro
                                                            topic={data}
                                                            isActive={currentIndex === 0}
                                                            isTextVisible={isTextVisible}
                                                        />
                                                    </AnimatePresence>
                                                </CarouselItem>
                                                {/* Events */}
                                                {events.map((event, index) => (
                                                    <CarouselItem key={event.id}>
                                                        <AnimatePresence>
                                                            <EventItem
                                                                event={event}
                                                                isActive={index === currentIndex - 1}
                                                                isTextVisible={isTextVisible}
                                                            />
                                                        </AnimatePresence>
                                                    </CarouselItem>
                                                ))}
                                                {/* Outro */}
                                                <CarouselItem key="topic-outro">
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
                                    </CarouselItem>

                                    {/* --- 빈 슬라이드: 아래로 스와이프 시 '/topics'로 이동 --- */}
                                    <CarouselItem className="pt-0">
                                        <div className="w-screen h-screen flex justify-center mt-5">
                                            <div className="text-center">
                                                <p className="text-lg text-gray-600 ">
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
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") goToPrevious();
                        if (e.key === "ArrowRight") goToNext();
                    }}
                    tabIndex={0}
                />
            </div>
        </NavbarOverlayLayout>
    );
}