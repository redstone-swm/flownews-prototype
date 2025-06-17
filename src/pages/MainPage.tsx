import NewsCarousel from "@/components/news/NewsCarousel.tsx";
import {carouselItems} from "@/data/newsData.ts";
import NewsMainCarousel from "@/components/news/NewsMainCarousel.tsx";

export default function MainPage() {
    return (
        <>
            <div className="flex flex-col items-start px-4 mx-auto max-w-screen-lg min-h-svh">
                <div className="mt-2 mb-5">
                    <div className="font-bold text-2xl mb-2">Recently Updated</div>
                    <NewsMainCarousel items={carouselItems}/>
                </div>
                <div className="mb-5">
                    <div className="font-bold text-2xl mb-2">IT</div>
                    <NewsCarousel items={carouselItems}/>
                </div>
            </div>
        </>
    )
}
