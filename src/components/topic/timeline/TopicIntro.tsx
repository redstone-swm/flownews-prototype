// src/components/topic/timeline/TopicIntro.tsx
import {motion} from "framer-motion";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface TopicIntroductionProps {
    topic: {
        id: number;
        title: string;
        description?: string;
        imageUrl?: string;
    };
    isActive: boolean;
    isTextVisible: boolean;
}

export default function TopicIntro({topic, isActive, isTextVisible}: TopicIntroductionProps) {
    if (!isActive) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -30}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="flex flex-col h-full items-center justify-center relative"
        >
            <div className="max-w-4xl">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{
                        opacity: isTextVisible ? 1 : 0,
                        y: isTextVisible ? 0 : -20
                    }}
                    transition={{duration: 0.3, delay: 0.05}}
                    className="text-center mb-4"
                >
                    <h2
                        className="text-3xl lg:text-4xl text-white font-bold"
                        style={{letterSpacing: '0.4em'}}
                    >
                        {topic.title}
                    </h2>
                </motion.div>

                {topic.description && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: isTextVisible ? 1 : 0,
                            y: isTextVisible ? 0 : 20
                        }}
                        transition={{duration: 0.3, delay: 0.15}}
                        className="mb-8"
                    >
                        <p className="text-center text-lg lg:text-xl text-white/90 font-extralight tracking-widest">
                            {topic.description}
                        </p>
                    </motion.div>
                )}

                {/* Swipe Hint */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{
                        opacity: isTextVisible ? 1 : 0,
                        y: isTextVisible ? 0 : 20
                    }}
                    transition={{duration: 0.3, delay: 0.25}}
                    className="text-center mt-8"
                >
                    <div className="flex items-center justify-center space-x-2 text-white/60">
                        <span
                        >
                            읽으려면 오른쪽으로 스와이프하세요
                        </span>
                    </div>

                </motion.div>

            </div>
        </motion.div>
    );
}
