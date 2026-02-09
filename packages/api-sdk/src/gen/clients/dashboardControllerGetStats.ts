import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { DashboardControllerGetStatsQueryResponse } from "../types/DashboardControllerGetStats";

 /**
 * @summary Obter métricas principais (cards)
 * @link /dashboard/stats
 */
export async function dashboardControllerGetStats(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DashboardControllerGetStatsQueryResponse>["data"]> {
    const res = await client<DashboardControllerGetStatsQueryResponse>({ method: "get", url: `/dashboard/stats`, ...options });
    return res.data;
}