import {Card, CardContent} from "@/components/ui/card.tsx";
import {Lightbulb, ChevronRight} from "lucide-react";
import {useState} from "react";
import {TopicSuggestionModal} from "./TopicSuggestionModal.tsx";

export default function TopicSuggestionBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Card className="cursor-pointer relative w-full border-none bg-yellow-100 dark:bg-yellow-300/50 shadow-sm"
                  onClick={handleClick}>
                <CardContent className="py-4 px-4">
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className="flex items-center justify-center w-16 h-16 bg-yellow-200 dark:bg-yellow-900/30 bg-opacity-60 rounded-full mb-3">
                            <Lightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-300"/>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white leading-tight tracking-tight mb-2">
                                시점이 요약해줬으면 하는 주제를 제안해주세요!
                            </h2>
                        </div>

                        <p className="text-stone-500 dark:text-stone-300 text-sm md:text-base text-center max-w-xl leading-tight tracking-tight mb-4">
                            궁금한 주제를 제안해주세요. 시점 AI가 이해하기 쉽게 요약해드릴게요.
                        </p>

                        <div
                            className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            <ChevronRight className="w-4 h-4 mr-1"/>
                            클릭하여 제안하기
                        </div>

                    </div>
                </CardContent>
            </Card>

            <TopicSuggestionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </>
    );
}