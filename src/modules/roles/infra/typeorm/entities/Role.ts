import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Unit from '@modules/units/infra/typeorm/entities/Unit';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  status: boolean;

  @ManyToMany(() => Unit, (unit: Unit) => unit.roles, {
    cascade: true,
  })
  @JoinTable()
  units: Unit[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Role;
