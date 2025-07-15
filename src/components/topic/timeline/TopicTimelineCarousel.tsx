import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel.tsx";
import {AnimatePresence} from "framer-motion";
import TopicIntro from "@/components/topic/timeline/TopicIntro.tsx";
import EventItem from "@/components/topic/timeline/EventItem.tsx";
import TopicOutro from "@/components/topic/timeline/TopicOutro.tsx";

interface TopicTimelineCarouselProps {
    data: any;
    events: any[];
    currentIndex: number;
    totalItems: number;
    isTextVisible: boolean;
    setHApi: (api: CarouselApi) => void;
}

export default function TopicTimelineCarousel({
                                                  data,
                                                  events,
                                                  currentIndex,
                                                  totalItems,
                                                  isTextVisible,
                                                  setHApi
                                              }: TopicTimelineCarouselProps) {
    return (
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
                            recommendedTopics={data.recommendTopics}
                            isActive={currentIndex === totalItems - 1}
                            isTextVisible={isTextVisible}
                        />
                    </AnimatePresence>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
}
