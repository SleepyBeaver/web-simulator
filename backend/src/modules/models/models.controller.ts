import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ModelsService } from './models.service';
import { ProcessModel } from '../../entities/process-model.entity';
import { ModelVersion } from '../../entities/model-version.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { CreateVersionDto } from './dto/create-version.dto';

@ApiTags('Модели процессов')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать модель бизнес-процесса' })
  @ApiCreatedResponse({
    description: 'Модель успешно создана',
    type: ProcessModel,
  })
  createModel(@Body() dto: CreateModelDto): Promise<ProcessModel> {
    return this.modelsService.createModel(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить модель по ID' })
  @ApiParam({ name: 'id', description: 'UUID модели' })
  @ApiOkResponse({
    description: 'Модель найдена',
    type: ProcessModel,
  })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  getModel(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProcessModel> {
    return this.modelsService.getModel(id);
  }

  @Post(':id/versions')
  @ApiOperation({ summary: 'Сохранить новую версию модели' })
  @ApiParam({ name: 'id', description: 'UUID модели' })
  @ApiCreatedResponse({
    description: 'Версия успешно сохранена',
    type: ModelVersion,
  })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  createVersion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateVersionDto,
  ): Promise<ModelVersion> {
    return this.modelsService.createVersion(id, dto);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Получить историю версий модели' })
  @ApiParam({ name: 'id', description: 'UUID модели' })
  @ApiOkResponse({
    description: 'Список версий модели',
    type: [ModelVersion],
  })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  getVersions(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ModelVersion[]> {
    return this.modelsService.getVersions(id);
  }
}
