import {motion} from "framer-motion";

interface TopicTimelineIndicatorProps {
    totalItems: number;
    currentIndex: number;
}

export default function TopicTimelineIndicator({totalItems, currentIndex}: TopicTimelineIndicatorProps) {
    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-2">
                {Array.from({length: totalItems}).map((_, index) => (
                    <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? "bg-white" : "bg-white/30"
                        }`}
                        initial={{scale: 0.8}}
                        animate={{scale: index === currentIndex ? 1.2 : 0.8}}
                    />
                ))}
            </div>
        </div>
    );
}
