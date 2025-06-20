import {Link} from "@tanstack/react-router";

interface TopicCardProps {
    topicId: number;
    title: string;
    subtitle: string | undefined;
    imageUrl: string;
    overlay?: 'none' | 'bottom-right';
    onClick?: () => void;
}

export default function TopicCard({
                                      topicId,
                                      title,
                                      subtitle,
                                      imageUrl,
                                      overlay = 'none',
                                  }: TopicCardProps) {

    return (
        <Link to="/topics/$topicId" params={{topicId: String(topicId)}}>
            <div className="relative w-full cursor-pointer">
                <img src={imageUrl} alt={title} className="rounded-sm w-full"/>
                {overlay !== 'none' ? (
                    <>
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"/>
                        <div className="absolute bottom-2 right-2 z-20 text-right text-white">
                            <p className="text-2xl font-bold">{title}</p>
                            <p className="text-sm text-gray-0 -mt-0.5">{subtitle}</p>
                        </div>
                    </>
                ) : (
                    <div className="text-right mt-1">
                        <p className="text-2xl font-bold">{title}</p>
                        <p className="text-sm text-gray-500 -mt-0.5">{subtitle}</p>
                    </div>
                )}
            </div>
        </Link>
    );
}
