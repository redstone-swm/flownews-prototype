import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import type {ArticleResponse} from "@/api/models";
import {Badge} from "@/components/ui/badge.tsx";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {useNavigate} from "@tanstack/react-router";

export interface NewsArticleReferenceProps {
    article: ArticleResponse;
    eventId?: number;
    eventTitle?: string;
}

export function NewsArticleReference({
                                         article,
                                         eventId,
                                         eventTitle,
                                     }: NewsArticleReferenceProps) {
    const {trackArticleClicked} = useInteractionTracking();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (eventId) {
            trackArticleClicked(eventId, JSON.stringify({
                articleUrl: article.url,
                articleTitle: article.title,
                source: article.source
            }));
        }

        // URL을 인코딩해서 라우트 파라미터로 전달
        const encodedUrl = encodeURIComponent(article.url);
        navigate({
            to: '/article/$articleUrl',
            params: { articleUrl: encodedUrl },
            search: {
                title: article.title,
                source: article.source,
                eventTitle: eventTitle
            }
        });
    };

    return (
        <a
            href={article.url}
            onClick={handleClick}
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
                    "px-2.5 py-2"
                )}
            >
                <header className="flex items-center gap-2">
                    <Badge variant="outline" className="px-2 py-1 text-xs bg-background">
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
