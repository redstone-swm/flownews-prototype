import {FormEvent, Fragment, useCallback, useEffect, useId, useMemo, useState} from "react";
import {Link, useNavigate, useRouterState, useRouter} from "@tanstack/react-router";
import {ArrowLeft, Loader2, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {
    useGetAllTopics,
    useGetTopKTopics,
} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import {useGetCurrentUser} from "@/api/user-query-api/user-query-api.ts";
import {useSearchTopics} from "@/api/topic-search-api/topic-search-api.ts";

const RECOMMENDED_LIMIT = 4;
const TOPIC_RANKING_LIMIT = 10;
const SEARCH_GRADIENT_CLASSES = "from-[#b8c8ff] via-[#d9e9ff] to-[#a8d797]";
const TAG_GRADIENT_CLASSES = "from-[#b8c8ff] via-[#d9e9ff] to-[#a8d797]";
const HASH_GRADIENT_CLASSES = "from-[#7aa6ff] via-[#6eb8ff] to-[#7fd29b]";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const GradientSearchIcon = ({className}: { className?: string }) => {
    const gradientId = useId();

    return (
        <svg
            className={className}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="6.83333"
                    y1="1"
                    x2="21.2445"
                    y2="12.6601"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#B8C8FF"/>
                    <stop offset="1" stopColor="#A8D797"/>
                </linearGradient>
            </defs>
            <path
                d="M22 22L15.9372 15.9372M15.9372 15.9372C17.5206 14.3537 18.5 12.1662 18.5 9.75C18.5 4.91751 14.5825 1 9.75 1C4.91751 1 1 4.91751 1 9.75C1 14.5825 4.91751 18.5 9.75 18.5C12.1662 18.5 14.3537 17.5206 15.9372 15.9372Z"
                stroke={`url(#${gradientId})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SearchPage = () => {
    const navigate = useNavigate();
    const router = useRouter();
    const routerQuery = useRouterState({
        select: (state) => {
            const search = state.location.search as { query?: string } | undefined;
            return search?.query ?? "";
        },
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
        if (activeQuery) {
            clearSearch();
            return;
        }
        navigate({"to": '/'});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = searchTerm.trim();

        if (!value) return;

        setIsSubmitting(true);
        try {
            await navigate({to: "/search", search: {query: value}});
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        void navigate({to: "/search", search: {}});
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-[#111121]">
            <div className="w-full border-b border-[rgba(0,0,0,0.05)]">
                <div className="mx-auto w-full md:px-10">
                    <div className=" bg-white md:hidden" aria-hidden/>
                    <div className="flex h-[52px] items-center px-3 md:px-0">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="inline-flex size-7 items-center justify-center md:size-10"
                            aria-label="뒤로가기"
                        >
                            <ArrowLeft className="size-5 text-[#111121] md:size-6"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 justify-center px-4 py-6 md:px-10 md:py-10 lg:px-16">
                <div
                    className="relative flex w-full max-w-[375px] flex-col rounded-[24px] bg-white pb-12 md:max-w-[720px] md:rounded-[32px] ">
                    <h1 className="sr-only">검색</h1>

                    <form onSubmit={handleSubmit} className="relative  flex justify-center  md:px-6">
                        <div
                            className={cn(
                                "relative w-full max-w-[351px] rounded-[12px] p-[1px] md:max-w-none",
                                "bg-gradient-to-r",
                                SEARCH_GRADIENT_CLASSES,
                            )}
                        >
                            <div
                                className="relative flex h-12 items-center rounded-[10px] bg-white px-[14px] md:h-14 md:px-5">
                                <GradientSearchIcon className="size-[18px] flex-none md:size-[20px]"/>
                                <Input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="검색어를 입력해주세요"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "flex-1 border-0 bg-transparent px-0 pl-[10px] pr-[32px] text-[16px] tracking-[-0.4px] placeholder:text-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[18px]",
                                        hasInputValue ? "font-semibold text-[#111121]" : "font-normal text-[#111121]",
                                    )}
                                />
                                {isSubmitting ? (
                                    <Loader2
                                        className="absolute right-[14px] top-1/2 size-4 -translate-y-1/2 animate-spin text-[#445bff] md:right-[20px] md:size-5"/>
                                ) : searchTerm ? (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-[12px] top-1/2 inline-flex size-[20px] -translate-y-1/2 items-center justify-center rounded-full bg-[#eef0f3] text-[#767676] transition hover:bg-[#e2e6ef] md:right-5 md:size-6"
                                        aria-label="검색어 지우기"
                                    >
                                        <X className="size-[12px] md:size-[14px]"/>
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </form>

                    <main className="mt-5 px-3 md:mt-8 md:px-6">
                        {activeQuery ? (
                            <div
                                className="mx-auto flex w-full max-w-[351px] flex-col space-y-8 md:max-w-none md:flex-row md:gap-8 md:space-y-0">
                                <div className="space-y-8 md:w-[340px] md:flex-none lg:w-[360px]">
                                    <section className="space-y-3">
                                        <h2 className="text-[16px] font-semibold tracking-[-0.4px] md:text-[18px]">검색된
                                            토픽</h2>
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
                                                        className={cn(
                                                            "relative inline-flex h-10 items-center rounded-full bg-gradient-to-r p-[1px]",
                                                            TAG_GRADIENT_CLASSES,
                                                        )}
                                                    >
                                                    <span
                                                        className="inline-flex h-full w-full items-center gap-1 rounded-full bg-white px-6 text-[14px] font-semibold tracking-[-0.35px] text-[#111121]">
                                                        <span
                                                            className={cn(
                                                                "bg-gradient-to-r bg-clip-text font-semibold text-transparent",
                                                                HASH_GRADIENT_CLASSES,
                                                            )}
                                                        >
                                                            #
                                                        </span>
                                                        {renderHighlightedText(topic.title)}
                                                    </span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-sm text-[#999999]">검색된 토픽을 찾지 못했어요.</p>
                                            )}
                                        </div>
                                    </section>

                                    {/*<div className="h-2 w-full  bg-[#eef0f3] md:hidden"/>*/}
                                </div>

                                <section className="flex-1 space-y-4 md:space-y-6">
                                    <div
                                        className="flex items-center justify-between gap-3 text-[12px] tracking-[-0.3px] text-[#999999] md:text-[13px]">
                                        <span>검색된 토픽</span>
                                        <span className="font-semibold text-[#767676]">총 {relatedTopics.length}건</span>
                                    </div>

                                    <div className="space-y-4 md:space-y-5">
                                        {isRelatedTopicsLoading ? (
                                            Array.from({length: 3}).map((_, index) => (
                                                <div key={index} className="space-y-2 rounded-[16px] bg-[#f5f7ff] p-4">
                                                    <Skeleton className="h-5 w-2/5 rounded-full"/>
                                                    <Skeleton className="h-4 w-full rounded-full"/>
                                                    <Skeleton className="h-4 w-5/6 rounded-full"/>
                                                </div>
                                            ))
                                        ) : relatedTopics.length > 0 ? (
                                            relatedTopics.map((topic) => (
                                                <article
                                                    key={topic.id}
                                                    className="rounded-[16px] bg-white  "
                                                >
                                                    <Link
                                                        to="/topics/$topicId"
                                                        params={{topicId: topic.id.toString()}}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <h3 className="text-[16px] font-semibold tracking-[-0.4px] text-[#111121] md:text-[18px]">
                                                            {renderHighlightedText(topic.title)}
                                                        </h3>
                                                        <p className="line-clamp-3 text-[14px] leading-[1.6] tracking-[-0.35px] text-[#555970] md:text-[15px]">
                                                            {renderHighlightedText(topic.description)}
                                                        </p>
                                                    </Link>
                                                </article>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[#999999] md:text-[15px]">
                                                검색어와 관련된 토픽을 찾지 못했어요.
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div
                                className="mx-auto flex w-full max-w-[351px] flex-col space-y-8 md:max-w-none md:flex-row md:gap-8 md:space-y-0">
                                <div className="space-y-8 md:w-[340px] md:flex-none lg:w-[360px]">
                                    <section className="space-y-3">
                                        <h2 className="text-[16px] font-semibold tracking-[-0.4px] md:text-[18px]">
                                            {currentUser?.name
                                                ? `${currentUser.name}님을 위한 추천 토픽`
                                                : "추천 토픽"}
                                        </h2>
                                        <div
                                            className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
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
                                                        className={cn(
                                                            "relative inline-flex h-10 flex-shrink-0 items-center rounded-full bg-gradient-to-r p-[1px]",
                                                            TAG_GRADIENT_CLASSES,
                                                        )}
                                                    >
                                                    <span
                                                        className="inline-flex h-full w-full items-center gap-1 rounded-full bg-white px-6 text-[14px] font-semibold tracking-[-0.35px] text-[#111121] md:text-[15px]">
                                                        <span
                                                            className={cn(
                                                                "bg-gradient-to-r bg-clip-text font-semibold text-transparent",
                                                                HASH_GRADIENT_CLASSES,
                                                            )}
                                                        >
                                                            #
                                                        </span>
                                                        {topic.title}
                                                    </span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-sm text-[#999999] md:text-[15px]">추천 토픽을 불러오지
                                                    못했어요.</p>
                                            )}
                                        </div>
                                    </section>

                                    {/*<div className="h-2 w-full bg-[#eef0f3] md:hidden"/>*/}
                                </div>

                                <section className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-[16px] font-semibold tracking-[-0.4px] md:text-[18px]">인기
                                            토픽</h2>
                                        <div
                                            className="flex items-center gap-1 text-[12px] font-normal tracking-[-0.3px] text-[#999999] md:text-[13px]">
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
                                                        className="flex items-start rounded-[8px] transition hover:bg-[rgba(87,125,255,0.08)]"
                                                    >
                                                    <span
                                                        className={cn(
                                                            "" +
                                                            "w-5 text-[14px] font-semibold leading-tightest",
                                                            isTopThree ? "text-[#de4444]" : "text-[#767676]",
                                                        )}
                                                    >
                                                        {rank}
                                                     </span>
                                                        <span
                                                            className="text-[14px] font-semibold tracking-[-0.35px] text-[#111121] md:text-[15px]">
                                                        {topic.title}
                                                    </span>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <p className="text-sm text-[#999999] md:text-[15px]">
                                                인기 토픽 정보를 불러올 수 없어요.
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
