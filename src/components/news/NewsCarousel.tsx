import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import NewsCard from "@/components/news/NewsCard.tsx";
import {useNavigate} from "@tanstack/react-router";

const newsItems = [
    {
        topicId: 1,
        title: "뉴진스 사건",
        subtitle: "정상에서 법원으로",
        imageUrl: "https://picsum.photos/id/1011/400/200",
    },
    {
        topicId: 2,
        title: "강남 주가 폭락",
        subtitle: "부동산 시장 냉각",
        imageUrl: "https://picsum.photos/id/1015/400/200",
    },
    {
        topicId: 3,
        title: "카카오 대규모 구조조정",
        subtitle: "IT 업계 긴장감 고조",
        imageUrl: "https://picsum.photos/id/1021/400/200",
    },
    {
        topicId: 4,
        title: "손흥민 유로파 우승",
        subtitle: "하지만 이강인은..",
        imageUrl: "https://picsum.photos/id/1012/400/200",
    },
];

export default function NewsCarousel() {
    const navigate = useNavigate();

    const goToTopic = (topicId: number) => navigate({to: `/topics/${topicId}`});

    return (
        <Carousel>
            <CarouselContent className="gap-1 -ml-1">
                {newsItems.map((item, index) => (
                    <CarouselItem key={index} className="basis-[42%] lg:basis-[30%] pl-1">
                        <NewsCard
                            title={item.title}
                            subtitle={item.subtitle}
                            imageUrl={item.imageUrl}
                            onClick={()=>goToTopic(item.topicId)}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}