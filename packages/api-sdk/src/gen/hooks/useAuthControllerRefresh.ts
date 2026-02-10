import client from "../../client";
import { useMutation } from "@tanstack/react-query";
import type { AuthControllerRefreshMutationResponse } from "../types/AuthControllerRefresh";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AuthControllerRefreshClient = typeof client<AuthControllerRefreshMutationResponse, Error, never>;
type AuthControllerRefresh = {
    data: AuthControllerRefreshMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerRefreshMutationResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerRefreshClient>[0]>;
        return: Awaited<ReturnType<AuthControllerRefreshClient>>;
    };
};
/**
 * @summary Renovar Access Token usando Refresh Token
 * @link /auth/refresh
 */
export function useAuthControllerRefresh(options: {
    mutation?: UseMutationOptions<AuthControllerRefresh["response"], AuthControllerRefresh["error"], AuthControllerRefresh["request"]>;
    client?: AuthControllerRefresh["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<AuthControllerRefresh["data"], AuthControllerRefresh["error"], AuthControllerRefresh["request"]>({
                method: "post",
                url: `/auth/refresh`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}