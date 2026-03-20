import { Controller, Post, Param, ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SimulationService } from './simulation.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../../auth/types';

@ApiTags('Simulation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post(':versionId')
  @ApiOperation({ summary: 'Запустить симуляцию модели по версии' })
  @ApiParam({ name: 'versionId', description: 'UUID версии модели' })
  @ApiOkResponse({
    description: 'Результаты симуляции',
    schema: {
      example: {
        versionId: 'uuid-версии',
        status: 'ok',
        metrics: { time: 42, cost: 500 },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Версия модели не найдена' })
  @ApiForbiddenResponse({ description: 'Нет доступа или версия не готова к симуляции' })
  async simulate(
    @Param('versionId', ParseUUIDPipe) versionId: string,
    @Req() req: AuthRequest,
  ) {
    return this.simulationService.simulate(versionId, req.user.sub);
  }
}