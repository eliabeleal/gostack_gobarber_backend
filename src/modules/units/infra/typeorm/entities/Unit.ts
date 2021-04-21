import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import Address from '@modules/adresses/infra/typeorm/entities/Address';
import Radio from '@modules/radios/infra/typeorm/entities/Radio';
import Role from '@modules/roles/infra/typeorm/entities/Role';

@Entity('units')
class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address, (address: Address) => address.unit, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Radio, (radio: Radio) => radio.unit_id)
  radio: Radio[];

  @ManyToMany(() => Role, (role: Role) => role.units)
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Unit;
