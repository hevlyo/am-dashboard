import client from "../../client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { AuthControllerMeQueryResponse } from "../types/AuthControllerMe";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type AuthControllerMeClient = typeof client<AuthControllerMeQueryResponse, Error, never>;
type AuthControllerMe = {
    data: AuthControllerMeQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerMeQueryResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerMeClient>[0]>;
        return: Awaited<ReturnType<AuthControllerMeClient>>;
    };
};
export const authControllerMeQueryKey = () => [{ url: "/auth/me" }] as const;
export type AuthControllerMeQueryKey = ReturnType<typeof authControllerMeQueryKey>;
export function authControllerMeQueryOptions(options: AuthControllerMe["client"]["parameters"] = {}) {
    const queryKey = authControllerMeQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<AuthControllerMe["data"], AuthControllerMe["error"]>({
                method: "get",
                url: `/auth/me`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter dados do usuário logado
 * @link /auth/me
 */
export function useAuthControllerMe<TData = AuthControllerMe["response"], TQueryData = AuthControllerMe["response"], TQueryKey extends QueryKey = AuthControllerMeQueryKey>(options: {
    query?: Partial<QueryObserverOptions<AuthControllerMe["response"], AuthControllerMe["error"], TData, TQueryData, TQueryKey>>;
    client?: AuthControllerMe["client"]["parameters"];
} = {}): UseQueryResult<TData, AuthControllerMe["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? authControllerMeQueryKey();
    const query = useQuery({
        ...authControllerMeQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, AuthControllerMe["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const authControllerMeSuspenseQueryKey = () => [{ url: "/auth/me" }] as const;
export type AuthControllerMeSuspenseQueryKey = ReturnType<typeof authControllerMeSuspenseQueryKey>;
export function authControllerMeSuspenseQueryOptions(options: AuthControllerMe["client"]["parameters"] = {}) {
    const queryKey = authControllerMeSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<AuthControllerMe["data"], AuthControllerMe["error"]>({
                method: "get",
                url: `/auth/me`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @summary Obter dados do usuário logado
 * @link /auth/me
 */
export function useAuthControllerMeSuspense<TData = AuthControllerMe["response"], TQueryKey extends QueryKey = AuthControllerMeSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<AuthControllerMe["response"], AuthControllerMe["error"], TData, TQueryKey>>;
    client?: AuthControllerMe["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, AuthControllerMe["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? authControllerMeSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...authControllerMeSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, AuthControllerMe["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}