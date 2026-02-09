import { Card, CardContent } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import type { Stats } from '@repo/schemas';

interface StatsCardsProps {
  stats?: Stats;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse border-0 shadow-sm bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-8 w-16 bg-muted rounded" />
                </div>
                <div className="h-12 w-12 bg-muted rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Alunos</p>
            <div className="text-2xl font-bold tracking-tight">{stats.totalStudents}</div>
            <p className="text-xs text-emerald-600 font-medium flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full w-fit">
               {stats.activeStudents} alunos ativos
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
            <Users className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Matrículas</p>
            <div className="text-2xl font-bold tracking-tight">{stats.totalEnrollments}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Distribuídas em {stats.totalCourses} cursos
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progresso Médio</p>
            <div className="text-2xl font-bold tracking-tight">{stats.averageProgress}%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Média geral da plataforma
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-inner">
            <TrendingUp className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alunos Concluídos (%)</p>
            <div className="text-2xl font-bold tracking-tight">{stats.completionRate}%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Alunos que finalizaram
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
            <BookOpen className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
