import { Module } from '@nestjs/common';
import { ProcessesModule } from './modules/processes/processes.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ProcessesModule,
    SimulationModule,
    AnalyticsModule,
    ReportsModule,
  ],
})
export class AppModule {}