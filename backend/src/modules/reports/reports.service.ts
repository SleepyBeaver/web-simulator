import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulationReport } from '../../entities/simulation-report.entity';
import { ReportResponseDto } from './dto/report-response.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SimulationReport)
    private readonly reportRepo: Repository<SimulationReport>,
  ) {}

  async createReport(
    modelId: string,
    versionId: string,
    metrics: any,
  ): Promise<SimulationReport> {
    const report = this.reportRepo.create({
      modelId,
      versionId,
      metrics,
    });

    return this.reportRepo.save(report);
  }

  private mapToDto(report: SimulationReport): ReportResponseDto {
    return {
      id: report.id,
      modelId: report.modelId,
      versionId: report.versionId,
      model: {
        id: report.model.id,
        name: report.model.name,
        description: report.model.description,
      },
      metrics: report.metrics,
      createdAt: report.createdAt,
    };
  }

  async getReport(id: string, userId: string): Promise<ReportResponseDto> {
    const report = await this.reportRepo.findOne({
      where: { id },
      relations: ['model', 'model.owner'],
    });

    if (!report) throw new NotFoundException('Отчёт не найден');

    if (report.model.owner.id !== userId) {
      throw new ForbiddenException('Нет доступа');
    }

    return this.mapToDto(report);
  }

  async exportJson(id: string, userId: string) {
    const report = await this.getReport(id, userId);

    return JSON.stringify(report, null, 2);
  }

  async exportXml(id: string, userId: string) {
    const report = await this.getReport(id, userId);

    return `
        <report>
        <id>${report.id}</id>
        <modelId>${report.modelId}</modelId>
        <versionId>${report.versionId}</versionId>
        <time>${report.metrics.time}</time>
        <cost>${report.metrics.cost}</cost>
        </report>
    `;
  }
}