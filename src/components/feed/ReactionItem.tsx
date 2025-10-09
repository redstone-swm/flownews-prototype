import * as React from "react";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {useToggleReaction} from "@/api/event-reactions/event-reactions.ts";
import {Button} from "@/components/ui";

export interface ReactionItemProps {
    reactionTypeId: number
    eventId: number
    icon: React.ReactNode
    count: string | number
    isActive?: boolean
    className?: string
    onChange?: (isActive: boolean, count: number) => void
}

const ReactionItem: React.FC<ReactionItemProps> = ({
                                                       reactionTypeId,
                                                       eventId,
                                                       icon,
                                                       count: initialCount,
                                                       isActive: initialIsActive = false,
                                                       className,
                                                       onChange,
                                                   }) => {
    const [localCount, setLocalCount] = useState(initialCount);
    const [localIsActive, setLocalIsActive] = useState(initialIsActive);
    const toggleReactionMutation = useToggleReaction(
        {
            mutation: {
                onSuccess: (response) => {
                    setLocalIsActive(response.isActive);
                    setLocalCount(response.count);
                    onChange?.(response.isActive, response.count);
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
                localIsActive && " text-red-600 dark:text-red-400",
                !localIsActive && className
            )}
            onClick={handleReaction}
        >
            {icon}
            <span>
                {localCount}
            </span>
        </Button>
    )
}

ReactionItem.displayName = "ReactionItem"

export {ReactionItem}