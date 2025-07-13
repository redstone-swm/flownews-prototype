import {Link} from "@tanstack/react-router";
import {useState} from "react";
import {Skeleton} from "../ui/skeleton";

interface TopicCardProps {
    topicId: number;
    title: string;
    subtitle: string | undefined;
    imageUrl: string;
    overlay?: 'none' | 'bottom-right';
    onClick?: () => void;
    className?: string;
}

export default function TopicCard({
                                      topicId,
                                      title,
                                      subtitle,
                                      imageUrl,
                                      overlay = 'none',
                                      className,
                                  }: TopicCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Link to="/topics/$topicId" params={{topicId: String(topicId)}} className={className}>
            <div className="relative w-full cursor-pointer rounded-lg">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    {!imageLoaded && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-lg"/>
                    )}
                    <img
                        src={imageUrl}
                        alt={title}
                        onLoad={handleImageLoad}
                        className={`
                              absolute inset-0
                              w-full h-full
                              object-cover object-center
                              transition-opacity duration-300
                              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                            `}
                    />
                </div>
                {overlay !== 'none' ? (
                    imageLoaded &&
                    <>
                        <div
                            className="rounded-lg absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"/>

                        <div className="w-2/3 absolute bottom-2 right-2 z-20 text-right">
                            <p className="text-4xl font-bold text-white/90">{title}</p>
                            <p className="text-md text-white/70 -mt-0.5 truncate">{subtitle}</p>
                        </div>
                    </>

                ) : (
                    <div className="text-right mt-2">
                        {!imageLoaded ? (
                            <>
                                <Skeleton className="h-8 w-3/4 ml-auto mb-1"/>
                                <Skeleton className="h-4 w-1/2 ml-auto"/>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl font-bold text-opacity-80">{title}</p>
                                <p className="text-sm text-gray-500/80 -mt-1">{subtitle}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}