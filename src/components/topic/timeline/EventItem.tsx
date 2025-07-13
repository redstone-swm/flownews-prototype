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
            className="flex flex-col h-full"
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
                    className="text-3xl lg:text-4xl text-white font-light"
                    style={{letterSpacing: '0.4em'}}
                >
                    {formatEventDate(event.eventTime)}
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center flex-1">
                <motion.div
                    initial={{opacity: 0, x: -60}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: 0.05}}
                    className="relative"
                >
                    {event.imageUrl && (
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{opacity: 0, x: 60}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                >
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: isTextVisible ? 1 : 0,
                            y: isTextVisible ? 0 : 20
                        }}
                        transition={{duration: 0.3, delay: 0.1}}
                        className=""
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white ">
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
                            <p className="text-lg lg:text-xl text-white/90 font-extralight">
                                {event.description}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
