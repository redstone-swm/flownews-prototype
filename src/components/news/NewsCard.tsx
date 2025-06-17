import {Link} from "@tanstack/react-router";

interface NewsCardProps {
    topicId: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    overlay?: 'none' | 'bottom-right';
    onClick?: () => void;
}

export default function NewsCard({
                                     topicId,
                                     title,
                                     subtitle,
                                     imageUrl,
                                     overlay = 'none',
                                 }: NewsCardProps) {

    return (
        <Link to="/topics/$topicId/events" params={{topicId: String(topicId)}}>
            <div className="relative w-full cursor-pointer">
                <img src={imageUrl} alt={title} className="rounded-sm w-full"/>
                {overlay !== 'none' ? (
                    <>
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"/>
                        <div className="absolute bottom-2 right-2 z-20 text-right text-white">
                            <p className="text-2xl font-bold drop-shadow">{title}</p>
                            <p className="text-sm text-gray-0 -mt-0.5">{subtitle}</p>
                        </div>
                    </>
                ) : (
                    <div className="text-right tracking-tighter mt-1">
                        <p className="text-2xl font-bold">{title}</p>
                        <p className="text-sm text-gray-500 -mt-0.5">{subtitle}</p>
                    </div>
                )}
            </div>
        </Link>
    );
}
