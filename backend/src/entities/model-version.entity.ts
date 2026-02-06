import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProcessModel } from './process-model.entity';

@Entity()
export class ModelVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  data: any; // JSON-схема модели

  @ManyToOne(() => ProcessModel, (model) => model.versions)
  model: ProcessModel;

  @CreateDateColumn()
  createdAt: Date;
}
