import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван Петров' })
  @IsString({ message: 'Имя должно быть строкой' })
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
}
