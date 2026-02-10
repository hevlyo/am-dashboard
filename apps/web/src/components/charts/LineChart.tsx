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
import type { TimeSeriesPoint } from "@repo/schemas";
import { ChartLayout } from "./ChartLayout";

interface LineChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function LineChart({ data, isLoading }: LineChartProps) {
  return (
    <ChartLayout
      title="Evolução de Matrículas"
      description="Crescimento mensal da base de alunos"
      isLoading={isLoading}
      isEmpty={!data || data.length === 0}
      emptyMessage="Não há histórico para exibir neste período."
      contentClassName="px-6"
    >
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.4}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
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
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "12px",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginBottom: "4px",
            }}
            itemStyle={{ color: "hsl(var(--primary))", fontWeight: "500" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: "24px", paddingBottom: "24px" }}
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {payload?.map((entry) => (
                  <span key={entry.value} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
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
              r: 8,
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2,
            }}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "hsl(var(--background))",
              stroke: "hsl(var(--primary))",
            }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartLayout>
  );
}
