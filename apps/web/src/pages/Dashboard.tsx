import { useDashboardStats, useDashboardData } from '@/hooks/useDashboard';
import { useFilters } from '@/hooks/useFilters';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/StatsCards';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { DateFilter } from '@/components/filters/DateFilter';
import { MultiSelectFilter } from '@/components/filters/MultiSelectFilter';
import { SelectFilter } from '@/components/filters/SelectFilter';
import { TextFilter } from '@/components/filters/TextFilter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { STATUS_LABELS, type Category, type StudentStatus } from '@repo/schemas';

export function Dashboard() {
  const {
    filters,
    appliedFilters,
    updateFilter,
    applyFilters,
    clearFilters,
  } = useFilters();

  const { data: stats, isLoading: loadingStats } = useDashboardStats(appliedFilters);
  const { data: chartData, isLoading: loadingCharts } = useDashboardData(appliedFilters);

  const handleDateChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    updateFilter('dateFrom', range.from?.toISOString());
    updateFilter('dateTo', range.to?.toISOString());
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950/50">
      <Header />
      
      <main className="container py-8 space-y-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Visão geral da plataforma e métricas de desempenho
            </p>
          </div>
          {/* Add date display or action button here if needed */}
        </div>

        <div className="bg-background/60 backdrop-blur-xl border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-end">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-3 w-full lg:w-auto flex-1">
              <TextFilter
                value={filters.search || ''}
                onChange={(val) => updateFilter('search', val)}
              />
              <DateFilter
                dateRange={{
                  from: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
                  to: filters.dateTo ? new Date(filters.dateTo) : undefined,
                }}
                onChange={handleDateChange}
              />
              <SelectFilter
                value={filters.categories || []}
                onChange={(val) => updateFilter('categories', val)}
              />
              <MultiSelectFilter
                title="Status"
                options={Object.entries(STATUS_LABELS).map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={(filters.status as string[]) || []}
                onChange={(val) => updateFilter('status', val as StudentStatus[])}
              />
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto">
              <Button variant="outline" onClick={clearFilters} className="flex-1 lg:flex-none hover:bg-muted/50 h-10 px-6">
                Limpar
              </Button>
              <Button onClick={applyFilters} className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 h-10 px-6">
                Filtrar Resultados
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsCards stats={stats} isLoading={loadingStats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <BarChart
            data={chartData?.enrollmentsByCategory}
            isLoading={loadingCharts}
          />
          <LineChart
            data={chartData?.enrollmentsOverTime}
            isLoading={loadingCharts}
          />
          <PieChart
            data={chartData?.studentsByStatus}
            isLoading={loadingCharts}
          />
          <AreaChart
            data={chartData?.progressOverTime}
            isLoading={loadingCharts}
          />
        </motion.div>
      </main>
    </div>
  );
}
