import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ProcessModel } from '../../entities/process-model.entity';
import { ModelVersion } from '../../entities/model-version.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessModel, ModelVersion]),
  ],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
