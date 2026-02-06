import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty({ example: 'Процесс заказа' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Модель описывает процесс заказа товаров' })
  @IsString()
  @IsOptional()
  description?: string;
}
