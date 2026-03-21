import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelVersion } from '../../entities/model-version.entity';
import { ProcessModel } from '../../entities/process-model.entity';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { Scenario } from 'src/entities/scenario.entity';

@Injectable()
export class SimulationService {
  constructor(
    @InjectRepository(ModelVersion)
    private readonly versionRepo: Repository<ModelVersion>,
    @InjectRepository(ProcessModel)
    private readonly modelRepo: Repository<ProcessModel>,
    @InjectRepository(Scenario)
    private readonly scenarioRepo: Repository<Scenario>,
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

  async createScenario(
    modelId: string,
    dto: CreateScenarioDto,
    userId: string,
  ): Promise<Scenario> {
    const model = await this.modelRepo.findOne({
      where: { id: modelId, owner: { id: userId as any } },
    });

    if (!model) throw new NotFoundException('Модель не найдена');

    const scenario = this.scenarioRepo.create({
      name: dto.name,
      config: dto.config,
      modelId,
    });

    return this.scenarioRepo.save(scenario);
  }

  async getScenarios(modelId: string, userId: string): Promise<Scenario[]> {
    const model = await this.modelRepo.findOne({
      where: { id: modelId, owner: { id: userId as any } },
    });

    if (!model) throw new NotFoundException('Модель не найдена');

    return this.scenarioRepo.find({
      where: { modelId },
      order: { createdAt: 'ASC' },
    });
  }
}
