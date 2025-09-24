import * as React from "react"
import {Heart, Angry, BarChart3, Share} from "lucide-react"
import {cn, formatCount} from "@/lib/utils.ts"

export interface ReactionItemProps {
    icon: React.ReactNode
    count: string | number
    isActive?: boolean
    className?: string
}

const ReactionItem: React.FC<ReactionItemProps> = ({
                                                       icon,
                                                       count,
                                                       isActive = false,
                                                       className
                                                   }) => {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md",
                "transition-colors select-none",
                "",
                isActive && "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                !isActive && className
            )}
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

export interface ReactionsProps {
    heartCount: number
    angryCount: number
    activeReaction?: "heart" | "angry" | null
}

export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    reactions: ReactionsProps
}

const ReactionBar: React.FC<ReactionBarProps> = ({
                                                     className,
                                                     reactions,
                                                     ...props
                                                 }) => {
    const totalStats = React.useMemo(
        () =>
            (reactions.heartCount || 0) +
            (reactions.angryCount || 0),
        [reactions.heartCount, reactions.angryCount]
    )

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
                <ReactionItem
                    icon={<Heart className="w-full h-full"/>}
                    count={formatCount(reactions.heartCount || 0)}
                    isActive={reactions.activeReaction === "heart"}
                />
                <ReactionItem
                    icon={<Angry className="w-full h-full"/>}
                    count={formatCount(reactions.angryCount || 0)}
                    isActive={reactions.activeReaction === "angry"}
                />
                <ReactionItem
                    icon={<BarChart3 className="w-full h-full"/>}
                    count={formatCount(totalStats)}
                />
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

export {ReactionBar, ReactionItem}