import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImportJsonDto {
  @IsString()
  @ApiProperty({ example: 'Импортированная модель' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Описание модели', required: false })
  description?: string;

  @IsObject()
  @ApiProperty({
    example: {
      steps: ['Шаг 1', 'Шаг 2'],
    },
  })
  data: any;
}