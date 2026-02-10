import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
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
import type { ChartDataPoint } from "@repo/schemas";
import { Skeleton } from "@/components/ui/skeleton";

interface PieChartProps {
  data?: ChartDataPoint[];
  isLoading: boolean;
}

const COLORS = [
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
];

const STATUS_COLORS: Record<string, string> = {
  Inativo: "#f97316", // orange-500
  Ativo: "#22c55e", // green-500
  Concluido: "#3b82f6", // blue-500
};

export function PieChart({ data, isLoading }: PieChartProps) {
  const total = data?.reduce((acc, item) => acc + item.value, 0) || 0;

  if (isLoading) {
    return (
      <Card className="col-span-1 h-[400px] border-0 shadow-sm bg-card/50">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center p-6 pt-0">
          <Skeleton className="h-48 w-48 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 h-[400px] border shadow-sm flex flex-col items-center justify-center text-center p-6 bg-card/50">
        <div className="bg-muted/50 p-4 rounded-full mb-4">
          <svg
            className="h-8 w-8 text-muted-foreground opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
          <span className="sr-only">Gráfico de pizza vazio</span>
        </div>
        <h3 className="text-lg font-medium text-foreground">
          Sem dados disponíveis
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Não há dados de status para exibir.
        </p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Status dos Alunos</CardTitle>
        <CardDescription>Distribuição atual da base de alunos</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              nameKey="label"
              strokeWidth={3}
              stroke="hsl(var(--card))"
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${entry.label}`}
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
                borderWidth: "1px",
              }}
              itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "600", fontSize: "13px" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: "24px", paddingBottom: "24px" }}
              content={({ payload }) => (
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                  {payload?.map((entry, _) => {
                    const entryPayload = entry.payload as
                      | { value?: number }
                      | undefined;
                    const value = entryPayload?.value ?? 0;
                    const percent =
                      total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    const color = STATUS_COLORS[entry.value] || entry.color;

                    return (
                      <span
                        key={`legend-${entry.value}`}
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"
                      >
                        <span
                          className="h-2 w-2 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-foreground">{entry.value}</span>
                        <span className="text-muted-foreground font-normal opacity-70">
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
      </CardContent>
    </Card>
  );
}
