import * as React from "react"
import { Heart, Angry, BarChart3 } from "lucide-react"
import { cn, formatCount } from "@/lib/utils"

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
                "inline-flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 rounded-md",
                "transition-colors select-none",
                "text-gray-700 dark:text-gray-300",
                isActive && "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                !isActive && className
            )}
        >
      <span className={cn(
          "shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
      )}>
        {icon}
      </span>
            <span className={cn(
                "font-medium tracking-[-0.28px] text-xs sm:text-sm"
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
                "px-1 sm:px-4 py-2 h-[44px] sm:h-[49px] rounded-xl",
                "bg-white dark:bg-black/20 dark:backdrop-blur-sm",
                "border border-gray-200 dark:border-gray-700/50",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-1 sm:gap-2.5">
                <ReactionItem
                    icon={<Heart className="w-full h-full" />}
                    count={formatCount(reactions.heartCount || 0)}
                    isActive={reactions.activeReaction === "heart"}
                />
                <ReactionItem
                    icon={<Angry className="w-full h-full" />}
                    count={formatCount(reactions.angryCount || 0)}
                    isActive={reactions.activeReaction === "angry"}
                />
                <ReactionItem
                    icon={<BarChart3 className="w-full h-full" />}
                    count={formatCount(totalStats)}
                />
            </div>
        </div>
    )
}

ReactionBar.displayName = "ReactionBar"

export { ReactionBar, ReactionItem }