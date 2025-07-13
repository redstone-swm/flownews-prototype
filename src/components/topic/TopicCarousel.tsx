import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import TopicCard from "@/components/topic/TopicCard.tsx";
import {cn} from "@/lib/utils.ts";

interface TopicItem {
    topicId: number;
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface TopicCarouselProps {
    items: TopicItem[];
    className?: string;
}

export default function TopicCarousel({items, className}: TopicCarouselProps) {
    return (
        <Carousel>
            <CarouselContent className={cn("gap-1 -ml-1", className)}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="basis-[42%] lg:basis-[30%] pl-1">
                        <TopicCard
                            topicId={item.topicId}
                            title={item.title}
                            subtitle={item.subtitle}
                            imageUrl={item.imageUrl}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
