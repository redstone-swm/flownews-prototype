import * as React from "react"
import {cn} from "@/lib/utils.ts"
import {formatDate} from "date-fns"
import {ko} from "date-fns/locale"
import {Badge, Button, Card, CardContent, CardFooter, ReactionBar} from "@/components/ui";
import {useGetEvent} from "@/api/event-query/event-query.ts";
import {Link} from "@tanstack/react-router";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";


const EventFeed = ({
                       eventId,
                       className,
                       ...props
                   }: { eventId: number, className?: string }) => {
    const {data: eventSummary, isLoading, refetch} = useGetEvent(eventId);
    const {trackViewed, trackTopicViewed} = useInteractionTracking();

    React.useEffect(() => {
        if (eventSummary) {
            trackViewed(eventSummary.id);
        }
    }, [eventSummary, trackViewed]);

    if (isLoading || !eventSummary) {
        return null;
    }

    return (
        <Card className={cn("rounded-[20px] overflow-hidden", className)} {...props}>
            <CardContent className="p-3">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <Link
                            to="/topics/$topicId"
                            params={{topicId: eventSummary.topics[0].id.toString()}}
                            onClick={() => trackTopicViewed(eventSummary.id)}
                        >
                            <Badge variant="gradient" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                                <span
                                    className="bg-gradient-to-r from-[#b8c8ff] to-[#a8d797] bg-clip-text text-transparent font-semibold">
                                    #
                                </span>
                                <span className="font-semibold">
                                    {eventSummary.topics[0].title}
                                </span>
                            </Badge>
                        </Link>
                        <div className="text-xs text-muted-foreground ">
                            {/*{formatDistanceToNow(new Date(eventSummary.eventTime), {*/}
                            {/*    addSuffix: true,*/}
                            {/*    locale: ko,*/}
                            {/*})}*/}
                            {formatDate(new Date(eventSummary.eventTime), 'PPP p', {locale: ko})}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold   truncate">
                            {eventSummary.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {eventSummary.description}
                        </p>

                    </div>

                    {eventSummary.imageUrl && (
                        <div className="aspect-[3/2] w-[240px] rounded-md border-1 overflow-hidden">
                            <img
                                src={eventSummary.imageUrl}
                                alt={eventSummary.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/600x300/e5e7eb/9ca3af?text=No Image';
                                }}
                            />
                        </div>
                    )}
                </div>

            </CardContent>
            <CardFooter
                className="flex w-full h-full justify-center items-center mt-0 p-0 bg-gray-100">
                <ReactionBar eventId={eventId} reactions={eventSummary.reactions} onReactionChange={refetch}
                             topicId={eventSummary.topics[0].id}
                             isFollowing={eventSummary.topics[0].isFollowing}/>
            </CardFooter>
        </Card>
    )
}

EventFeed.displayName = "EventFeed"

export {EventFeed}