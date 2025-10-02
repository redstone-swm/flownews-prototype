import * as React from "react"
import {Heart, Angry, BarChart3, Share} from "lucide-react"
import {cn, formatCount} from "@/lib/utils.ts"
import type {ReactionSummaryResponse} from "@/api/models";
import {ReactionItem} from "@/components/feed/ReactionItem.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";
import {Button} from "@/components/ui";
import {TopicFollowButton} from "@/components/feed/topic-follow-button.tsx";


export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    eventId: number
    topicId: number
    isFollowing: boolean
    reactions: ReactionSummaryResponse[]
    onReactionChange?: () => void
}

export const ReactionBar: React.FC<ReactionBarProps> = ({
                                                            eventId,
                                                            topicId,
                                                            isFollowing,
                                                            className,
                                                            reactions,
                                                            onReactionChange,
                                                            ...props
                                                        }) => {
    // reactionTypeId가 1인 반응 찾기 (좋아요/하트)
    const heartReaction = reactions.find(r => r.reactionTypeId === 1);

    return (
        <div className={cn("w-full h-full flex items-center", className)} {...props}>
            <div className="flex-grow min-w-0">
                <TopicFollowButton onFollowStateChange={onReactionChange} topicId={topicId} isFollowing={isFollowing}/>

            </div>
            {heartReaction && (
                <ReactionItem
                    reactionTypeId={1}
                    eventId={eventId}
                    icon={ReactionIcons[1]}
                    count={heartReaction.count}
                    isActive={heartReaction.isActive}
                    onChange={onReactionChange}
                />
            )}
            <Button variant="ghost" className="border-l py-3 px-2 w-[72px] shrink-0 ">
                <Share size={20}/>
            </Button>
        </div>
    )
}