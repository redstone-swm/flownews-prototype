// src/pages/TopicHistoryPage.tsx
import {useEffect, useState} from "react";
import {useParams} from "@tanstack/react-router";
import {useTopicDetails} from "@/hooks/useTopicDetails.tsx";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Clock, ChevronLeft, ChevronRight, Circle} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {format, parseISO} from "date-fns";
import {ko} from "date-fns/locale";

export default function TopicHistoryPage() {
    const {topicId} = useParams({from: "/topics/$topicId/"});
    const {data, isLoading, error} = useTopicDetails(Number(topicId));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>()
    const [isTextVisible, setIsTextVisible] = useState(false);

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
    const currentEvent = events[currentIndex];

    const formatEventDate = (eventTime: string) => {
        try {
            const date = eventTime.includes('T') ? parseISO(eventTime) : new Date(eventTime);
            return format(date, 'yyyy년 M월 d일', {locale: ko});
        } catch (error) {
            return eventTime;
        }
    };

    const goToPrevious = () => api?.scrollPrev();
    const goToNext = () => api?.scrollNext();

    return (
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
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"/>

            <div className="relative z-20 h-full flex flex-col">
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex space-x-2">
                        {events.map((_, index) => (
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

                <button
                    onClick={goToPrevious}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
                >
                    <ChevronLeft size={24}/>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white"
                >
                    <ChevronRight size={24}/>
                </button>

                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-6xl">
                        <Carousel
                            opts={{align: "center", loop: true}}
                            setApi={setApi}
                            className="w-full"
                        >
                            <CarouselContent>
                                {events.map((event, index) => (
                                    <CarouselItem key={event.id} className="basis-full">
                                        <AnimatePresence>
                                            {index === currentIndex && (
                                                <motion.div
                                                    initial={{opacity: 0, y: 30}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -30}}
                                                    transition={{duration: 0.4, ease: "easeOut"}}
                                                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full"
                                                >
                                                    <motion.div
                                                        initial={{opacity: 0, x: -60}}
                                                        animate={{opacity: 1, x: 0}}
                                                        transition={{duration: 0.3, delay: 0.05}}
                                                        className="relative"
                                                    >
                                                        <div
                                                            className="relative overflow-hidden rounded-2xl shadow-2xl">
                                                            <img
                                                                src={event.imageUrl}
                                                                alt={event.title}
                                                                className="w-full h-[400px] lg:h-[500px] object-cover"
                                                            />
                                                            <div
                                                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                                                        </div>
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{opacity: 0, x: 60}}
                                                        animate={{opacity: 1, x: 0}}
                                                        transition={{duration: 0.3, delay: 0.1}}
                                                    >
                                                        <motion.div
                                                            initial={{opacity: 0, y: 20}}
                                                            animate={{
                                                                opacity: isTextVisible ? 1 : 0,
                                                                y: isTextVisible ? 0 : 20
                                                            }}
                                                            transition={{duration: 0.3, delay: 0.1}}
                                                            className="mb-2"
                                                        >
                                                            <h2>{formatEventDate(event.eventTime)}</h2>
                                                            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                                                {event.title}
                                                            </h1>
                                                        </motion.div>

                                                        {event.description && (
                                                            <motion.div
                                                                initial={{opacity: 0, y: 20}}
                                                                animate={{
                                                                    opacity: isTextVisible ? 1 : 0,
                                                                    y: isTextVisible ? 0 : 20
                                                                }}
                                                                transition={{duration: 0.3, delay: 0.15}}
                                                            >
                                                                <p className="text-lg lg:text-xl text-white/90 leading-tight font-light ">
                                                                    {event.description}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </CarouselItem>
                                ))}
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
            />
        </div>
    );
}
