import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Unit from '@modules/units/infra/typeorm/entities/Unit';

@Entity('radios')
class Radio {
  @PrimaryColumn()
  id: string;

  @Column()
  alias: string;

  @Column()
  serial: string;

  @Column()
  unit_id: string;

  @ManyToOne(() => Unit, (unit: Unit) => unit.radio, {
    eager: true,
  })
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Radio;
