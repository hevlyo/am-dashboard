import { z } from "zod";

export const categoryEnum = z.enum([
  "REDACAO",
  "LINGUAGENS",
  "MATEMATICA",
  "CIENCIAS_NATUREZA",
  "CIENCIAS_HUMANAS",
]);

export const studentStatusEnum = z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]);

export const filtersSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  categories: z.array(categoryEnum).optional(),
  status: z.array(studentStatusEnum).optional(),
  search: z.string().optional(),
});

export const statsSchema = z.object({
  totalStudents: z.number(),
  activeStudents: z.number(),
  totalEnrollments: z.number(),
  totalCourses: z.number(),
  averageProgress: z.number(),
  completionRate: z.number(),
});

export const chartDataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const timeSeriesPointSchema = z.object({
  date: z.string(),
  value: z.number(),
});

export const dashboardDataSchema = z.object({
  enrollmentsByCategory: z.array(chartDataPointSchema),
  enrollmentsOverTime: z.array(timeSeriesPointSchema),
  studentsByStatus: z.array(chartDataPointSchema),
  progressOverTime: z.array(timeSeriesPointSchema),
});

export type Category = z.infer<typeof categoryEnum>;
export type StudentStatus = z.infer<typeof studentStatusEnum>;
export type Filters = z.infer<typeof filtersSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type ChartDataPoint = z.infer<typeof chartDataPointSchema>;
export type TimeSeriesPoint = z.infer<typeof timeSeriesPointSchema>;
export type DashboardData = z.infer<typeof dashboardDataSchema>;

export const CATEGORY_LABELS: Record<Category, string> = {
  REDACAO: "Redação",
  LINGUAGENS: "Linguagens e Códigos",
  MATEMATICA: "Matemática",
  CIENCIAS_NATUREZA: "Ciências da Natureza",
  CIENCIAS_HUMANAS: "Ciências Humanas",
};

export const STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  COMPLETED: "Concluído",
};
