import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVersionDto {
  @ApiProperty({ description: 'Данные модели в формате JSON' })
  @IsObject()
  @IsNotEmpty()
  data: any;
}
