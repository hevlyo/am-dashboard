import { Test } from "@nestjs/testing";
import type { Filters } from "@repo/schemas";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

describe("DashboardController", () => {
  let controller: DashboardController;
  const dashboardService = {
    getStats: jest.fn(),
    getDashboardData: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    }).compile();

    controller = moduleRef.get(DashboardController);
    jest.clearAllMocks();
  });

  it("delegates stats to service", async () => {
    const filters: Filters = { search: "Ana" };
    dashboardService.getStats.mockResolvedValue({ totalStudents: 10 });

    const result = await controller.getStats(filters);

    expect(dashboardService.getStats).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ totalStudents: 10 });
  });

  it("delegates dashboard data to service", async () => {
    const filters: Filters = { search: "Ana" };
    dashboardService.getDashboardData.mockResolvedValue({
      enrollmentsByCategory: [],
    });

    const result = await controller.getData(filters);

    expect(dashboardService.getDashboardData).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ enrollmentsByCategory: [] });
  });
});
