import { useDashboardStats, useDashboardData } from "@/hooks/useDashboard";
import { useFilters } from "@/hooks/useFilters";
import { Header } from "@/components/layout/Header";
import { StatsCards } from "@/components/StatsCards";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { AreaChart } from "@/components/charts/AreaChart";
import { ChartErrorBoundary } from "@/components/charts/ChartErrorBoundary";
import { DateFilter } from "@/components/filters/DateFilter";
import { MultiSelectFilter } from "@/components/filters/MultiSelectFilter";
import { SelectFilter } from "@/components/filters/SelectFilter";
import { TextFilter } from "@/components/filters/TextFilter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { STATUS_LABELS, type StudentStatus } from "@repo/schemas";
import { RefreshCw } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export function Dashboard() {
  const { filters, appliedFilters, updateFilter, applyFilters, clearFilters } =
    useFilters();

  const {
    data: stats,
    isLoading: loadingStats,
    isError: isStatsError,
    refetch: refetchStats,
  } = useDashboardStats(appliedFilters);
  const {
    data: chartData,
    isLoading: loadingCharts,
    isError: isChartsError,
    refetch: refetchCharts,
  } = useDashboardData(appliedFilters);

  const isError = isStatsError || isChartsError;

  const handleRetry = () => {
    refetchStats();
    refetchCharts();
  };

  const handleDateChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    updateFilter("dateFrom", range.from?.toISOString());
    updateFilter("dateTo", range.to?.toISOString());
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950/50 font-sans">
      <Header />

      <main className="container py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Visão geral da plataforma e métricas de desempenho em tempo real.
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRetry}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background/60 backdrop-blur-2xl border rounded-2xl p-5 shadow-sm space-y-4 ring-1 ring-black/5 dark:ring-white/5"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-end">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-row gap-3 w-full lg:w-auto flex-1">
              <div className="flex-1 min-w-[200px]">
                <TextFilter
                  value={filters.search || ""}
                  onChange={(val) => updateFilter("search", val)}
                />
              </div>
              <DateFilter
                dateRange={{
                  from: filters.dateFrom
                    ? new Date(filters.dateFrom)
                    : undefined,
                  to: filters.dateTo ? new Date(filters.dateTo) : undefined,
                }}
                onChange={handleDateChange}
              />
              <SelectFilter
                value={filters.categories || []}
                onChange={(val) => updateFilter("categories", val)}
              />
              <MultiSelectFilter
                title="Status"
                options={Object.entries(STATUS_LABELS).map(
                  ([value, label]) => ({
                    value,
                    label,
                  }),
                )}
                value={(filters.status as string[]) || []}
                onChange={(val) =>
                  updateFilter("status", val as StudentStatus[])
                }
              />
            </div>

            <div className="flex gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-border/50">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1 lg:flex-none hover:bg-muted/50 h-10 px-6 transition-all active:scale-95"
              >
                Limpar
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 h-10 px-6 transition-all active:scale-95"
              >
                Filtrar Resultados
              </Button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Falha ao carregar dados do dashboard. Verifique sua conexão e
                    tente novamente.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="w-full sm:w-auto border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/50 dark:hover:text-red-100"
                  >
                    Tentar novamente
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={item}>
            <StatsCards stats={stats} isLoading={loadingStats} />
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-6 md:grid-cols-2"
          >
            <ChartErrorBoundary>
              <BarChart
                data={chartData?.enrollmentsByCategory}
                isLoading={loadingCharts}
              />
            </ChartErrorBoundary>
            <ChartErrorBoundary>
              <LineChart
                data={chartData?.enrollmentsOverTime}
                isLoading={loadingCharts}
              />
            </ChartErrorBoundary>
            <ChartErrorBoundary>
              <PieChart
                data={chartData?.studentsByStatus}
                isLoading={loadingCharts}
              />
            </ChartErrorBoundary>
            <ChartErrorBoundary>
              <AreaChart
                data={chartData?.progressOverTime}
                isLoading={loadingCharts}
              />
            </ChartErrorBoundary>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
