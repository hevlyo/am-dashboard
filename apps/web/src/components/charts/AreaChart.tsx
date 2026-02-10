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
import type { TimeSeriesPoint } from "@repo/schemas";
import { ChartLayout } from "./ChartLayout";

interface AreaChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function AreaChart({ data, isLoading }: AreaChartProps) {
  return (
    <ChartLayout
      title="Progresso Médio"
      description="Avanço dos alunos ao longo do tempo"
      isLoading={isLoading}
      isEmpty={!data || data.length === 0}
      emptyMessage="Não há dados de progresso para exibir neste período."
      contentClassName="pl-0"
    >
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
            unit="%"
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
            itemStyle={{ color: "#8b5cf6", fontWeight: "500" }}
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
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartLayout>
  );
}
