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
  Inativo: "#ef4444", // red-500
  Ativo: "#22c55e", // green-500
  Concluido: "#3b82f6", // blue-500
};

export function PieChart({ data, isLoading }: PieChartProps) {
  if (isLoading) {
    return (
      <Card className="col-span-1 h-[400px] animate-pulse border shadow-sm">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-32 bg-muted rounded" />
        </CardHeader>
        <CardContent className="h-[300px] bg-muted/20 m-6 rounded" />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 h-[400px] border shadow-sm flex flex-col items-center justify-center text-center p-6">
        <div className="bg-muted/50 p-4 rounded-full mb-4">
          <div className="h-8 w-8 text-muted-foreground opacity-50" />
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
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Status dos Alunos</CardTitle>
        <CardDescription>Distribuição atual da base de alunos</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
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
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "10px" }}
              formatter={(value) => (
                <span
                  className="text-sm font-medium text-muted-foreground"
                  style={{ marginLeft: 8, marginRight: 24 }}
                >
                  {value}
                </span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
