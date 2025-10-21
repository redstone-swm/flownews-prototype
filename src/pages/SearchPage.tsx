import {FormEvent, Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {Link, useNavigate, useRouterState} from "@tanstack/react-router";
import {ArrowLeft, Loader2, Search, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {
    useGetAllTopics,
    useGetTopKTopics,
} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import {useGetCurrentUser} from "@/api/user-query-api/user-query-api.ts";
import {useGetTopic} from "@/api/topics/topics.ts";
import {useSearchTopics} from "@/api/topic-search-api/topic-search-api.ts";

const RECOMMENDED_LIMIT = 4;
const TOPIC_RANKING_LIMIT = 10;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SearchPage = () => {
    const navigate = useNavigate();
    const routerQuery = useRouterState({
        select: (state) => (state.location.search as { q?: string } | undefined)?.q ?? "",
    });
    const [searchTerm, setSearchTerm] = useState(routerQuery);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setSearchTerm(routerQuery);
    }, [routerQuery]);

    const {data: currentUser} = useGetCurrentUser({
        query: {
            retry: false,
        },
    });

    const {
        data: recommendedTopicsData,
        isLoading: recommendedLoading,
    } = useGetAllTopics({limit: RECOMMENDED_LIMIT});

    const {
        data: topKTopics,
        isLoading: topKLoading,
    } = useGetTopKTopics({limit: TOPIC_RANKING_LIMIT});

    const recommendedTopics = useMemo(
        () => recommendedTopicsData?.slice(0, RECOMMENDED_LIMIT) ?? [],
        [recommendedTopicsData],
    );

    const trimmedQuery = routerQuery.trim();
    const activeQuery = trimmedQuery.length > 0;
    const normalizedQuery = trimmedQuery.toLowerCase();

    const {
        data: searchedTopics,
        isLoading: searchTopicsLoading,
        isFetching: searchTopicsFetching,
    } = useSearchTopics(trimmedQuery, {
        query: {
            enabled: activeQuery,
            staleTime: 300000,
            refetchOnWindowFocus: false,
        },
    });

    const relatedTopics = useMemo(() => {
        if (!activeQuery) return [];
        return searchedTopics ?? [];
    }, [activeQuery, searchedTopics]);

    const primaryTopicId = useMemo(() => {
        if (!activeQuery || !normalizedQuery) return undefined;

        const exactMatch = (searchedTopics ?? []).find((topic) => topic.title.toLowerCase() === normalizedQuery);
        if (exactMatch) return exactMatch.id;

        return searchedTopics?.[0]?.id;
    }, [activeQuery, normalizedQuery, searchedTopics]);

    const {
        data: selectedTopic,
        isLoading: topicDetailsLoading,
        isFetching: topicDetailsFetching,
    } = useGetTopic(primaryTopicId ?? 0, {
        query: {
            enabled: activeQuery && primaryTopicId != null,
            staleTime: 300000,
            refetchOnWindowFocus: false,
        },
    });

    const topicEvents = selectedTopic?.events ?? [];

    const eventMatches = useMemo(() => {
        if (!activeQuery) return [];
        if (!normalizedQuery) return topicEvents.slice(0, 3);

        const filtered = topicEvents.filter((event) => {
            const titleMatch = event.title.toLowerCase().includes(normalizedQuery);
            const descriptionMatch = event.description.toLowerCase().includes(normalizedQuery);
            return titleMatch || descriptionMatch;
        });

        const effective = filtered.length > 0 ? filtered : topicEvents;
        return effective.slice(0, 3);
    }, [activeQuery, normalizedQuery, topicEvents]);

    const totalEventCount = useMemo(() => {
        if (!activeQuery) return 0;
        if (!normalizedQuery) return topicEvents.length;

        const filteredCount = topicEvents.filter((event) => {
            const titleMatch = event.title.toLowerCase().includes(normalizedQuery);
            const descriptionMatch = event.description.toLowerCase().includes(normalizedQuery);
            return titleMatch || descriptionMatch;
        }).length;

        return filteredCount > 0 ? filteredCount : topicEvents.length;
    }, [activeQuery, normalizedQuery, topicEvents]);

    const renderHighlightedText = useCallback(
        (text: string) => {
            if (!activeQuery || !trimmedQuery) return text;

            const regex = new RegExp(`(${escapeRegExp(trimmedQuery)})`, "gi");
            const lowerQuery = trimmedQuery.toLowerCase();
            const parts = text.split(regex);

            return parts.map((part, index) => {
                if (!part) return null;
                const isMatch = part.toLowerCase() === lowerQuery;
                return isMatch ? (
                    <span key={`${part}-${index}`} className="text-[#2e51bf]">
                        {part}
                    </span>
                ) : (
                    <Fragment key={`${part}-${index}`}>{part}</Fragment>
                );
            });
        },
        [activeQuery, trimmedQuery],
    );

    const hasInputValue = searchTerm.trim().length > 0;
    const isRelatedTopicsLoading = searchTopicsLoading || searchTopicsFetching;
    const isResultsLoading = topicDetailsLoading || topicDetailsFetching;

    const formattedTimestamp = useMemo(() => {
        return new Date().toLocaleString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    }, []);

    const handleBackClick = () => {
        navigate({to: "/"});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = searchTerm.trim();

        if (!value) return;

        setIsSubmitting(true);
        try {
            await navigate({
                to: "/search",
                search: {q: value},
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        void navigate({to: "/search", search: {}});
    };

    return (
        <div className="flex min-h-screen justify-center bg-[#f6f8ff] px-4 py-6 text-[#111121]">
            <div className="relative flex w-full max-w-[375px] flex-col rounded-[24px] bg-white pb-12 shadow-[0px_30px_60px_-35px_rgba(24,60,105,0.35)]">
                <div className="h-[44px] rounded-t-[24px] bg-white" aria-hidden/>
                <div className="border-b border-[rgba(0,0,0,0.05)]">
                    <div className="flex h-[52px] items-center px-3">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="inline-flex size-7 items-center justify-center rounded-full border border-[#d9dfe8] bg-white"
                            aria-label="뒤로가기"
                        >
                            <ArrowLeft className="size-5 text-[#111121]"/>
                        </button>
                    </div>
                </div>

                <h1 className="sr-only">검색</h1>

                <form onSubmit={handleSubmit} className="relative -mt-6 flex justify-center px-6">
                    <div
                        className={cn(
                            "relative w-full max-w-[351px] rounded-[12px] border bg-white px-[10px] py-[10px]",
                            activeQuery ? "border-[#b8c8ff]" : "border-[#d9dfe8]",
                        )}
                    >
                        <Search
                            className={cn(
                                "absolute left-[10px] top-1/2 size-4 -translate-y-1/2",
                                hasInputValue ? "text-[#445bff]" : "text-[#999999]",
                            )}
                        />
                        <Input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="검색어를 입력해주세요"
                            disabled={isSubmitting}
                            className={cn(
                                "h-[28px] border-0 bg-transparent pl-[34px] pr-[20px] text-[16px] tracking-[-0.4px] placeholder:text-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0",
                                hasInputValue ? "font-semibold text-[#111121]" : "font-normal text-[#111121]",
                            )}
                        />
                        {isSubmitting ? (
                            <Loader2 className="absolute right-[10px] top-1/2 size-4 -translate-y-1/2 animate-spin text-[#445bff]"/>
                        ) : searchTerm ? (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-[10px] top-1/2 inline-flex size-[18px] -translate-y-1/2 items-center justify-center rounded-full bg-[#eef0f3] text-[#767676] transition hover:bg-[#e2e6ef]"
                                aria-label="검색어 지우기"
                            >
                                <X className="size-[10px]"/>
                            </button>
                        ) : null}
                    </div>
                </form>

                <main className="mt-5 px-6">
                    {activeQuery ? (
                        <div className="mx-auto w-full max-w-[351px] space-y-8">
                            <section className="space-y-3">
                                <h2 className="text-[16px] font-semibold tracking-[-0.4px]">검색된 토픽</h2>
                                <div className="flex flex-wrap gap-2">
                                    {isRelatedTopicsLoading ? (
                                        Array.from({length: RECOMMENDED_LIMIT}).map((_, index) => (
                                            <Skeleton key={index} className="h-10 w-[120px] rounded-full"/>
                                        ))
                                    ) : relatedTopics.length > 0 ? (
                                        relatedTopics.map((topic) => (
                                            <Link
                                                key={topic.id}
                                                to="/topics/$topicId"
                                                params={{topicId: topic.id.toString()}}
                                                className="inline-flex h-10 items-center gap-1 rounded-full border border-[#b8c8ff] bg-white px-6 text-[14px] font-semibold tracking-[-0.35px] text-[#111121]"
                                            >
                                                <span className="bg-gradient-to-r from-[#445bff] to-[#7a8cff] bg-clip-text font-semibold text-transparent">
                                                    #
                                                </span>
                                                {renderHighlightedText(topic.title)}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-sm text-[#999999]">검색된 토픽을 찾지 못했어요.</p>
                                    )}
                                </div>
                            </section>

                            <div className="h-2 w-full rounded-full bg-[#eef0f3]"/>

                            <section className="space-y-4">
                                <div className="flex items-center justify-end gap-1 text-[12px] tracking-[-0.3px]">
                                    <span className="text-[#999999]">검색된 기사 :</span>
                                    <span className="font-semibold text-[#767676]">총 {totalEventCount}건</span>
                                </div>

                                <div className="space-y-6">
                                    {isResultsLoading ? (
                                        Array.from({length: 3}).map((_, index) => (
                                            <div key={index} className="space-y-2">
                                                <Skeleton className="h-5 w-3/4 rounded-md"/>
                                                <Skeleton className="h-4 w-full rounded-md"/>
                                                <Skeleton className="h-4 w-5/6 rounded-md"/>
                                            </div>
                                        ))
                                    ) : eventMatches.length > 0 ? (
                                        eventMatches.map((event) => {
                                            const paragraphs = event.description
                                                .split(/\n+/)
                                                .map((paragraph) => paragraph.trim())
                                                .filter(Boolean);

                                            return (
                                                <article key={event.id} className="space-y-2">
                                                    <h3 className="text-[16px] font-semibold tracking-[-0.4px] text-[#111121]">
                                                        {renderHighlightedText(event.title)}
                                                    </h3>
                                                    <div className="space-y-2 text-[14px] tracking-[-0.35px] text-[#767676]">
                                                        {paragraphs.length > 0 ? (
                                                            paragraphs.map((paragraph, idx) => (
                                                                <p key={idx}>{renderHighlightedText(paragraph)}</p>
                                                            ))
                                                        ) : (
                                                            <p>{renderHighlightedText(event.description)}</p>
                                                        )}
                                                    </div>
                                                </article>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-[#999999]">검색어와 관련된 기사를 찾지 못했어요.</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="mx-auto w-full max-w-[351px] space-y-8">
                            <section className="space-y-3">
                                <h2 className="text-[16px] font-semibold tracking-[-0.4px]">
                                    {currentUser?.name
                                        ? `${currentUser.name}님을 위한 추천 토픽`
                                        : "추천 토픽"}
                                </h2>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {recommendedLoading ? (
                                        Array.from({length: RECOMMENDED_LIMIT}).map((_, index) => (
                                            <Skeleton
                                                key={index}
                                                className="h-10 w-[120px] flex-shrink-0 rounded-full bg-[#eef0f3]"
                                            />
                                        ))
                                    ) : recommendedTopics.length > 0 ? (
                                        recommendedTopics.map((topic) => (
                                            <Link
                                                key={topic.id}
                                                to="/topics/$topicId"
                                                params={{topicId: topic.id.toString()}}
                                                className="inline-flex h-10 flex-shrink-0 items-center gap-1 rounded-full border border-[#b8c8ff] bg-white px-6 text-[14px] font-semibold tracking-[-0.35px] text-[#111121]"
                                            >
                                                <span className="bg-gradient-to-r from-[#445bff] to-[#7a8cff] bg-clip-text font-semibold text-transparent">
                                                    #
                                                </span>
                                                {topic.title}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-sm text-[#999999]">추천 토픽을 불러오지 못했어요.</p>
                                    )}
                                </div>
                            </section>

                            <div className="h-2 w-full rounded-full bg-[#eef0f3]"/>

                            <section className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[16px] font-semibold tracking-[-0.4px]">인기 토픽</h2>
                                    <div className="flex items-center gap-1 text-[12px] font-normal tracking-[-0.3px] text-[#999999]">
                                        <span>{formattedTimestamp}</span>
                                        <span>기준</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {topKLoading ? (
                                        Array.from({length: TOPIC_RANKING_LIMIT}).map((_, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <Skeleton className="h-5 w-5 rounded-full bg-[#eef0f3]"/>
                                                <Skeleton className="h-4 flex-1 rounded-full bg-[#eef0f3]"/>
                                            </div>
                                        ))
                                    ) : topKTopics && topKTopics.length > 0 ? (
                                        topKTopics.map((topic, index) => {
                                            const rank = index + 1;
                                            const isTopThree = rank <= 3;

                                            return (
                                                <Link
                                                    key={topic.id}
                                                    to="/topics/$topicId"
                                                    params={{topicId: topic.id.toString()}}
                                                    className="flex items-center gap-3 rounded-[8px] px-2 py-2 transition hover:bg-[#f5f7ff]"
                                                >
                                                    <span
                                                        className={cn(
                                                            "w-5 text-[14px] font-semibold tracking-[-0.35px]",
                                                            isTopThree ? "text-[#de4444]" : "text-[#767676]",
                                                        )}
                                                    >
                                                        {rank}
                                                    </span>
                                                    <span className="text-[14px] font-semibold tracking-[-0.35px] text-[#111121]">
                                                        {topic.title}
                                                    </span>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-[#999999]">인기 토픽 정보를 불러올 수 없어요.</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}
                </main>

                <div className="mx-auto mt-12 h-[5px] w-[144px] rounded-full bg-[#00000080]"/>
            </div>
        </div>
    );
};

export default SearchPage;
