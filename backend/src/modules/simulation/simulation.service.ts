import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelVersion } from '../../entities/model-version.entity';
import { ProcessModel } from '../../entities/process-model.entity';

@Injectable()
export class SimulationService {
  constructor(
    @InjectRepository(ModelVersion)
    private readonly versionRepo: Repository<ModelVersion>,
    @InjectRepository(ProcessModel)
    private readonly modelRepo: Repository<ProcessModel>,
  ) {}

  async simulate(versionId: string, userId: string) {
    const version = await this.versionRepo.findOne({
      where: { id: versionId },
      relations: ['model', 'model.owner'],
    });

    if (!version) {
      throw new NotFoundException('Версия модели не найдена');
    }

    if (version.model.owner.id !== userId) {
      throw new ForbiddenException('Нет доступа к симуляции этой модели');
    }

    if ((version as any).isValid === false) {
      throw new ForbiddenException('Версия модели не готова к симуляции');
    }

    return {
      versionId,
      status: 'ok',
      metrics: {
        time: Math.floor(Math.random() * 100),
        cost: Math.floor(Math.random() * 1000),
      },
    };
  }
}