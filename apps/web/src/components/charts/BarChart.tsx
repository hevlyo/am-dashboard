import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ChartDataPoint } from '@repo/schemas';

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

  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 h-[400px] border shadow-sm flex flex-col items-center justify-center text-center p-6">
        <div className="bg-muted/50 p-4 rounded-full mb-4">
          <div className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-medium text-foreground">Sem dados disponíveis</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Não há matrículas para exibir com os filtros selecionados. Tente expandir o período.
        </p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Matrículas por Categoria</CardTitle>
        <CardDescription>Distribuição de alunos por área de ensino</CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-2">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} stroke="currentColor" />
            <XAxis
              dataKey="label"
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
              cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600', marginBottom: '4px' }}
              itemStyle={{ color: 'hsl(var(--foreground))', fontSize: '14px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            <Bar
              dataKey="value"
              name="Matrículas"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              barSize={32}
              fillOpacity={0.9}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
