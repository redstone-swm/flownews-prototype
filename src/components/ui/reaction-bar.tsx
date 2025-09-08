import * as React from "react"
import { Heart, Angry, Frown, BarChart3, Share, Bookmark } from "lucide-react"
import { cn, formatCount } from "@/lib/utils"

export interface ReactionItemProps {
  icon: React.ReactNode
  count: string | number
  isActive?: boolean
  className?: string
}

const ReactionItem: React.FC<ReactionItemProps> = ({ icon, count, isActive = false, className }) => {
  return (
      <div
          className={cn(
              "inline-flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 rounded-md",
              "transition-colors select-none",
              isActive ? (className?.includes("text-red-600") ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600") : "text-gray-700",
              !isActive && className
          )}
      >
      <span className={cn("shrink-0",
          "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
      )}>
        {icon}
      </span>
        <span
            className={cn(
                "font-medium tracking-[-0.28px]",
                "text-xs sm:text-sm"
            )}
        >
        {count}
      </span>
      </div>
  )
}
ReactionItem.displayName = "ReactionItem"

export interface ReactionsProps {
  heartCount: number
  angryCount: number
  sadCount: number
  activeReaction?: "heart" | "angry" | "sad" | null
  isBookmarked?: boolean
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
          (reactions.angryCount || 0) +
          (reactions.sadCount || 0),
      [reactions.heartCount, reactions.angryCount, reactions.sadCount]
  )

  return (
      <div
          className={cn(
              "flex items-center justify-between",
              "px-1 sm:px-4 py-2 bg-white h-[44px] sm:h-[49px] rounded-xl",
              className
          )}
          {...props}
      >
        {/* 왼쪽: 좋아요~슬퍼요, 통계까지 4개를 왼쪽 정렬 */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          <ReactionItem
              icon={<Heart className="w-full h-full" />}
              count={formatCount(reactions.heartCount || 0)}
              isActive={reactions.activeReaction === "heart"}
              className={reactions.activeReaction === "heart" ? "bg-red-50 text-red-600" : undefined}
          />
          <ReactionItem
              icon={<Angry className="w-full h-full" />}
              count={formatCount(reactions.angryCount || 0)}
              isActive={reactions.activeReaction === "angry"}
          />
          <ReactionItem
              icon={<Frown className="w-full h-full" />}
              count={formatCount(reactions.sadCount || 0)}
              isActive={reactions.activeReaction === "sad"}
          />
          <ReactionItem
              icon={<BarChart3 className="w-full h-full" />}
              count={formatCount(totalStats)}
          />
        </div>

        {/* 오른쪽: 공유, 북마크 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
              aria-label="공유하기"
          >
            <Share className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <button
              type="button"
              aria-label={reactions.isBookmarked ? "북마크 해제" : "북마크 하기"}
              className={cn(
                  "p-2 rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200 touch-manipulation",
                  reactions.isBookmarked && "text-blue-600"
              )}
          >
            <Bookmark
                className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6",
                    reactions.isBookmarked ? "fill-current text-blue-600" : "text-gray-600"
                )}
            />
          </button>
        </div>
      </div>
  )
}

ReactionBar.displayName = "ReactionBar"

export { ReactionBar, ReactionItem }
