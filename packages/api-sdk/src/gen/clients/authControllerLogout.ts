import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { AuthControllerLogoutMutationResponse } from "../types/AuthControllerLogout";

 /**
 * @summary Logout do usuário
 * @link /auth/logout
 */
export async function authControllerLogout(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AuthControllerLogoutMutationResponse>["data"]> {
    const res = await client<AuthControllerLogoutMutationResponse>({ method: "post", url: `/auth/logout`, ...options });
    return res.data;
}