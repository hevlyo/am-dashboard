import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { filtersSchema, Filters } from '@repo/schemas';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('dashboard')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obter métricas principais (cards)' })
  @ApiResponse({ status: 200, description: 'Métricas retornadas com sucesso' })
  async getStats(
    @Query(new ZodValidationPipe(filtersSchema)) filters: Filters,
  ) {
    return this.dashboardService.getStats(filters);
  }

  @Get('data')
  @ApiOperation({ summary: 'Obter dados para gráficos' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso' })
  async getData(
    @Query(new ZodValidationPipe(filtersSchema)) filters: Filters,
  ) {
    return this.dashboardService.getDashboardData(filters);
  }
}
