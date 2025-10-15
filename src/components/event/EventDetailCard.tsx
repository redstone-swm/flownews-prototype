import {Card} from "@/components/ui";
import {EventImage} from "@/components/feed/EventImage.tsx";
import {TopicFollowButton} from "@/components/feed/TopicFollowButton.tsx";
import {ReactionItem} from "@/components/feed/ReactionItem.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";
import type {EventSummaryResponse} from "@/api/models";
import * as React from "react";

interface EventDetailCardProps {
    event: EventSummaryResponse;
    topicId: number;
    isFollowing: boolean;
    onFollowStateChange?: (newIsFollowing: boolean) => void;
}

export const EventDetailCard = ({event, topicId, isFollowing, onFollowStateChange}: EventDetailCardProps) => {
    const likeReaction = event.reactions.find(reaction => reaction.reactionTypeId === 1);
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <Card ref={cardRef}
              className="h-[560px] max-h-[80vh] p-4 flex flex-col gap-3 overflow-hidden">
            <h3 className="text-lg font-bold mb-0.5">
                {event.title}
            </h3>
            <EventImage imageUrl={event.imageUrl} title={event.title}/>
            <p className="text-muted-foreground text-sm leading-relaxed flex-grow whitespace-pre-wrap break-words">
                {event.description}
            </p>
            <div className="flex gap-2.5 items-center justify-center">
                <ReactionItem
                    reactionTypeId={1}
                    eventId={event.id}
                    icon={ReactionIcons[1]}
                    count={likeReaction?.count ?? 0}
                    isActive={likeReaction?.isActive ?? false}
                />
                <TopicFollowButton
                    topicId={topicId}
                    isFollowing={isFollowing}
                    variant="default"
                    eventId={event.id}
                    onFollowStateChange={onFollowStateChange}
                    tooltipContainer={cardRef.current}
                    showTooltip={true}
                />
            </div>
        </Card>
    );
};