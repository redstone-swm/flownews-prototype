import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import type {ArticleResponse} from "@/api/models";
import {Badge} from "@/components/ui/badge.tsx";

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
                "bg-muted border",
                "cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]",
                "no-underline rounded-xl",
            )}
            aria-label={`${article.source} - ${article.title}`}
        >
            <div
                className={cn(
                    " rounded-xl ",
                    "transition-all duration-200",
                    "px-3 py-2.5"
                )}
            >
                <header className="flex items-center gap-2 text-xs sm:text-sm">
                    <Badge variant="outline" className="bg-background">
                        {article.source}
                    </Badge>
                </header>

                <div className="mt-2 grid grid-cols-[1fr_auto] items-start gap-3">
                    <h4
                        className=
                            "text-sm font-light line-clamp-2 leading-snug"
                        title={article.title}
                    >
                        {article.title}
                    </h4>
                    <ChevronRight
                        className="w-4 h-4 sm:w-5 sm:h-5  stroke-2 shrink-0 mt-0.5 "
                        aria-hidden="true"
                    />
                </div>
            </div>
        </a>
    );
}
