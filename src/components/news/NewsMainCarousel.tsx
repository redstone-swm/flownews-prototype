import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import NewsCard from "@/components/news/NewsCard.tsx";
import {cn} from "@/lib/utils";

interface NewsItem {
    topicId: number;
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface NewsCarouselProps {
    items: NewsItem[];
    className?: string;
}

export default function NewsMainCarousel({items, className}: NewsCarouselProps) {
    return (
        <Carousel>
            <CarouselContent className={cn("gap-1 -ml-1", className)}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-1">
                        <NewsCard
                            overlay={"bottom-right"}
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
