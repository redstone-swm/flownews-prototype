import * as React from "react"
import {Sparkles} from "lucide-react"
import {cn} from "@/lib/utils.ts"
import {formatDistanceToNow} from "date-fns"
import {ko} from "date-fns/locale"
import type {EventSummaryResponse} from "@/api/models";
import {NewsArticleReference} from "@/components/ui/news-article-reference.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ReactionBar} from "@/components/ui";

export interface EventFeedProps extends React.HTMLAttributes<HTMLDivElement> {
    eventSummary: EventSummaryResponse
    imageUrl?: string
    isRecommended?: boolean
    isFollowing?: boolean
    onFollowToggle?: () => void
    showTimeline?: boolean
}

const EventFeed: React.FC<EventFeedProps> = ({
                                                 className,
                                                 eventSummary,
                                                 isRecommended = false,
                                                 isFollowing = false,
                                                 onFollowToggle,
                                                 showTimeline = true,
                                                 ...props
                                             }) => {
    return (
        <article className={cn("relative ", className)} {...props}>
            {showTimeline && <div className="absolute left-5 top-0 w-0.5 h-full bg-muted" aria-hidden="true"/>}

            <div className="relative pl-10 pr-4 pt-3">
                {/* Event Header */}
                <header className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                        {eventSummary.topicTitle}
                    </h4>

                    {/* Right side controls */}
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                        {isRecommended && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Sparkles className="w-4 h-4"/>
                                <span className="hidden sm:inline">추천됨</span>
                            </div>
                        )}

                        <Button
                            onClick={onFollowToggle}
                            rounded={true}
                            size={"sm"}
                        >
                            {isFollowing ? "팔로잉" : "팔로우"}
                        </Button>
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
                    reactions={
                        {
                            heartCount: 10,
                            angryCount: 15,
                            activeReaction: null
                        }
                    }
                />

                {/*Articles Section */}
                {eventSummary.articles.length > 0 && (
                    <section className="mb-4">
                        <ul className="space-y-2">
                            {eventSummary.articles.slice(0, 2).map((article, index) => (
                                <li key={index}>
                                    <NewsArticleReference article={article}/>
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