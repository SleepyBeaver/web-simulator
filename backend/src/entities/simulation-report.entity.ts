import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProcessModel } from './process-model.entity';
import { ModelVersion } from './model-version.entity';

@Entity()
export class SimulationReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  modelId: string;

  @Column({ type: 'uuid' })
  versionId: string;

  @ManyToOne(() => ProcessModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model: ProcessModel;

  @ManyToOne(() => ModelVersion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'versionId' })
  version: ModelVersion;

  @Column({ type: 'json' })
  metrics: any;

  @CreateDateColumn()
  createdAt: Date;
}