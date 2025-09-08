"use client"

import * as React from "react"
import { cn, formatRelativeTime } from "@/lib/utils"
import { NewsArticleReference } from "./news-article-reference"
import { ReactionBar, type ReactionsProps } from "./reaction-bar"

export interface EventProps {
  title: string
  content: string
  date: string // yyyy-MM-dd hh:mm:ss format
}

export interface ArticleProps {
  source: string
  date: string
  title: string
  sourceBgColor?: string
  link: string
}


export interface EventItemProps extends React.HTMLAttributes<HTMLDivElement> {
  event: EventProps
  articles: ArticleProps[]
  reactions: ReactionsProps
  showTimeline?: boolean
}

const EventItem: React.FC<EventItemProps> = ({
                                               className,
                                               event,
                                               articles,
                                               reactions,
                                               showTimeline = true,
                                               ...props
                                             }) => {

  const hasArticles = Array.isArray(articles) && articles.length > 0

  return (
      <article className={cn("relative bg-white", className)} aria-labelledby="event-title" {...props}>
        {showTimeline && <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-300" aria-hidden="true" />}

        <div className="relative pl-10 pr-4 pt-3">
          <header className="flex items-start justify-between mb-2">
            <h3 id="event-title" className="text-base font-medium text-gray-900 tracking-tight leading-tight">
              {event.title}
            </h3>
            <time
                className="text-xs font-medium text-gray-700 tracking-tight whitespace-nowrap ml-4"
                dateTime={event.date}
            >
              {formatRelativeTime(event.date)}
            </time>
          </header>

          <section className="mb-4">
            <p className="text-sm font-medium text-black tracking-tight leading-relaxed">{event.content}</p>
          </section>

          {hasArticles && (
              <section className="mb-4">
                <ul className="space-y-2">
                  {articles.map((a) => (
                        <NewsArticleReference {...a} className="max-w-none" />
                  ))}
                </ul>
              </section>
          )}
        </div>

        <footer>
          <ReactionBar
              reactions={reactions}
              className="border-t border-gray-100"
          />
        </footer>
      </article>
  )
}

export { EventItem }
