import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "@repo/schemas";
import { ChartLayout } from "./ChartLayout";

interface PieChartProps {
  data?: ChartDataPoint[];
  isLoading: boolean;
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

const STATUS_COLORS: Record<string, string> = {
  Inativo: "#f97316",
  Ativo: "#22c55e",
  Concluido: "#3b82f6",
};

export function PieChart({ data, isLoading }: PieChartProps) {
  const total = data?.reduce((acc, item) => acc + item.value, 0) || 0;

  return (
    <ChartLayout
      title="Status dos Alunos"
      description="Distribuição atual da base de alunos"
      isLoading={isLoading}
      isEmpty={!data || data.length === 0}
      emptyMessage="Não há dados de status para exibir."
      contentClassName="pb-0"
    >
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
            nameKey="label"
            strokeWidth={3}
            stroke="hsl(var(--card))"
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  STATUS_COLORS[entry.label] || COLORS[index % COLORS.length]
                }
                stroke="hsl(var(--background))"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "12px",
            }}
            itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "500" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: "24px", paddingBottom: "24px" }}
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                {payload?.map((entry, index) => {
                  const entryPayload = entry.payload as
                    | { value?: number }
                    | undefined;
                  const value = entryPayload?.value ?? 0;
                  const percent =
                    total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                  const color = STATUS_COLORS[entry.value] || entry.color;

                  return (
                    <span
                      key={`legend-${index}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span>{entry.value}</span>
                      <span className="text-muted-foreground font-normal">
                        {percent}%
                      </span>
                    </span>
                  );
                })}
              </div>
            )}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartLayout>
  );
}
