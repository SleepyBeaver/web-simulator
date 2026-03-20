import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { UserRole } from '../enums/roles.enum';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { ProcessModel } from './process-model.entity';

@ApiExtraModels()
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: UUID;

  @Column({ type: 'varchar' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'Иван Иванов' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @Column({
    type: 'boolean',
    default: false,
  })
  consent: boolean;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  @IsString()
  @IsOptional()
  refreshToken: string;

  @OneToMany(() => ProcessModel, (model) => model.owner)
  models: ProcessModel[];
}