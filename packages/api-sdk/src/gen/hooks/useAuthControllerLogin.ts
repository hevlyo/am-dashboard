import client from "../../client";
import { useMutation } from "@tanstack/react-query";
import type { AuthControllerLoginMutationResponse, AuthControllerLogin401 } from "../types/AuthControllerLogin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AuthControllerLoginClient = typeof client<AuthControllerLoginMutationResponse, AuthControllerLogin401, never>;
type AuthControllerLogin = {
    data: AuthControllerLoginMutationResponse;
    error: AuthControllerLogin401;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerLoginMutationResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerLoginClient>[0]>;
        return: Awaited<ReturnType<AuthControllerLoginClient>>;
    };
};
/**
 * @summary Login do usuário
 * @link /auth/login
 */
export function useAuthControllerLogin(options: {
    mutation?: UseMutationOptions<AuthControllerLogin["response"], AuthControllerLogin["error"], AuthControllerLogin["request"]>;
    client?: AuthControllerLogin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<AuthControllerLogin["data"], AuthControllerLogin["error"], AuthControllerLogin["request"]>({
                method: "post",
                url: `/auth/login`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}