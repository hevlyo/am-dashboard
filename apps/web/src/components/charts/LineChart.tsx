import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function LineChart({ data, isLoading }: LineChartProps) {
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
            Não há histórico para exibir neste período.
          </p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
        >
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
            itemStyle={{ color: "hsl(var(--primary))", fontWeight: "500", fontSize: "13px" }}
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
          <Line
            type="monotone"
            dataKey="value"
            name="Novas Matrículas"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            activeDot={{
              r: 6,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
            dot={{
              r: 3,
              strokeWidth: 1.5,
              fill: "hsl(var(--background))",
              stroke: "hsl(var(--primary))",
            }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Evolução de Matrículas</CardTitle>
        <CardDescription>Crescimento mensal da base de alunos</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-2">
        <ChartErrorBoundary title="Evolução de Matrículas">
          {renderContent()}
        </ChartErrorBoundary>
      </CardContent>
    </Card>
  );
}
