import client from "../../client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { HealthControllerGetHealthQueryResponse } from "../types/HealthControllerGetHealth";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type HealthControllerGetHealthClient = typeof client<HealthControllerGetHealthQueryResponse, Error, never>;
type HealthControllerGetHealth = {
    data: HealthControllerGetHealthQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: HealthControllerGetHealthQueryResponse;
    client: {
        parameters: Partial<Parameters<HealthControllerGetHealthClient>[0]>;
        return: Awaited<ReturnType<HealthControllerGetHealthClient>>;
    };
};
export const healthControllerGetHealthQueryKey = () => [{ url: "/health" }] as const;
export type HealthControllerGetHealthQueryKey = ReturnType<typeof healthControllerGetHealthQueryKey>;
export function healthControllerGetHealthQueryOptions(options: HealthControllerGetHealth["client"]["parameters"] = {}) {
    const queryKey = healthControllerGetHealthQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<HealthControllerGetHealth["data"], HealthControllerGetHealth["error"]>({
                method: "get",
                url: `/health`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /health
 */
export function useHealthControllerGetHealth<TData = HealthControllerGetHealth["response"], TQueryData = HealthControllerGetHealth["response"], TQueryKey extends QueryKey = HealthControllerGetHealthQueryKey>(options: {
    query?: Partial<QueryObserverOptions<HealthControllerGetHealth["response"], HealthControllerGetHealth["error"], TData, TQueryData, TQueryKey>>;
    client?: HealthControllerGetHealth["client"]["parameters"];
} = {}): UseQueryResult<TData, HealthControllerGetHealth["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? healthControllerGetHealthQueryKey();
    const query = useQuery({
        ...healthControllerGetHealthQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, HealthControllerGetHealth["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const healthControllerGetHealthSuspenseQueryKey = () => [{ url: "/health" }] as const;
export type HealthControllerGetHealthSuspenseQueryKey = ReturnType<typeof healthControllerGetHealthSuspenseQueryKey>;
export function healthControllerGetHealthSuspenseQueryOptions(options: HealthControllerGetHealth["client"]["parameters"] = {}) {
    const queryKey = healthControllerGetHealthSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<HealthControllerGetHealth["data"], HealthControllerGetHealth["error"]>({
                method: "get",
                url: `/health`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /health
 */
export function useHealthControllerGetHealthSuspense<TData = HealthControllerGetHealth["response"], TQueryKey extends QueryKey = HealthControllerGetHealthSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<HealthControllerGetHealth["response"], HealthControllerGetHealth["error"], TData, TQueryKey>>;
    client?: HealthControllerGetHealth["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, HealthControllerGetHealth["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? healthControllerGetHealthSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...healthControllerGetHealthSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, HealthControllerGetHealth["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}