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
import { ChartErrorBoundary } from "./ChartErrorBoundary";

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
      <Card className="col-span-1 h-[400px] animate-pulse border shadow-sm">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-32 bg-muted rounded" />
        </CardHeader>
        <CardContent className="h-[300px] bg-muted/20 m-6 rounded" />
      </Card>
    );
  }

  const renderContent = () => {
    if (!data || data.length === 0) {
      return (
        <div className="h-[300px] flex flex-col items-center justify-center text-center p-6">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <div className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Sem dados disponíveis
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Não há matrículas para exibir com os filtros selecionados. Tente
            expandir o período.
          </p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          margin={{ top: 28, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.4}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="label"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
            interval={0}
            height={80}
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
                    fill="#888888"
                    fontSize={11}
                  >
                    {abbreviatedLabel}
                    <title>{fullLabel}</title>
                  </text>
                </g>
              );
            }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.1 }}
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
            itemStyle={{
              color: "hsl(var(--primary))",
              fontWeight: "500",
              fontSize: "14px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: "24px", paddingBottom: "24px" }}
            content={({ payload }) => (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {payload?.map((entry) => (
                  <span
                    key={entry.value}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
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
          >
            <LabelList
              dataKey="value"
              position="top"
              className="fill-[hsl(var(--foreground))] text-xs font-medium"
              offset={8}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Matrículas por Categoria</CardTitle>
        <CardDescription>
          Distribuição de alunos por área de ensino
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-0">
        <ChartErrorBoundary title="Matrículas por Categoria">
          {renderContent()}
        </ChartErrorBoundary>
      </CardContent>
    </Card>
  );
}
