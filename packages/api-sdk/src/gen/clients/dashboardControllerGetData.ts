import client from "../../client";
import type { ResponseConfig } from "../../client";
import type { DashboardControllerGetDataQueryResponse } from "../types/DashboardControllerGetData";

 /**
 * @summary Obter dados para gráficos
 * @link /dashboard/data
 */
export async function dashboardControllerGetData(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DashboardControllerGetDataQueryResponse>["data"]> {
    const res = await client<DashboardControllerGetDataQueryResponse>({ method: "get", url: `/dashboard/data`, ...options });
    return res.data;
}