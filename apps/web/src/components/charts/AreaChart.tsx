import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { TimeSeriesPoint } from "@repo/schemas";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartErrorBoundary } from "./ChartErrorBoundary";

interface AreaChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function AreaChart({ data, isLoading }: AreaChartProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-[300px] p-6 pt-0">
          <Skeleton className="w-full h-full rounded-lg bg-muted/20" />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 bg-card/50 rounded-lg">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <div className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Sem dados disponíveis
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Não há dados de progresso para exibir neste período.
          </p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.2}
            stroke="currentColor"
            className="text-muted-foreground"
          />
          <XAxis
            dataKey="date"
            stroke="currentColor"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
              const year = date.toLocaleDateString('pt-BR', { year: '2-digit' });
              return `${month}/${year}`;
            }}
            minTickGap={30}
            className="text-muted-foreground font-medium"
          />
          <YAxis
            stroke="currentColor"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            unit="%"
            tickFormatter={(value) => `${value}`}
            className="text-muted-foreground font-medium"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "12px",
              borderWidth: "1px",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginBottom: "4px",
              fontSize: "13px"
            }}
            itemStyle={{ color: "#8b5cf6", fontWeight: "500", fontSize: "13px" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: "12px", paddingBottom: "12px" }}
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {payload?.map((entry) => (
                  <span key={entry.value} className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    {entry.value}
                  </span>
                ))}
              </div>
            )}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Progresso %"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorProgress)"
            activeDot={{
              r: 6,
              fill: "#8b5cf6",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Evolução de Progresso</CardTitle>
        <CardDescription>Avanço dos alunos ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-0">
        <ChartErrorBoundary>
          {renderContent()}
        </ChartErrorBoundary>
      </CardContent>
    </Card>
  );
}
