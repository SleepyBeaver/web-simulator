import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ModelsService } from './models.service';
import { ProcessModel } from '../../entities/process-model.entity';
import { ModelVersion } from '../../entities/model-version.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { CreateVersionDto } from './dto/create-version.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthRequest } from '../../auth/types';
import { UpdateModelDto } from './dto/update-model.dto';

@ApiTags('Модели процессов')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать модель бизнес-процесса' })
  @ApiCreatedResponse({
    description: 'Модель успешно создана',
    type: ProcessModel,
  })
  createModel(
    @Body() dto: CreateModelDto,
    @Req() req: AuthRequest,
  ): Promise<ProcessModel> {
    return this.modelsService.createModel(dto, req.user.sub);
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
    @Req() req: AuthRequest,
  ): Promise<ProcessModel> {
    return this.modelsService.getModel(id, req.user.sub);
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
    @Req() req: AuthRequest,
  ): Promise<ModelVersion> {
    return this.modelsService.createVersion(id, dto, req.user.sub);
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
    @Req() req: AuthRequest,
  ): Promise<ModelVersion[]> {
    return this.modelsService.getVersions(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить модель бизнес-процесса' })
  @ApiParam({ name: 'id', description: 'UUID модели' })
  @ApiOkResponse({
    description: 'Модель успешно обновлена',
    type: ProcessModel,
  })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  updateModel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateModelDto,
    @Req() req: AuthRequest,
  ): Promise<ProcessModel> {
    return this.modelsService.updateModel(id, dto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить модель бизнес-процесса' })
  @ApiParam({ name: 'id', description: 'UUID модели' })
  @ApiOkResponse({
    description: 'Модель успешно удалена',
  })
  @ApiNotFoundResponse({ description: 'Модель не найдена' })
  deleteModel(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthRequest,
  ): Promise<{ message: string }> {
    return this.modelsService.deleteModel(id, req.user.sub);
  }
}