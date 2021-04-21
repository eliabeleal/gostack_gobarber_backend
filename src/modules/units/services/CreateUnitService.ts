import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRequest from '@modules/units/dtos/ICreateUnitDTO';
import IUnitsRepository from '../repositories/IUnitsRepository';

import Unit from '../infra/typeorm/entities/Unit';

@injectable()
class CreateUnitService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: IUnitsRepository,
  ) {}

  async execute({ name, address }: IRequest): Promise<Unit> {
    const checkUnitExists = await this.unitsRepository.findByName(name);

    if (checkUnitExists) {
      throw new AppError('Identificator already used.');
    }

    const unit = await this.unitsRepository.create({
      name,
      address,
    });

    return unit;
  }
}
export default CreateUnitService;
