import {cn} from "@/lib/utils.ts"

interface EventImageProps {
    imageUrl?: string
    title: string
    className?: string
}

const EventImage = ({imageUrl, title, className}: EventImageProps) => {
    return (
        <div className={cn("aspect-[3/2] w-[240px] rounded-md border-1 overflow-hidden", className)}>
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x300/e5e7eb/9ca3af?text=No Image';
                }}
            />
        </div>
    )
}

EventImage.displayName = "EventImage"

export {EventImage}
