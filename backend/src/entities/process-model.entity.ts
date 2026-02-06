import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ModelVersion } from './model-version.entity';

@Entity()
export class ProcessModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ModelVersion, (version) => version.model, { cascade: true })
  versions: ModelVersion[];
}
