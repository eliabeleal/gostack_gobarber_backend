import { getRepository, Repository } from 'typeorm';

import IRadiosRepository from '@modules/radios/repositories/IRadiosRepository';
import { IRadioCreateDTO } from '@modules/radios/dtos/ICreateRadioDTO';
import Radio from '../entities/Radio';

class RadiosRepository implements IRadiosRepository {
  private ormRepository: Repository<Radio>;

  constructor() {
    this.ormRepository = getRepository(Radio);
  }

  public async findById(id: string): Promise<Radio | undefined> {
    const radio = await this.ormRepository.findOne(id);
    return radio;
  }

  public async findByAlias(alias: string): Promise<Radio | undefined> {
    const radio = await this.ormRepository.findOne({ where: { alias } });
    return radio;
  }

  public async create(radioData: IRadioCreateDTO): Promise<Radio> {
    const radio = this.ormRepository.create(radioData);
    await this.ormRepository.save(radio);

    return radio;
  }

  public async save(radio: Radio): Promise<Radio> {
    return this.ormRepository.save(radio);
  }
}
export default RadiosRepository;
