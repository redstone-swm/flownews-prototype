import {createFileRoute} from '@tanstack/react-router'
import NewsCarousel from "@/components/news/NewsCarousel.tsx";

export const Route = createFileRoute('/')({
    component: MainPage,
})

function MainPage() {
    return (
        <>
            <div className="flex flex-col items-start px-4 mx-auto max-w-screen-lg min-h-svh">
                <div className="mt-2 mb-5">
                    <div className="font-bold text-2xl mb-2">Recently Updated</div>
                    <NewsCarousel/>
                </div>
                <div className="mb-5">
                    <div className="font-bold text-2xl mb-2">IT</div>
                    <NewsCarousel/>
                </div>
            </div>
        </>
    )
}
