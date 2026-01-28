import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Filters, Stats, DashboardData } from '@repo/schemas';

export function useDashboardStats(filters: Filters) {
  return useQuery({
    queryKey: ['dashboard', 'stats', filters],
    queryFn: async () => {
      // Clean undefined filters
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      );
      
      const { data } = await api.get<Stats>('/dashboard/stats', {
        params,
      });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useDashboardData(filters: Filters) {
  return useQuery({
    queryKey: ['dashboard', 'data', filters],
    queryFn: async () => {
      // Clean undefined filters
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      );

      const { data } = await api.get<DashboardData>('/dashboard/data', {
        params,
      });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
