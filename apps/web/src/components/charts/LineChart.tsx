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

interface LineChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function LineChart({ data, isLoading }: LineChartProps) {
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
          Não há histórico para exibir neste período.
        </p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Evolução de Matrículas</CardTitle>
        <CardDescription>Crescimento mensal da base de alunos</CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-2">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.1}
              stroke="currentColor"
            />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
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
      </CardContent>
    </Card>
  );
}
