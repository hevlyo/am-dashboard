import { Test, TestingModule } from "@nestjs/testing";
import { DashboardService } from "./dashboard.service";
import { PrismaService } from "../prisma/prisma.service";

describe("DashboardService", () => {
  let service: DashboardService;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaService,
          useValue: {
            enrollment: {
              count: jest.fn(),
              groupBy: jest.fn(),
              aggregate: jest.fn(),
              findMany: jest.fn(),
            },
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStats", () => {
    it("should return dashboard statistics", async () => {
      prismaService.enrollment.count = jest.fn().mockResolvedValueOnce(100);
      prismaService.enrollment.groupBy = jest
        .fn()
        .mockResolvedValueOnce([{ studentId: "1" }, { studentId: "2" }])
        .mockResolvedValueOnce([{ studentId: "1" }])
        .mockResolvedValueOnce([
          { courseId: "1" },
          { courseId: "2" },
          { courseId: "3" },
        ])
        .mockResolvedValueOnce([{ studentId: "2" }]);
      prismaService.enrollment.aggregate = jest.fn().mockResolvedValue({
        _avg: { progress: 65.5 },
      });

      const result = await service.getStats({});

      expect(result).toHaveProperty("totalEnrollments");
      expect(result).toHaveProperty("totalStudents");
      expect(result).toHaveProperty("activeStudents");
      expect(result).toHaveProperty("totalCourses");
      expect(result).toHaveProperty("averageProgress");
      expect(result).toHaveProperty("completionRate");
    });

    it("should apply date filters correctly", async () => {
      prismaService.enrollment.count = jest.fn().mockResolvedValue(50);
      prismaService.enrollment.groupBy = jest.fn().mockResolvedValue([]);
      prismaService.enrollment.aggregate = jest.fn().mockResolvedValue({
        _avg: { progress: 0 },
      });

      await service.getStats({
        dateFrom: "2024-01-01",
        dateTo: "2024-12-31",
      });

      expect(prismaService.enrollment.count).toHaveBeenCalled();
    });

    it("should apply category filters correctly", async () => {
      prismaService.enrollment.count = jest.fn().mockResolvedValue(30);
      prismaService.enrollment.groupBy = jest.fn().mockResolvedValue([]);
      prismaService.enrollment.aggregate = jest.fn().mockResolvedValue({
        _avg: { progress: 0 },
      });

      await service.getStats({
        categories: ["REDACAO", "MATEMATICA"],
      });

      expect(prismaService.enrollment.count).toHaveBeenCalled();
    });

    it("should apply status filters correctly", async () => {
      prismaService.enrollment.count = jest.fn().mockResolvedValue(20);
      prismaService.enrollment.groupBy = jest.fn().mockResolvedValue([]);
      prismaService.enrollment.aggregate = jest.fn().mockResolvedValue({
        _avg: { progress: 0 },
      });

      await service.getStats({
        status: ["ACTIVE"],
      });

      expect(prismaService.enrollment.count).toHaveBeenCalled();
    });

    it("should handle empty results gracefully", async () => {
      prismaService.enrollment.count = jest.fn().mockResolvedValue(0);
      prismaService.enrollment.groupBy = jest.fn().mockResolvedValue([]);
      prismaService.enrollment.aggregate = jest.fn().mockResolvedValue({
        _avg: { progress: null },
      });

      const result = await service.getStats({});

      expect(result.totalEnrollments).toBe(0);
      expect(result.averageProgress).toBe(0);
      expect(result.completionRate).toBe(0);
    });
  });

  describe("getDashboardData", () => {
    it("should return chart data", async () => {
      prismaService.enrollment.findMany = jest
        .fn()
        .mockResolvedValueOnce([
          { course: { category: "REDACAO" } },
          { course: { category: "REDACAO" } },
          { course: { category: "MATEMATICA" } },
        ])
        .mockResolvedValueOnce([
          { studentId: "1", student: { status: "ACTIVE" } },
          { studentId: "2", student: { status: "COMPLETED" } },
        ]);

      prismaService.$queryRaw = jest
        .fn()
        .mockResolvedValueOnce([
          { date: new Date("2024-01-01"), count: BigInt(10) },
          { date: new Date("2024-02-01"), count: BigInt(15) },
        ])
        .mockResolvedValueOnce([
          { date: new Date("2024-01-01"), avg: 50 },
          { date: new Date("2024-02-01"), avg: 65 },
        ]);

      const result = await service.getDashboardData({});

      expect(result).toHaveProperty("enrollmentsByCategory");
      expect(result).toHaveProperty("enrollmentsOverTime");
      expect(result).toHaveProperty("studentsByStatus");
      expect(result).toHaveProperty("progressOverTime");
    });

    it("should group enrollments by category correctly", async () => {
      prismaService.enrollment.findMany = jest
        .fn()
        .mockResolvedValueOnce([
          { course: { category: "REDACAO" } },
          { course: { category: "REDACAO" } },
          { course: { category: "MATEMATICA" } },
        ])
        .mockResolvedValueOnce([]);

      prismaService.$queryRaw = jest.fn().mockResolvedValue([]);

      const result = await service.getDashboardData({});

      const redacao = result.enrollmentsByCategory.find(
        (c) => c.label === "Redação",
      );
      expect(redacao?.value).toBe(2);
    });

    it("should count unique students by status", async () => {
      prismaService.enrollment.findMany = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          { studentId: "1", student: { status: "ACTIVE" } },
          { studentId: "1", student: { status: "ACTIVE" } },
          { studentId: "2", student: { status: "COMPLETED" } },
        ]);

      prismaService.$queryRaw = jest.fn().mockResolvedValue([]);

      const result = await service.getDashboardData({});

      const activeCount = result.studentsByStatus.find(
        (s) => s.label === "Ativo",
      );
      expect(activeCount?.value).toBe(1);
    });
  });
});
