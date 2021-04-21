import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Unit from '@modules/units/infra/typeorm/entities/Unit';

@Entity('adresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  postcode: string;

  @OneToOne(() => Unit, (unit: Unit) => unit.address)
  unit: Unit;
}

export default Address;
