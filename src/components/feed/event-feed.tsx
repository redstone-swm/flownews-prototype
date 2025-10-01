import * as React from "react"
import {cn} from "@/lib/utils.ts"
import {formatDate} from "date-fns"
import {ko} from "date-fns/locale"
import {Badge, Button, Card, CardContent, CardFooter} from "@/components/ui";
import {useGetEvent} from "@/api/event-query/event-query.ts";
import {Link} from "@tanstack/react-router";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {Heart} from "lucide-react";

const EventFeed = ({
                       eventId,
                       className,
                       ...props
                   }: { eventId: number, className?: string }) => {
    const {data: eventSummary, isLoading} = useGetEvent(eventId);
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
        <article className={cn(" ", className)} {...props}>
            <Card>
                <CardContent className="p-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <Link
                                to="/topics/$topicId"
                                params={{topicId: eventSummary.topics[0].id.toString()}}
                                onClick={() => trackTopicViewed(eventSummary.id)}
                            >
                                <Badge variant="outline" className="text-xs py-1 px-2.5">
                                    {eventSummary.topics[0].title}
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
                            <div className="aspect-[2/1] rounded-2xl overflow-hidden">
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
                    className="flex w-full h-full justify-center items-center mt-0 p-0 bg-gray-100 rounded-b-lg">
                    {/* 변경: justify-between 제거, 왼쪽 영역이 나머지 공간을 모두 차지하도록 */}
                    <div className="w-full h-full flex items-center gap-1">
                        <div className="flex-grow min-w-0">
                            <Button variant="ghost" className="py-3 px-2 text-sm w-full text-primary font-semibold">
                                + 관심 토픽에 추가
                            </Button>
                        </div>
                        <Button variant="ghost" className="w-[72px] shrink-0 text-muted-foreground">
                            <Heart/>
                            830
                        </Button>
                        <Button variant="ghost" className="w-[72px] shrink-0">1</Button>

                    </div>
                </CardFooter>
            </Card>
        </article>
    )
}

EventFeed.displayName = "EventFeed"

export {EventFeed}