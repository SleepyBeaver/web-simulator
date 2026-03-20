import { UUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessModel } from '../../entities/process-model.entity';
import { ModelVersion } from '../../entities/model-version.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { CreateVersionDto } from './dto/create-version.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ProcessModel)
    private readonly modelRepo: Repository<ProcessModel>,
    @InjectRepository(ModelVersion)
    private readonly versionRepo: Repository<ModelVersion>,
  ) {}

  async createModel(dto: CreateModelDto, user: any): Promise<ProcessModel> {
    const model = this.modelRepo.create({
      ...dto,
      owner: user, // передаём полноценный объект User
    });
    return this.modelRepo.save(model);
  }

  async getModel(id: string, userId: string): Promise<ProcessModel> {
    const model = await this.modelRepo.findOne({
      where: {
        id,
        owner: { id: userId as UUID },
      },
      relations: ['versions', 'activeVersion'],
    });

    if (!model) throw new NotFoundException('Модель не найдена');
    return model;
  }

  async createVersion(
    modelId: string,
    dto: CreateVersionDto,
    userId: string,
  ): Promise<ModelVersion> {
    const model = await this.modelRepo.findOne({
      where: { id: modelId, owner: { id: userId as UUID } },
    });

    if (!model) throw new NotFoundException('Модель не найдена');

    const maxVersion = await this.versionRepo
      .createQueryBuilder('v')
      .select('MAX(v.versionNumber)', 'max')
      .where('v.modelId = :modelId', { modelId })
      .getRawOne()
      .then((res) => res?.max ?? 0);

    const version = this.versionRepo.create({
      data: dto.data,
      modelId,           // используем явный FK, не объект model
      versionNumber: Number(maxVersion) + 1,
    });

    const savedVersion = await this.versionRepo.save(version);

    // Обновляем activeVersion без cascade через queryBuilder
    if (!model.activeVersionId) {
      await this.modelRepo
        .createQueryBuilder()
        .update()
        .set({ activeVersion: savedVersion })
        .where('id = :id', { id: modelId })
        .execute();
    }

    return savedVersion;
  }

  async getVersions(
    modelId: string,
    userId: string,
  ): Promise<ModelVersion[]> {
    const model = await this.modelRepo.findOne({
      where: { id: modelId, owner: { id: userId as UUID } },
    });

    if (!model) throw new NotFoundException('Модель не найдена');

    return this.versionRepo.find({
      where: { modelId },
      order: { versionNumber: 'ASC' },
    });
  }
}