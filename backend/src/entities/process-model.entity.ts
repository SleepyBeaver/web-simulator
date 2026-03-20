import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
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

  @OneToMany(() => ModelVersion, (version) => version.model, { cascade: false }) // cascade убрали
  versions: ModelVersion[];

  @OneToOne(() => ModelVersion, { nullable: true, eager: false })
  @JoinColumn()
  activeVersion?: ModelVersion;

  @Column({ type: 'uuid', nullable: true })
  activeVersionId?: string;
}