import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { AuthControllerMeQueryResponse } from "../types/AuthControllerMe";

 /**
 * @summary Obter dados do usuário logado
 * @link /auth/me
 */
export async function authControllerMe(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AuthControllerMeQueryResponse>["data"]> {
    const res = await client<AuthControllerMeQueryResponse>({ method: "get", url: `/auth/me`, ...options });
    return res.data;
}