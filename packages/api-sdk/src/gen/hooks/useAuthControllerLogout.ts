import client from "../../client";
import { useMutation } from "@tanstack/react-query";
import type { AuthControllerLogoutMutationResponse } from "../types/AuthControllerLogout";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AuthControllerLogoutClient = typeof client<AuthControllerLogoutMutationResponse, Error, never>;
type AuthControllerLogout = {
    data: AuthControllerLogoutMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerLogoutMutationResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerLogoutClient>[0]>;
        return: Awaited<ReturnType<AuthControllerLogoutClient>>;
    };
};
/**
 * @summary Logout do usuário
 * @link /auth/logout
 */
export function useAuthControllerLogout(options: {
    mutation?: UseMutationOptions<AuthControllerLogout["response"], AuthControllerLogout["error"], AuthControllerLogout["request"]>;
    client?: AuthControllerLogout["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<AuthControllerLogout["data"], AuthControllerLogout["error"], AuthControllerLogout["request"]>({
                method: "post",
                url: `/auth/logout`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}