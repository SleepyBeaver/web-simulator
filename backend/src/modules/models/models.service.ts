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

  async createModel(dto: CreateModelDto): Promise<ProcessModel> {
    const model = this.modelRepo.create(dto);
    return this.modelRepo.save(model);
  }

  async getModel(id: string): Promise<ProcessModel> {
    const model = await this.modelRepo.findOne({ 
      where: { id },
      relations: ['versions'],
    });
    if (!model) throw new NotFoundException('Модель не найдена');
    return model;
  }

  async createVersion(modelId: string, dto: CreateVersionDto): Promise<ModelVersion> {
    const model = await this.modelRepo.findOne({ where: { id: modelId } });
    if (!model) throw new NotFoundException('Модель не найдена');

    const version = this.versionRepo.create({
      data: dto.data,
      model,
    });
    return this.versionRepo.save(version);
  }

  async getVersions(modelId: string): Promise<ModelVersion[]> {
    const model = await this.modelRepo.findOne({ where: { id: modelId }, relations: ['versions'] });
    if (!model) throw new NotFoundException('Модель не найдена');

    return model.versions;
  }
}
