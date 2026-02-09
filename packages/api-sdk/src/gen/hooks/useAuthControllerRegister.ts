import client from "../../client";
import { useMutation } from "@tanstack/react-query";
import type { AuthControllerRegisterMutationResponse, AuthControllerRegister409 } from "../types/AuthControllerRegister";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AuthControllerRegisterClient = typeof client<AuthControllerRegisterMutationResponse, AuthControllerRegister409, never>;
type AuthControllerRegister = {
    data: AuthControllerRegisterMutationResponse;
    error: AuthControllerRegister409;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: AuthControllerRegisterMutationResponse;
    client: {
        parameters: Partial<Parameters<AuthControllerRegisterClient>[0]>;
        return: Awaited<ReturnType<AuthControllerRegisterClient>>;
    };
};
/**
 * @summary Registrar novo usuário
 * @link /auth/register
 */
export function useAuthControllerRegister(options: {
    mutation?: UseMutationOptions<AuthControllerRegister["response"], AuthControllerRegister["error"], AuthControllerRegister["request"]>;
    client?: AuthControllerRegister["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async () => {
            const res = await client<AuthControllerRegister["data"], AuthControllerRegister["error"], AuthControllerRegister["request"]>({
                method: "post",
                url: `/auth/register`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}