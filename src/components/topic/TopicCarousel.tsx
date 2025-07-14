import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import TopicCard from "@/components/topic/TopicCard.tsx";
import {cn} from "@/lib/utils.ts";
import type {TopicSummary} from "@/types/topic.ts";

interface TopicCarouselProps {
    items: TopicSummary[];
    className?: string;
}

export default function TopicCarousel({items, className}: TopicCarouselProps) {
    return (
        <Carousel>
            <CarouselContent className={cn("gap-1 -ml-1", className)}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="basis-[54%] lg:basis-[30%] pl-1">
                        <TopicCard
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            imageUrl={item.imageUrl}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
