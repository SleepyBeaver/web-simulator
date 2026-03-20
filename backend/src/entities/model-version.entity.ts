import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { ProcessModel } from './process-model.entity';

@Entity()
export class ModelVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  data: any;

  @Column({ type: 'int', default: 1 })
  versionNumber: number;

  @Column({ type: 'uuid', nullable: false })
  modelId: string;

  @ManyToOne(() => ProcessModel, (model) => model.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model: ProcessModel;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', default: true })
  isValid: boolean;
}