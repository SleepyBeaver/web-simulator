import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ModelVersion } from './model-version.entity';
import { User } from './user.entity';

@Entity()
export class ProcessModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.models, { eager: true })
  owner: User;

  @OneToMany(() => ModelVersion, (version) => version.model, {
    cascade: true,
  })
  versions: ModelVersion[];
}