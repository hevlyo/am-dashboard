import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { AuthControllerRegisterMutationResponse } from "../types/AuthControllerRegister";

 /**
 * @summary Registrar novo usuário
 * @link /auth/register
 */
export async function authControllerRegister(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AuthControllerRegisterMutationResponse>["data"]> {
    const res = await client<AuthControllerRegisterMutationResponse>({ method: "post", url: `/auth/register`, ...options });
    return res.data;
}