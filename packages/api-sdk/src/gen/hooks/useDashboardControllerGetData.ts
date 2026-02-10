import client from "../../client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { DashboardControllerGetDataQueryResponse } from "../types/DashboardControllerGetData";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type DashboardControllerGetDataClient = typeof client<DashboardControllerGetDataQueryResponse, Error, never>;
type DashboardControllerGetData = {
    data: DashboardControllerGetDataQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: DashboardControllerGetDataQueryResponse;
    client: {
        parameters: Partial<Parameters<DashboardControllerGetDataClient>[0]>;
        return: Awaited<ReturnType<DashboardControllerGetDataClient>>;
    };
};
export const dashboardControllerGetDataQueryKey = () => [{ url: "/dashboard/data" }] as const;
export type DashboardControllerGetDataQueryKey = ReturnType<typeof dashboardControllerGetDataQueryKey>;
export function dashboardControllerGetDataQueryOptions(options: DashboardControllerGetData["client"]["parameters"] = {}) {
    const queryKey = dashboardControllerGetDataQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<DashboardControllerGetData["data"], DashboardControllerGetData["error"]>({
                method: "get",
                url: `/dashboard/data`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter dados para gráficos
 * @link /dashboard/data
 */
export function useDashboardControllerGetData<TData = DashboardControllerGetData["response"], TQueryData = DashboardControllerGetData["response"], TQueryKey extends QueryKey = DashboardControllerGetDataQueryKey>(options: {
    query?: Partial<QueryObserverOptions<DashboardControllerGetData["response"], DashboardControllerGetData["error"], TData, TQueryData, TQueryKey>>;
    client?: DashboardControllerGetData["client"]["parameters"];
} = {}): UseQueryResult<TData, DashboardControllerGetData["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? dashboardControllerGetDataQueryKey();
    const query = useQuery({
        ...dashboardControllerGetDataQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, DashboardControllerGetData["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const dashboardControllerGetDataSuspenseQueryKey = () => [{ url: "/dashboard/data" }] as const;
export type DashboardControllerGetDataSuspenseQueryKey = ReturnType<typeof dashboardControllerGetDataSuspenseQueryKey>;
export function dashboardControllerGetDataSuspenseQueryOptions(options: DashboardControllerGetData["client"]["parameters"] = {}) {
    const queryKey = dashboardControllerGetDataSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<DashboardControllerGetData["data"], DashboardControllerGetData["error"]>({
                method: "get",
                url: `/dashboard/data`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter dados para gráficos
 * @link /dashboard/data
 */
export function useDashboardControllerGetDataSuspense<TData = DashboardControllerGetData["response"], TQueryKey extends QueryKey = DashboardControllerGetDataSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<DashboardControllerGetData["response"], DashboardControllerGetData["error"], TData, TQueryKey>>;
    client?: DashboardControllerGetData["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, DashboardControllerGetData["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? dashboardControllerGetDataSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...dashboardControllerGetDataSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, DashboardControllerGetData["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}