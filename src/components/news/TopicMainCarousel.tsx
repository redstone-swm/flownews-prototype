import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import TopicCard from "@/components/news/TopicCard.tsx";
import {cn} from "@/lib/utils";
import type {TopicSummary} from "@/types/topic.ts";

interface TopicCarouselProps {
    items: TopicSummary[];
    className?: string;
}

export default function TopicMainCarousel({items, className}: TopicCarouselProps) {
    return (
        <Carousel>
            <CarouselContent className={cn("gap-1 -ml-1", className)}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-1">
                        <TopicCard
                            overlay={"bottom-right"}
                            topicId={item.id}
                            title={item.title}
                            subtitle={item.description}
                            imageUrl={item.imageUrl}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
