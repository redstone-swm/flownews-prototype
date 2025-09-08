import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";
import * as React from "react";

export interface NewsArticleReferenceProps
    extends React.HTMLAttributes<HTMLDivElement> {
    source?: string;
    date?: string;
    title?: string;
    sourceBgColor?: string;
    link: string;
}

export function NewsArticleReference({
                                         className,
                                         source,
                                         date,
                                         title,
                                         sourceBgColor = "bg-gray-700",
                                         link,
                                     }: NewsArticleReferenceProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "block w-full max-w-sm sm:max-w-md lg:max-w-lg",
                "cursor-pointer transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]",
                "no-underline",
                className
            )}
        >
            <div
                className={cn(
                    "bg-gray-50 border border-gray-300 rounded-xl hover:bg-gray-100",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    "px-3 py-2 sm:px-4 sm:py-3"
                )}
            >
                {/* 상단: 소스 배지 / 날짜 */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px]">
          <span className={cn("inline-flex items-center rounded-md text-white px-2 py-[2px] font-semibold", sourceBgColor)}>
            {source}
          </span>
                    <span className="text-gray-700 font-normal">{date}</span>
                </div>

                {/* 하단: 기사 제목 */}
                <div className="mt-1 sm:mt-2 grid grid-cols-[1fr_auto] items-center gap-2">
                    <p
                        className={cn(
                            "text-sm sm:text-base font-medium text-black",
                            "truncate"
                        )}
                        title={title}
                    >
                        {title}
                    </p>
                    <ChevronRight className="size-4 sm:size-5 text-gray-700 stroke-[2px] shrink-0"/>
                </div>
            </div>
        </a>
    );
}
