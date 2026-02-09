import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { AuthControllerRefreshMutationResponse } from "../types/AuthControllerRefresh";

 /**
 * @summary Renovar Access Token usando Refresh Token
 * @link /auth/refresh
 */
export async function authControllerRefresh(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AuthControllerRefreshMutationResponse>["data"]> {
    const res = await client<AuthControllerRefreshMutationResponse>({ method: "post", url: `/auth/refresh`, ...options });
    return res.data;
}