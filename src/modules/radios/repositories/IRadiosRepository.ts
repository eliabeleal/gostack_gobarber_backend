import { IRadioCreateDTO } from '@modules/radios/dtos/ICreateRadioDTO';
import Radio from '../infra/typeorm/entities/Radio';

export default interface IUsersRepository {
  findById(id: string): Promise<Radio | undefined>;
  findByAlias(alias: string): Promise<Radio | undefined>;
  create(data: IRadioCreateDTO): Promise<Radio>;
  save(user: Radio): Promise<Radio>;
}
