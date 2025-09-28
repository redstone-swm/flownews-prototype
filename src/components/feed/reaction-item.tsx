import * as React from "react";
import {cn} from "@/lib/utils.ts";
import {Heart} from "lucide-react";
import {useToggleReaction} from "@/api/event-reactions/event-reactions.ts";

export interface ReactionItemProps {
    reactionTypeId: number
    eventId: number
    icon: React.ReactNode
    count: string | number
    isActive?: boolean
    className?: string
    onChange?: () => void
}

const ReactionItem: React.FC<ReactionItemProps> = ({
                                                       reactionTypeId,
                                                       eventId,
                                                       icon,
                                                       count,
                                                       isActive = false,
                                                       className,
                                                       onChange,
                                                   }) => {
    const toggleReactionMutation = useToggleReaction(
        {
            mutation: {
                onSuccess: () => {
                    onChange?.()
                },
                onError: (error) => {
                    console.error('Failed to add reaction:', error)
                }
            }
        }
    )

    const handleReaction = async () => {
        toggleReactionMutation.mutate(
            {
                eventId: eventId,
                reactionTypeId: reactionTypeId,
            }
        )
    }

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md",
                "transition-colors select-none cursor-pointer",
                "",
                isActive && "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                !isActive && className
            )}
            onClick={handleReaction}
        >
      <span className={cn(
          "shrink-0 w-5 h-5"
      )}>
          {icon}
      </span>
            <span className={cn(
                "font-medium tracking-[-0.28px] text-xs"
            )}>
        {count}
      </span>
        </div>
    )
}

ReactionItem.displayName = "ReactionItem"

export {ReactionItem}