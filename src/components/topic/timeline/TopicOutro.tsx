// src/components/topic/timeline/TopicOutro.tsx
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import TopicCard from "@/components/topic/TopicCard.tsx";
import TimelineFeedbackModal from "@/components/feedback/TimelineFeedbackModal.tsx";
import {useParams} from "@tanstack/react-router";
import type {TopicSummary} from "@/types/topic.ts";

interface TopicOutroProps {
    recommendedTopics: TopicSummary[];
    isActive: boolean;
    isTextVisible: boolean;
}

export default function TopicOutro({recommendedTopics, isActive, isTextVisible}: TopicOutroProps) {
    const [isFeedbackModalOpen, setisFeedbackModalOpen] = useState(false);
    const topicId = useParams({
        from: '/topics/$topicId/',
        select: (params) => params.topicId ? Number(params.topicId) : 0,
    })

    useEffect(() => {
        if (isActive) {
            const feedbackModalShown = localStorage.getItem('feedbackModalShown');
            if (!feedbackModalShown) {
                setisFeedbackModalOpen(true);
                localStorage.setItem('feedbackModalShown', 'true');
            }
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -30}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="flex flex-col justify-center items-center w-screen h-screen px-6"
        >
            <div className="flex flex-col justify-center items-center w-full h-full max-w-6xl">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{
                        opacity: isTextVisible ? 1 : 0,
                        y: isTextVisible ? 0 : -20
                    }}
                    transition={{duration: 0.3, delay: 0.05}}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-3xl lg:text-4xl text-white font-light mb-4"
                        style={{letterSpacing: '0.4em'}}
                    >
                        추천 토픽
                    </h2>
                    <p className="text-lg lg:text-xl text-white/80 font-extralight">
                        다른 관심사를 탐색해보세요
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={{
                        opacity: isTextVisible ? 1 : 0,
                        y: isTextVisible ? 0 : 40
                    }}
                    transition={{duration: 0.4, delay: 0.1}}
                    className="w-full"
                >
                    <div className="grid grid-cols-3 gap-6">
                        {recommendedTopics.slice(0, 3).map((topic, index) => (
                            <motion.div
                                key={topic.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{
                                    opacity: isTextVisible ? 1 : 0,
                                    y: isTextVisible ? 0 : 20
                                }}
                                transition={{duration: 0.3, delay: 0.15 + index * 0.1}}
                            >
                                <TopicCard
                                    className="text-white"
                                    id={topic.id}
                                    title={topic.title}
                                    description={topic.description}
                                    imageUrl={topic.imageUrl}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <TimelineFeedbackModal
                open={isFeedbackModalOpen}
                onOpenChange={setisFeedbackModalOpen}
                topicId={topicId}
            />
        </motion.div>
    );
}
