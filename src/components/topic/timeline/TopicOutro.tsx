// src/components/topic/timeline/TopicOutro.tsx
import {motion} from "framer-motion";
import TopicCard from "@/components/topic/TopicCard.tsx";

interface TopicOutroProps {
    recommendedTopics: {
        topicId: number;
        title: string;
        subtitle: string;
        imageUrl: string;
    }[];
    isActive: boolean;
    isTextVisible: boolean;
}

export default function TopicOutro({recommendedTopics, isActive, isTextVisible}: TopicOutroProps) {
    if (!isActive) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -30}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="flex flex-col h-full"
        >
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{
                    opacity: isTextVisible ? 1 : 0,
                    y: isTextVisible ? 0 : -20
                }}
                transition={{duration: 0.3, delay: 0.05}}
                className="text-center mb-8"
            >
                <h2
                    className="text-3xl lg:text-4xl text-white font-light "
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
                className="flex-1 flex items-center justify-center px-4"
            >
                <div className="w-full max-w-5xl">
                    <div className="grid grid-cols-3 gap-6">
                        {recommendedTopics.slice(0, 3).map((topic, index) => (
                            <motion.div
                                key={topic.topicId}
                                initial={{opacity: 0, y: 20}}
                                animate={{
                                    opacity: isTextVisible ? 1 : 0,
                                    y: isTextVisible ? 0 : 20
                                }}
                                transition={{duration: 0.3, delay: 0.15 + index * 0.1}}
                            >
                                <TopicCard
                                    className="text-white"
                                    topicId={topic.topicId}
                                    title={topic.title}
                                    subtitle={topic.subtitle}
                                    imageUrl={topic.imageUrl}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
