import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import TopicCard from "@/components/topic/TopicCard.tsx";
import {cn} from "@/lib/utils.ts";
import type {TopicSummary} from "@/types/topic.ts";

interface TopicCarouselProps {
    items: TopicSummary[];
    className?: string;
}

export default function TopicMainCarousel({items, className,}: TopicCarouselProps) {
    return (
        <Carousel>
            <CarouselContent className={cn("gap-1 -ml-1", className)}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="basis-[82%] lg:basis-[72%] pl-1">
                        <TopicCard
                            topicId={item.id}
                            title={item.title}
                            subtitle={item.description}
                            imageUrl={item.imageUrl}
                            overlay="bottom-right"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
