import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { ModelVersion } from '../../entities/model-version.entity';
import { ProcessModel } from '../../entities/process-model.entity';
import { Scenario } from 'src/entities/scenario.entity';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModelVersion, ProcessModel, Scenario]),
    AnalyticsModule,
    ReportsModule,
  ],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
