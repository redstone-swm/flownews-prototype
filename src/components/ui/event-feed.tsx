import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsArticleReference } from "./news-article-reference"
import { ReactionBar, type ReactionsProps } from "./reaction-bar"

export interface ArticleProps {
  source: string
  date: string
  title: string
  sourceBgColor?: string
  link: string
}

export interface EventFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  event: {
    topicName: string
    eventTitle: string
    eventDescription: string
    date: string // yyyy-MM-dd hh:mm:ss format
  }
  articles: ArticleProps[]
  reactions: ReactionsProps
  imageUrl?: string
  isRecommended?: boolean
  isFollowing?: boolean
  onFollowToggle?: () => void
  showTimeline?: boolean
}

const EventFeed: React.FC<EventFeedProps> = ({
  className,
  event,
  articles,
  reactions,
  imageUrl,
  isRecommended = false,
  isFollowing = false,
  onFollowToggle,
  showTimeline = true,
  ...props
}) => {
  const hasArticles = Array.isArray(articles) && articles.length > 0

  return (
    <article className={cn("relative bg-white", className)} {...props}>
      {showTimeline && <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-300" aria-hidden="true" />}

      <div className="relative pl-10 pr-4 pt-3">
        {/* Event Header */}
        <header className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              {event.topicName}
            </h4>
            <h3 className="text-base font-medium text-gray-900 tracking-tight leading-tight mb-1 truncate">
              {event.eventTitle}
            </h3>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center gap-2 ml-4 shrink-0">
            {isRecommended && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">추천됨</span>
              </div>
            )}
            
            <button
              onClick={onFollowToggle}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                "border",
                isFollowing
                  ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  : "bg-black text-white border-black hover:bg-gray-800"
              )}
              type="button"
            >
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
          </div>
        </header>

        {/* Event Description */}
        <section className="mb-4">
          <p className="text-sm font-medium text-black tracking-tight leading-relaxed line-clamp-2">
            {event.eventDescription}
          </p>
        </section>

        {/* Image container */}
        {imageUrl && (
          <section className="mb-4">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={imageUrl}
                alt={event.eventTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Articles Section */}
        {hasArticles && (
          <section className="mb-4">
            <ul className="space-y-2">
              {articles.map((article, index) => (
                <li key={index}>
                  <NewsArticleReference {...article} className="max-w-none" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Reaction Bar Footer */}
      <footer className="pl-5 pr-4">
        <ReactionBar
          reactions={reactions}
          className="border-t border-gray-100"
        />
      </footer>
    </article>
  )
}

EventFeed.displayName = "EventFeed"

export { EventFeed }