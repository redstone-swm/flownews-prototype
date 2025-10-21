import {useQuery} from "@tanstack/react-query";
import type {
    UseQueryResult,
    UseQueryOptions,
    QueryFunction,
    QueryKey,
    DataTag,
    QueryClient,
    UndefinedInitialDataOptions,
    DefinedInitialDataOptions,
    DefinedUseQueryResult,
} from "@tanstack/react-query";

import type {TopicSummaryResponse} from "@/api/models/topicSummaryResponse.ts";
import {axiosInstance} from "@/api/axiosInstance.tsx";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const searchTopics = (query: string, options?: SecondParameter<typeof axiosInstance>, signal?: AbortSignal) => {
    return axiosInstance<TopicSummaryResponse[]>(
        {
            url: "/topics/search",
            method: "GET",
            params: {query},
            signal,
        },
        options,
    );
};

export const getSearchTopicsQueryKey = (query?: string) => {
    return ["/topics/search", query ?? ""] as const;
};

export const getSearchTopicsQueryOptions = <
    TData = Awaited<ReturnType<typeof searchTopics>>,
    TError = unknown,
>(
    query: string,
    options?: {query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData>>; request?: SecondParameter<typeof axiosInstance>},
) => {
    const {query: queryOptions, request: requestOptions} = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getSearchTopicsQueryKey(query);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof searchTopics>>> = ({signal}) =>
        searchTopics(query, requestOptions, signal);

    return {
        queryKey,
        queryFn,
        enabled: query.trim().length > 0,
        staleTime: 300000,
        refetchOnWindowFocus: false,
        ...queryOptions,
    } as UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData> & {
        queryKey: DataTag<QueryKey, TData, TError>;
    };
};

export function useSearchTopics<TData = Awaited<ReturnType<typeof searchTopics>>, TError = unknown>(
    query: string,
    options: {
        query: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData>
        > &
            Pick<
                DefinedInitialDataOptions<
                    Awaited<ReturnType<typeof searchTopics>>,
                    TError,
                    Awaited<ReturnType<typeof searchTopics>>
                >,
                "initialData"
            >;
        request?: SecondParameter<typeof axiosInstance>;
    },
    queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {queryKey: DataTag<QueryKey, TData, TError>};
export function useSearchTopics<TData = Awaited<ReturnType<typeof searchTopics>>, TError = unknown>(
    query: string,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData>
        > &
            Pick<
                UndefinedInitialDataOptions<
                    Awaited<ReturnType<typeof searchTopics>>,
                    TError,
                    Awaited<ReturnType<typeof searchTopics>>
                >,
                "initialData"
            >;
        request?: SecondParameter<typeof axiosInstance>;
    },
    queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {queryKey: DataTag<QueryKey, TData, TError>};
export function useSearchTopics<TData = Awaited<ReturnType<typeof searchTopics>>, TError = unknown>(
    query: string,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData>
        >;
        request?: SecondParameter<typeof axiosInstance>;
    },
    queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {queryKey: DataTag<QueryKey, TData, TError>};

export function useSearchTopics<TData = Awaited<ReturnType<typeof searchTopics>>, TError = unknown>(
    query: string,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof searchTopics>>, TError, TData>
        >;
        request?: SecondParameter<typeof axiosInstance>;
    },
    queryClient?: QueryClient,
) {
    const queryOptions = getSearchTopicsQueryOptions(query, options);
    const query = useQuery(queryOptions, queryClient) as UseQueryResult<TData, TError> & {
        queryKey: DataTag<QueryKey, TData, TError>;
    };

    query.queryKey = queryOptions.queryKey;

    return query;
}

