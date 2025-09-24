import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";
import type {ArticleResponse} from "@/api/models";

export interface NewsArticleReferenceProps {
    article: ArticleResponse;
}

export function NewsArticleReference({
                                         article,
                                     }: NewsArticleReferenceProps) {
    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "block w-full",
                "cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]",
                "no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl",
                // className
            )}
            aria-label={`${article.source} - ${article.title}`}
        >
            <div
                className={cn(
                    "bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl ",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500",
                    "hover:shadow-sm transition-all duration-200",
                    "px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4"
                )}
            >
                {/* 상단: 소스 배지 / 날짜 */}
                <header className="flex items-center gap-2 text-xs sm:text-sm">
                    <span
                        className={cn(
                            "inline-flex items-center rounded-md  px-2 py-1 font-semibold",
                            "text-xs leading-none",
                            // sourceBgColor
                        )}
                    >
                        {article.source}
                    </span>
                    {/*<time*/}
                    {/*    className="text-zinc-600 dark:text-zinc-400 font-normal"*/}
                    {/*    dateTime={article.time}*/}
                    {/*>*/}
                    {/*    {article.time}*/}
                    {/*</time>*/}
                </header>

                {/* 하단: 기사 제목 */}
                <div className="mt-2 sm:mt-3 grid grid-cols-[1fr_auto] items-start gap-3">
                    <h4
                        className={cn(
                            "text-sm sm:text-base md:text-lg font-medium text-zinc-900 dark:text-zinc-100",
                            "line-clamp-2 leading-snug"
                        )}
                        title={article.title}
                    >
                        {article.title}
                    </h4>
                    <ChevronRight
                        className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 dark:text-zinc-400 stroke-2 shrink-0 mt-0.5"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </a>
    );
}
