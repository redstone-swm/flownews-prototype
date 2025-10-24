"use client"

import * as React from "react"
import {cn} from "@/lib/utils"
import {NewsArticleReference} from "../feed/news-article-reference.tsx"
import {ReactionBar} from "../feed/ReactionBar.tsx"
import type {ReactionSummaryResponse} from "@/api/models"


export interface ArticleProps {
    source: string
    date: string
    title: string
    sourceBgColor?: string
    link: string
}


export interface ArticleItemProps extends React.HTMLAttributes<HTMLDivElement> {
    articles: ArticleProps[]
    reactions: ReactionSummaryResponse[]
    eventId: number
    topicId: number
    isFollowing: boolean
    showTimeline?: boolean
}

const ArticleItem: React.FC<ArticleItemProps> = ({
                                                     className,
                                                     articles,
                                                     reactions,
                                                     eventId,
                                                     topicId,
                                                     isFollowing,
                                                     showTimeline = true,
                                                     ...props
                                                 }) => {

    const hasArticles = Array.isArray(articles) && articles.length > 0

    return (
        <article className={cn("relative bg-white", className)} {...props}>
            {showTimeline && <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-300" aria-hidden="true"/>}

            <div className="relative pl-10 pr-4 pt-3">
                {hasArticles && (
                    <section className="mb-4">
                        <ul className="space-y-2">
                            {articles.map((a, index) => (
                                <NewsArticleReference 
                                    key={index}
                                    article={{
                                        title: a.title,
                                        source: a.source,
                                        url: a.link,
                                        publishedAt: a.date
                                    }} 
                                    eventId={eventId}
                                />
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <footer className="pl-5 pr-4">
                <ReactionBar
                    eventId={eventId}
                    topicId={topicId}
                    isFollowing={isFollowing}
                    reactions={reactions}
                    className="border-t border-gray-100"
                />
            </footer>
        </article>
    )
}

export {ArticleItem}
