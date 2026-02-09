import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
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

const ABBREVIATIONS: Record<string, string> = {
  "Ciências Humanas": "Ciências Hum.",
  "Ciências da Natureza": "Ciências Nat.",
  "Linguagens e Códigos": "Linguagens",
  "Matemática e suas Tecnologias": "Matemática",
  "Ciências Humanas e suas Tecnologias": "Ciências Hum.",
  "Ciências da Natureza e suas Tecnologias": "Ciências Nat.",
  "Linguagens, Códigos e suas Tecnologias": "Linguagens",
};

const getAbbreviatedLabel = (label: string) => {
  if (ABBREVIATIONS[label]) return ABBREVIATIONS[label];
  if (label.length > 15) return `${label.substring(0, 12)}...`;
  return label;
};

interface BarChartProps {
  data?: ChartDataPoint[];
  isLoading: boolean;
}

export function BarChart({ data, isLoading }: BarChartProps) {
  if (isLoading) {
    return (
      <Card className="col-span-1 h-[400px] border-0 shadow-sm bg-card/50">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="h-[300px] p-6 pt-0">
            <div className="flex items-end justify-between h-full gap-4 pt-8">
                {[65, 40, 80, 55, 45].map((height, i) => (
                    <Skeleton key={i} className="w-full rounded-t-lg" style={{ height: `${height}%` }} />
                ))}
            </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 h-[400px] border shadow-sm flex flex-col items-center justify-center text-center p-6 bg-card/50">
        <div className="bg-muted/50 p-4 rounded-full mb-4">
          <div className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-medium text-foreground">
          Sem dados disponíveis
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Não há matrículas para exibir com os filtros selecionados.
        </p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Matrículas por Categoria</CardTitle>
        <CardDescription>
          Distribuição de alunos por área de ensino
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart
            data={data}
            margin={{ top: 28, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.2}
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <XAxis
              dataKey="label"
              stroke="currentColor"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
              interval={0}
              height={60}
              className="text-muted-foreground font-medium"
              tick={(props) => {
                const { x, y, payload } = props;
                const fullLabel = payload.value as string;
                const abbreviatedLabel = getAbbreviatedLabel(fullLabel);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize={11}
                      className="fill-muted-foreground"
                    >
                      {abbreviatedLabel}
                      <title>{fullLabel}</title>
                    </text>
                  </g>
                );
              }}
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
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
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
              itemStyle={{
                color: "hsl(var(--primary))",
                fontWeight: "500",
                fontSize: "13px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: "12px", paddingBottom: "12px" }}
              content={({ payload }) => (
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {payload?.map((entry) => (
                    <span
                      key={entry.value}
                      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      {entry.value}
                    </span>
                  ))}
                </div>
              )}
            />
            <Bar
              dataKey="value"
              name="Matrículas"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              barSize={32}
              fillOpacity={0.9}
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              <LabelList
                dataKey="value"
                position="top"
                className="fill-foreground text-[10px] font-bold"
                offset={8}
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
