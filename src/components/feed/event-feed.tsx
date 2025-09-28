import * as React from "react"
import {cn} from "@/lib/utils.ts"
import {formatDistanceToNow} from "date-fns"
import {ko} from "date-fns/locale"
import {NewsArticleReference} from "@/components/feed/news-article-reference.tsx";
import {TopicFollowButton} from "@/components/feed/topic-follow-button.tsx";
import {ReactionBar} from "@/components/ui";
import {Skeleton} from "@/components/ui/skeleton";
import {useGetEvent} from "@/api/event-query/event-query.ts";
import {Link} from "@tanstack/react-router";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";

const EventFeed = ({
                       eventId,
                       className,
                       ...props
                   }: { eventId: number, className?: string }) => {
    const {data: eventSummary, isLoading, refetch} = useGetEvent(eventId);
    const {trackViewed, trackTopicViewed, trackTopicFollowed} = useInteractionTracking();

    React.useEffect(() => {
        if (eventSummary) {
            trackViewed(eventSummary.id);
        }
    }, [eventSummary, trackViewed]);

    if (isLoading || !eventSummary) {
        return (
            <article className={cn("relative ", className)} {...props}>
                <div className="absolute left-5 top-0 w-0.5 h-full bg-muted" aria-hidden="true"/>

                <div className="relative pl-10 pr-4 pt-3">
                    {/* Event Header Skeleton */}
                    <header className="flex justify-between items-center mb-2">
                        <Skeleton className="h-4 w-20"/>
                        <Skeleton className="h-8 w-16 rounded-full"/>
                    </header>

                    {/* Event Title and Time Skeleton */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <Skeleton className="h-6 w-3/4"/>
                        <Skeleton className="h-3 w-16"/>
                    </div>

                    {/* Event Description Skeleton */}
                    <section className="mb-4">
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-4/5"/>
                    </section>

                    {/* Image Skeleton */}
                    <section className="mb-4">
                        <Skeleton className="aspect-[2/1] w-full rounded-2xl"/>
                    </section>

                    {/*/!* Reaction Bar Skeleton *!/*/}
                    {/*<div className="flex items-center gap-2 mb-4">*/}
                    {/*    <Skeleton className="h-8 w-12 rounded-full"/>*/}
                    {/*    <Skeleton className="h-8 w-12 rounded-full"/>*/}
                    {/*    <Skeleton className="h-8 w-12 rounded-full"/>*/}
                    {/*    <Skeleton className="h-8 w-12 rounded-full"/>*/}
                    {/*</div>*/}

                    {/* Articles Section Skeleton */}
                    <section className="mb-4">
                        <Skeleton className="h-5 w-24 mb-3"/>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-3/4"/>
                                    <Skeleton className="h-3 w-1/2"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
        );
    }

    return (
        <article className={cn("relative ", className)} {...props}>
            <div className="absolute left-5 top-0 w-0.5 h-full bg-muted" aria-hidden="true"/>

            <div className="relative pl-10 pr-4 pt-3">
                {/* Event Header */}
                <header className="flex justify-between items-center mb-2">
                    <Link 
                        to={`/topics/${eventSummary.topics[0].id}`}
                        onClick={() => trackTopicViewed(eventSummary.id)}
                    >
                        <h4 className="text-sm font-medium text-muted-foreground">
                            {eventSummary.topics[0].title}
                        </h4>
                    </Link>

                    {/* Right side controls */}
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                        {/*{isRecommended && (*/}
                        {/*    <div className="flex items-center gap-1 text-xs text-gray-600">*/}
                        {/*        <Sparkles className="w-4 h-4"/>*/}
                        {/*        <span className="hidden sm:inline">추천됨</span>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <TopicFollowButton
                            topicId={eventSummary.topics[0].id}
                            isFollowing={eventSummary.topics[0].isFollowing}
                            eventId={eventSummary.id}
                            onFollowStateChange={() => {
                                refetch();
                            }}
                        />
                    </div>
                </header>

                {/* Event Title and Time */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold tracking-tight leading-tight truncate">
                        {eventSummary.title}
                    </h3>
                    <div className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(eventSummary.eventTime), {
                            addSuffix: true,
                            locale: ko,
                        })}
                    </div>
                </div>

                {/* Event Description */}
                <section className="mb-4">
                    <p className="text-sm font-medium tracking-tight leading-relaxed line-clamp-2">
                        {eventSummary.description}
                    </p>
                </section>

                {/* Image container */}
                {eventSummary.imageUrl && (
                    <section className="mb-4">
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
                    </section>
                )}

                <ReactionBar
                    className="mb-4"
                    reactions={eventSummary.reactions}
                    eventId={eventSummary.id}
                    onReactionChange={
                        () => {
                            refetch();
                        }
                    }
                />

                {/*Articles Section */}
                {eventSummary.articles.length > 0 && (
                    <section className="mb-4">
                        <ul className="space-y-2">
                            {eventSummary.articles.slice(0, 2).map((article, index) => (
                                <li key={index}>
                                    <NewsArticleReference 
                                        article={article} 
                                        eventId={eventSummary.id}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

        </article>
    )
}

EventFeed.displayName = "EventFeed"

export {EventFeed}