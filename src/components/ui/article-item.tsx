"use client"

import * as React from "react"
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


export interface ArticleItemProps extends React.HTMLAttributes<HTMLDivElement> {
  articles: ArticleProps[]
  reactions: ReactionsProps
  showTimeline?: boolean
}

const ArticleItem: React.FC<ArticleItemProps> = ({
                                               className,
                                               articles,
                                               reactions,
                                               showTimeline = true,
                                               ...props
                                             }) => {

  const hasArticles = Array.isArray(articles) && articles.length > 0

  return (
      <article className={cn("relative bg-white", className)} {...props}>
        {showTimeline && <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-300" aria-hidden="true" />}

        <div className="relative pl-10 pr-4 pt-3">
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

        <footer className="pl-5 pr-4">
          <ReactionBar
              reactions={reactions}
              className="border-t border-gray-100"
          />
        </footer>
      </article>
  )
}

export { ArticleItem }
