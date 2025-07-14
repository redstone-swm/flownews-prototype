// src/components/topic/timeline/TopicIntro.tsx
import {motion} from "framer-motion";

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
            className="flex flex-col justify-center items-center w-screen h-screen px-6"
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
                    <div className="flex flex-col items-center justify-center  text-white/60">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm">읽으려면 오른쪽으로 스와이프하세요</span>
                            <motion.div
                                animate={{
                                    x: [0, 8, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-lg"
                            >
                                →
                            </motion.div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm">다른 토픽을 보려면 아래쪽으로 스와이프하세요</span>
                            <motion.div
                                animate={{
                                    y: [-4, 4, -4],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.75
                                }}
                                className="text-lg"
                            >
                                ↓
                            </motion.div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </motion.div>
    );
}
