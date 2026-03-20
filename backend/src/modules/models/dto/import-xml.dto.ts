import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImportXmlDto {
  @IsString()
  @ApiProperty({
    example: '<process><step>A</step></process>',
    description: 'XML строка модели',
  })
  xml: string;
}