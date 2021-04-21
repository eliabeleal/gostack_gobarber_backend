import IUnitsRepository from '@modules/units/repositories/IUnitsRepository';
import ICreateUnitDTO from '@modules/units/dtos/ICreateUnitDTO';
import Unit from '@modules/units/infra/typeorm/entities/Unit';
import { uuid } from 'uuidv4';

class UnitsRepository implements IUnitsRepository {
  private units: Unit[] = [];

  public async findById(id: string): Promise<Unit | undefined> {
    return this.units.find(unit => unit.id === id);
  }

  public async findByName(name: string): Promise<Unit | undefined> {
    return this.units.find(unit => unit.name === name);
  }

  public async create(unitData: ICreateUnitDTO): Promise<Unit> {
    const unit = new Unit();

    Object.assign(unit, { id: uuid() }, unitData);

    this.units.push(unit);

    return unit;
  }

  public async save(unit: Unit): Promise<Unit> {
    const findIndex = this.units.findIndex(findUnit => findUnit.id === unit.id);

    this.units[findIndex] = unit;

    return unit;
  }
}
export default UnitsRepository;
