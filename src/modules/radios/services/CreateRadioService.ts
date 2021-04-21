import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IRadioCreateDTO as IRequest } from '@modules/radios/dtos/ICreateRadioDTO';
import IRadiosRepository from '../repositories/IRadiosRepository';

import Radio from '../infra/typeorm/entities/Radio';

@injectable()
class CreateRadioService {
  constructor(
    @inject('RadiosRepository')
    private radiosRepository: IRadiosRepository,
  ) {}

  async execute({
    id,
    alias,
    serial,
    type,
    unit_id,
  }: IRequest): Promise<Radio> {
    const checkRadioExists = await this.radiosRepository.findById(id);

    if (checkRadioExists) {
      throw new AppError('Identificator already used.');
    }

    const radio = await this.radiosRepository.create({
      id,
      alias,
      serial,
      type,
      unit_id,
    });

    return radio;
  }
}
export default CreateRadioService;
