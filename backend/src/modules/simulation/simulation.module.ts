import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { ModelVersion } from '../../entities/model-version.entity';
import { ProcessModel } from '../../entities/process-model.entity';
import { Scenario } from 'src/entities/scenario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModelVersion, ProcessModel, Scenario]),
  ],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
