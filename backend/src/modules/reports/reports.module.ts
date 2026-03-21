import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './report.controller';
import { SimulationReport } from '../../entities/simulation-report.entity';
import { ModelVersion } from '../../entities/model-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SimulationReport, ModelVersion])],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}