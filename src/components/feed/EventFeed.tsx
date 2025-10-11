import * as React from "react"
import {cn} from "@/lib/utils.ts"
import {formatDate} from "date-fns"
import {ko} from "date-fns/locale"
import {Badge, Card, CardContent, CardFooter, ReactionBar} from "@/components/ui";
import {useGetEvent} from "@/api/event-query/event-query.ts";
import {Link} from "@tanstack/react-router";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {EventImage} from "./EventImage";


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
        eventSummary.topics.length > 0 ? (<Card className={cn("flex flex-col gap-4 rounded-[20px] overflow-hidden", className)} {...props}>
            <CardContent className="p-3">
                <Link
                    to="/topics/$topicId/events/$eventId"
                    params={{
                        topicId: eventSummary.topics[0].id.toString(),
                        eventId: eventSummary.id.toString()
                    }}
                    onClick={() => trackTopicViewed(eventSummary.id)}
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">

                            <Badge variant="gradient" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                                <span
                                    className="bg-gradient-to-r from-[#b8c8ff] to-[#a8d797] bg-clip-text text-transparent font-semibold">
                                    #
                                </span>
                                <span className="font-semibold">
                                    {eventSummary.topics[0].title}
                                </span>
                            </Badge>
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
                            <EventImage
                                imageUrl={eventSummary.imageUrl}
                                title={eventSummary.title}
                            />
                        )}
                    </div>
                </Link>
            </CardContent>
            <CardFooter
                className="flex w-full h-full justify-center items-center mt-0 p-0 bg-gray-100">
                <ReactionBar 
                    eventId={eventId} 
                    reactions={eventSummary.reactions} 
                    onReactionChange={refetch}
                    topicId={eventSummary.topics[0].id}
                    isFollowing={eventSummary.topics[0].isFollowing}
                />
            </CardFooter>
        </Card>) : null
    )
}

EventFeed.displayName = "EventFeed"

export {EventFeed}