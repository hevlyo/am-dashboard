import client from "../../client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { DashboardControllerGetStatsQueryResponse } from "../types/DashboardControllerGetStats";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type DashboardControllerGetStatsClient = typeof client<DashboardControllerGetStatsQueryResponse, Error, never>;
type DashboardControllerGetStats = {
    data: DashboardControllerGetStatsQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: DashboardControllerGetStatsQueryResponse;
    client: {
        parameters: Partial<Parameters<DashboardControllerGetStatsClient>[0]>;
        return: Awaited<ReturnType<DashboardControllerGetStatsClient>>;
    };
};
export const dashboardControllerGetStatsQueryKey = () => [{ url: "/dashboard/stats" }] as const;
export type DashboardControllerGetStatsQueryKey = ReturnType<typeof dashboardControllerGetStatsQueryKey>;
export function dashboardControllerGetStatsQueryOptions(options: DashboardControllerGetStats["client"]["parameters"] = {}) {
    const queryKey = dashboardControllerGetStatsQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<DashboardControllerGetStats["data"], DashboardControllerGetStats["error"]>({
                method: "get",
                url: `/dashboard/stats`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter métricas principais (cards)
 * @link /dashboard/stats
 */
export function useDashboardControllerGetStats<TData = DashboardControllerGetStats["response"], TQueryData = DashboardControllerGetStats["response"], TQueryKey extends QueryKey = DashboardControllerGetStatsQueryKey>(options: {
    query?: Partial<QueryObserverOptions<DashboardControllerGetStats["response"], DashboardControllerGetStats["error"], TData, TQueryData, TQueryKey>>;
    client?: DashboardControllerGetStats["client"]["parameters"];
} = {}): UseQueryResult<TData, DashboardControllerGetStats["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? dashboardControllerGetStatsQueryKey();
    const query = useQuery({
        ...dashboardControllerGetStatsQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, DashboardControllerGetStats["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const dashboardControllerGetStatsSuspenseQueryKey = () => [{ url: "/dashboard/stats" }] as const;
export type DashboardControllerGetStatsSuspenseQueryKey = ReturnType<typeof dashboardControllerGetStatsSuspenseQueryKey>;
export function dashboardControllerGetStatsSuspenseQueryOptions(options: DashboardControllerGetStats["client"]["parameters"] = {}) {
    const queryKey = dashboardControllerGetStatsSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<DashboardControllerGetStats["data"], DashboardControllerGetStats["error"]>({
                method: "get",
                url: `/dashboard/stats`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter métricas principais (cards)
 * @link /dashboard/stats
 */
export function useDashboardControllerGetStatsSuspense<TData = DashboardControllerGetStats["response"], TQueryKey extends QueryKey = DashboardControllerGetStatsSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<DashboardControllerGetStats["response"], DashboardControllerGetStats["error"], TData, TQueryKey>>;
    client?: DashboardControllerGetStats["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, DashboardControllerGetStats["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? dashboardControllerGetStatsSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...dashboardControllerGetStatsSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, DashboardControllerGetStats["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}