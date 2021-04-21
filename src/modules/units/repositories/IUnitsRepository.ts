import ICreateUnitDTO from '@modules/units/dtos/ICreateUnitDTO';
import Unit from '../infra/typeorm/entities/Unit';

export default interface IUsersRepository {
  findById(id: string): Promise<Unit | undefined>;
  findByName(name: string): Promise<Unit | undefined>;
  create(data: ICreateUnitDTO): Promise<Unit>;
  save(unit: Unit): Promise<Unit>;
}
