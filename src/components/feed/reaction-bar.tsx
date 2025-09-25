import * as React from "react"
import {Heart, Angry, BarChart3, Share} from "lucide-react"
import {cn, formatCount} from "@/lib/utils.ts"
import type {ReactionSummaryResponse} from "@/api/models";
import {ReactionItem} from "@/components/feed/reaction-item.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";


export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    eventId: number
    reactions: ReactionSummaryResponse[]
    onReactionChange?: () => void
}

const ReactionBar: React.FC<ReactionBarProps> = ({
                                                     eventId,
                                                     className,
                                                     reactions,
                                                     onReactionChange,
                                                     ...props
                                                 }) => {

    return (
        <div
            className={cn(
                "flex items-center justify-between",
                "rounded-xl",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-1 sm:gap-2.5">
                {
                    reactions.map((reaction, index) => (
                        <ReactionItem
                            eventId={eventId}
                            reactionTypeId={reaction.reactionTypeId}
                            key={index}
                            icon={ReactionIcons[reaction.reactionTypeId]}
                            count={formatCount(reaction.count || 0)}
                            isActive={reaction.isActive}
                            onChange={() => {
                                onReactionChange && onReactionChange();
                            }}
                        />
                    ))
                }
                {/*<ReactionItem*/}
                {/*    icon={<BarChart3 className="w-full h-full"/>}*/}
                {/*    count={123}*/}
                {/*/>*/}
            </div>
            <button
                aria-label="공유"
            >
                <Share className="w-5 h-5 "/>
            </button>
        </div>
    )
}

ReactionBar.displayName = "ReactionBar"

export {ReactionBar}