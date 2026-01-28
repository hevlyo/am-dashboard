import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { TimeSeriesPoint } from '@repo/schemas';

interface AreaChartProps {
  data?: TimeSeriesPoint[];
  isLoading: boolean;
}

export function AreaChart({ data, isLoading }: AreaChartProps) {
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
          Não há dados de progresso para exibir neste período.
        </p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 shadow-sm border h-[400px] hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Progresso Médio</CardTitle>
        <CardDescription>Avanço dos alunos ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pb-2">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} stroke="currentColor" />
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
              unit="%"
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600', marginBottom: '4px' }}
              itemStyle={{ color: '#8b5cf6', fontWeight: '500' }}
            />
            <Legend 
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '20px', paddingBottom: '10px' }}
              itemStyle={{ display: 'inline-flex', alignItems: 'center', marginRight: '24px' }}
              formatter={(value) => <span className="text-sm font-medium text-muted-foreground ml-2">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="value"
              name="Progresso %"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorProgress)"
              activeDot={{ r: 6, fill: "#8b5cf6", stroke: "hsl(var(--background))", strokeWidth: 2 }}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
