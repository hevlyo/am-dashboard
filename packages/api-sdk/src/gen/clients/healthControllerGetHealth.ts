import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { HealthControllerGetHealthQueryResponse } from "../types/HealthControllerGetHealth";

 /**
 * @link /health
 */
export async function healthControllerGetHealth(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<HealthControllerGetHealthQueryResponse>["data"]> {
    const res = await client<HealthControllerGetHealthQueryResponse>({ method: "get", url: `/health`, ...options });
    return res.data;
}