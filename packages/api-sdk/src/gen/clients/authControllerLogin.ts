import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { AuthControllerLoginMutationResponse } from "../types/AuthControllerLogin";

 /**
 * @summary Login do usuário
 * @link /auth/login
 */
export async function authControllerLogin(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AuthControllerLoginMutationResponse>["data"]> {
    const res = await client<AuthControllerLoginMutationResponse>({ method: "post", url: `/auth/login`, ...options });
    return res.data;
}