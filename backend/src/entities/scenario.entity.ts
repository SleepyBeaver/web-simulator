import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProcessModel } from './process-model.entity';

@Entity()
export class Scenario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'json' })
  config: any;

  @Column({ type: 'uuid' })
  modelId: string;

  @ManyToOne(() => ProcessModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model: ProcessModel;

  @CreateDateColumn()
  createdAt: Date;
}