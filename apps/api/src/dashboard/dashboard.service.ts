import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Filters, Stats, DashboardData } from "@repo/schemas";
import { Category, StudentStatus, Prisma } from "@prisma/client";
import { CATEGORY_LABELS, STATUS_LABELS } from "@repo/schemas";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  private buildWhereClause(filters: Filters): Prisma.EnrollmentWhereInput {
    const where: Prisma.EnrollmentWhereInput = {};
    const studentWhere: Prisma.StudentWhereInput = {};

    if (filters.dateFrom || filters.dateTo) {
      where.enrolledAt = {};
      if (filters.dateFrom) {
        where.enrolledAt.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        where.enrolledAt.lte = new Date(filters.dateTo);
      }
    }

    if (filters.categories && filters.categories.length > 0) {
      where.course = {
        category: {
          in: filters.categories as Category[],
        },
      };
    }

    if (filters.status && filters.status.length > 0) {
      studentWhere.status = {
        in: filters.status as StudentStatus[],
      };
    }

    if (filters.search) {
      studentWhere.name = {
        contains: filters.search,
        mode: "insensitive",
      };
    }

    if (Object.keys(studentWhere).length > 0) {
      where.student = studentWhere;
    }

    return where;
  }

  async getStats(filters: Filters): Promise<Stats> {
    const where = this.buildWhereClause(filters);

    // Métricas principais
    const [
      totalEnrollments,
      totalStudents,
      activeStudents,
      totalCourses,
      avgProgressAgg,
      completedAgg,
    ] = await Promise.all([
      // Total de matrículas filtradas
      this.prisma.enrollment.count({ where }),

      // Total de alunos únicos nessas matrículas
      this.prisma.enrollment
        .groupBy({
          by: ["studentId"],
          where,
        })
        .then((res) => res.length),

      // Alunos ativos (status ACTIVE)
      this.prisma.enrollment
        .groupBy({
          by: ["studentId"],
          where: {
            ...where,
            student: { status: "ACTIVE" },
          },
        })
        .then((res) => res.length),

      // Cursos únicos
      this.prisma.enrollment
        .groupBy({
          by: ["courseId"],
          where,
        })
        .then((res) => res.length),

      // Progresso médio
      this.prisma.enrollment.aggregate({
        _avg: { progress: true },
        where,
      }),

      // Taxa de conclusão (progress = 100)
      this.prisma.enrollment.count({
        where: {
          ...where,
          progress: 100,
        },
      }),
    ]);

    const averageProgress = avgProgressAgg._avg.progress || 0;
    const completionRate =
      totalEnrollments > 0 ? (completedAgg / totalEnrollments) * 100 : 0;

    return {
      totalEnrollments,
      totalStudents,
      activeStudents,
      totalCourses,
      averageProgress: Number(averageProgress.toFixed(2)),
      completionRate: Number(completionRate.toFixed(2)),
    };
  }

  async getDashboardData(filters: Filters): Promise<DashboardData> {
    const where = this.buildWhereClause(filters);
    const categoryFilter =
      filters.categories && filters.categories.length > 0
        ? Prisma.sql`AND c."category" IN (${Prisma.join(
            filters.categories.map(
              (category) => Prisma.sql`CAST(${category} AS "Category")`,
            ),
          )})`
        : Prisma.empty;
    const statusFilter =
      filters.status && filters.status.length > 0
        ? Prisma.sql`AND s."status" IN (${Prisma.join(
            filters.status.map(
              (status) => Prisma.sql`CAST(${status} AS "StudentStatus")`,
            ),
          )})`
        : Prisma.empty;

    // 1. Matrículas por Categoria (Gráfico de Barras)
    const byCategory = await this.prisma.enrollment.findMany({
      where,
      include: { course: true },
    });

    const categoryMap = new Map<string, number>();
    byCategory.forEach((e) => {
      const cat = e.course.category;
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });

    const enrollmentsByCategory = Array.from(categoryMap.entries()).map(
      ([key, value]) => ({
        label: CATEGORY_LABELS[key as Category] || key,
        value,
      }),
    );

    // 2. Matrículas ao longo do tempo (Gráfico de Linha)
    // Agrupar por mês
    const enrollmentsOverTime = await this.prisma.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT DATE_TRUNC('month', "enrolledAt") as date, COUNT(*) as count
      FROM "enrollments" e
      LEFT JOIN "courses" c ON e."courseId" = c."id"
      LEFT JOIN "students" s ON e."studentId" = s."id"
      WHERE 1=1
      ${filters.dateFrom ? Prisma.sql`AND e."enrolledAt" >= ${new Date(filters.dateFrom)}` : Prisma.empty}
      ${filters.dateTo ? Prisma.sql`AND e."enrolledAt" <= ${new Date(filters.dateTo)}` : Prisma.empty}
      ${categoryFilter}
      ${statusFilter}
      ${filters.search ? Prisma.sql`AND s."name" ILIKE ${`%${filters.search}%`}` : Prisma.empty}
      GROUP BY date
      ORDER BY date ASC
    `;

    const formattedEnrollmentsOverTime = enrollmentsOverTime.map((item) => ({
      date: new Date(item.date).toISOString().slice(0, 7), // YYYY-MM
      value: Number(item.count),
    }));

    // 3. Alunos por Status (Gráfico de Pizza)
    const byStatus = await this.prisma.enrollment.findMany({
      where,
      include: { student: true },
    });

    const statusMap = new Map<string, number>();
    const uniqueStudents = new Set<string>();

    byStatus.forEach((e) => {
      if (!uniqueStudents.has(e.studentId)) {
        uniqueStudents.add(e.studentId);
        const status = e.student.status;
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
      }
    });

    const studentsByStatus = Array.from(statusMap.entries()).map(
      ([key, value]) => ({
        label: STATUS_LABELS[key as StudentStatus] || key,
        value,
      }),
    );

    // 4. Progresso Médio ao longo do tempo (Gráfico de Área)
    const progressOverTime = await this.prisma.$queryRaw<
      Array<{ date: Date; avg: number }>
    >`
      SELECT DATE_TRUNC('month', "enrolledAt") as date, AVG(progress) as avg
      FROM "enrollments" e
      LEFT JOIN "courses" c ON e."courseId" = c."id"
      LEFT JOIN "students" s ON e."studentId" = s."id"
      WHERE 1=1
      ${filters.dateFrom ? Prisma.sql`AND e."enrolledAt" >= ${new Date(filters.dateFrom)}` : Prisma.empty}
      ${filters.dateTo ? Prisma.sql`AND e."enrolledAt" <= ${new Date(filters.dateTo)}` : Prisma.empty}
      ${categoryFilter}
      ${statusFilter}
      ${filters.search ? Prisma.sql`AND s."name" ILIKE ${`%${filters.search}%`}` : Prisma.empty}
      GROUP BY date
      ORDER BY date ASC
    `;

    const formattedProgressOverTime = progressOverTime.map((item) => ({
      date: new Date(item.date).toISOString().slice(0, 7),
      value: Number(Number(item.avg).toFixed(2)),
    }));

    return {
      enrollmentsByCategory,
      enrollmentsOverTime: formattedEnrollmentsOverTime,
      studentsByStatus,
      progressOverTime: formattedProgressOverTime,
    };
  }
}
