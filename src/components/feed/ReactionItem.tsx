import * as React from "react";
import {cn} from "@/lib/utils.ts";
import {Heart} from "lucide-react";
import {useToggleReaction} from "@/api/event-reactions/event-reactions.ts";
import {Button} from "@/components/ui";

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
        <Button
            variant="ghost"
            className={cn(
                "w-[72px] shrink-0 text-muted-foreground",
                "transition-colors select-none cursor-pointer",
                isActive && " text-red-600 dark:text-red-400",
                !isActive && className
            )}
            onClick={handleReaction}
        >
            {icon}
            <span>
                {count}
            </span>
        </Button>
    )
}

ReactionItem.displayName = "ReactionItem"

export {ReactionItem}