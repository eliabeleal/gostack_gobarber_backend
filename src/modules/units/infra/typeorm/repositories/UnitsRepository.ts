import { getRepository, Repository } from 'typeorm';

import IUnitsRepository from '@modules/units/repositories/IUnitsRepository';
import ICreateUnitDTO from '@modules/units/dtos/ICreateUnitDTO';
import Unit from '../entities/Unit';

class UnitsRepository implements IUnitsRepository {
  private ormRepository: Repository<Unit>;

  constructor() {
    this.ormRepository = getRepository(Unit);
  }

  public async findById(id: string): Promise<Unit | undefined> {
    const unit = await this.ormRepository.findOne(id);
    return unit;
  }

  public async findByName(name: string): Promise<Unit | undefined> {
    const unit = await this.ormRepository.findOne({ where: { name } });
    return unit;
  }

  public async create(unitData: ICreateUnitDTO): Promise<Unit> {
    const unit = this.ormRepository.create(unitData);
    await this.ormRepository.save(unit);

    return unit;
  }

  public async save(unit: Unit): Promise<Unit> {
    return this.ormRepository.save(unit);
  }
}
export default UnitsRepository;
