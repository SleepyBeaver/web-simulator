import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';

import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../../auth/types';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получить отчёт симуляции' })
  @ApiParam({ name: 'id' })
  getReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthRequest,
  ) {
    return this.reportsService.getReport(id, req.user.sub);
  }

  @Get(':id/export/json')
  @ApiOperation({ summary: 'Экспорт отчёта в JSON' })
  async exportJson(
   @Param('id', ParseUUIDPipe) id: string,
   @Req() req: AuthRequest,
   @Res() res: Response,
  ) {
   const json = await this.reportsService.exportJson(id, req.user.sub);

    res.setHeader('Content-Type', 'application/json');
    res.send(json);
 }

  @Get(':id/export/xml')
  @ApiOperation({ summary: 'Экспорт отчёта в XML' })
  async exportXml(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthRequest,
    @Res() res: Response,
  ) {
    const xml = await this.reportsService.exportXml(id, req.user.sub);

    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  }
}