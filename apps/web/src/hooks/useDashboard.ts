import { useDashboardControllerGetStats, useDashboardControllerGetData } from '@repo/api-sdk';
import type { Filters } from '@repo/schemas';

export function useDashboardStats(filters: Filters) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v != null && v !== '')
  );

  return useDashboardControllerGetStats({
    client: {
      params,
    },
    query: {
      staleTime: 300000,
    }
  });
}

export function useDashboardData(filters: Filters) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v != null && v !== '')
  );

  return useDashboardControllerGetData({
    client: {
      params,
    },
    query: {
      staleTime: 300000,
    }
  });
}
