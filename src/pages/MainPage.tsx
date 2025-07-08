import TopicCarousel from "@/components/news/TopicCarousel.tsx";
import {carouselItems} from "@/data/newsData.ts";
import TopicMainCarousel from "@/components/news/TopicMainCarousel.tsx";
import {useTopicList} from "@/hooks/useTopicList.tsx";

export default function MainPage() {
    const {data: topics} = useTopicList();

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error loading topics.</div>;

    return (
        <>
            <div className="flex flex-col items-start px-4 mx-auto max-w-screen-lg min-h-svh">
                <div className="mt-2 mb-5">
                    <div className="font-bold text-2xl mb-2">Recently Updated</div>
                    {topics && <TopicMainCarousel items={topics}/>}
                </div>
                <div className="mb-5">
                    <div className="font-bold text-2xl mb-2">IT</div>
                    <TopicCarousel items={carouselItems}/>
                </div>
            </div>
        </>
    )
}
