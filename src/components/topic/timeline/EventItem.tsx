// src/components/topic/EventItem.tsx
import {motion} from "framer-motion";
import {format, parseISO} from "date-fns";
import {ko} from "date-fns/locale";

interface EventItemProps {
    event: {
        id: number;
        title: string;
        description?: string;
        imageUrl?: string;
        eventTime: string;
        relatedLinks?: string[];
    };
    isActive: boolean;
    isTextVisible: boolean;
}

export default function EventItem({event, isActive, isTextVisible}: EventItemProps) {
    const formatEventDate = (eventTime: string) => {
        try {
            const date = eventTime.includes('T') ? parseISO(eventTime) : new Date(eventTime);
            return format(date, 'yyyy년 M월 d일', {locale: ko});
        } catch (error) {
            return eventTime;
        }
    };

    if (!isActive) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -30}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="flex flex-col justify-center items-center w-screen h-screen px-6"
        >
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
                    className="text-2xl lg:text-4xl text-white font-light"
                    style={{letterSpacing: '0.4em'}}
                >
                    {formatEventDate(event.eventTime)}
                </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-6xl w-full">
                <motion.div
                    initial={{opacity: 0, x: -60}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: 0.05}}
                    className="relative flex-shrink-0"
                >
                    <div className="flex flex-col max-w-full lg:max-w-[500px]">
                        {event.imageUrl && (
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-[200px] lg:h-[500px] lg:w-[500px] object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                            </div>
                        )}
                        <div className=" text-gray-500/20 mt-2 text-xs">
                            본 이미지는 이해를 돕기 위한 이미지로, 실제 사건과 직접적인 관련이 없을 수 있습니다.
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, x: 60}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1"
                >
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: isTextVisible ? 1 : 0,
                            y: isTextVisible ? 0 : 20
                        }}
                        transition={{duration: 0.3, delay: 0.1}}
                        className="mb-1"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            {event.title}
                        </h1>
                    </motion.div>

                    {event.description && (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: isTextVisible ? 1 : 0,
                                y: isTextVisible ? 0 : 20
                            }}
                            transition={{duration: 0.3, delay: 0.15}}
                        >
                            <p className="text-lg lg:text-xl text-white/90 font-light ">
                                {event.description}
                            </p>
                        </motion.div>
                    )}

                    {event.relatedLinks && (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{
                                opacity: isTextVisible ? 1 : 0,
                                y: isTextVisible ? 0 : 20
                            }}
                            transition={{duration: 0.3, delay: 0.2}}
                            className="mt-6 flex flex-col items-end w-full"
                        >
                            <div className="text-white/80 text-xs font-extralight">관련 기사 보기</div>
                            <div className="flex flex-col ">
                                {event.relatedLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-xs underline transition-colors"
                                    >
                                        기사 {index + 1}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
