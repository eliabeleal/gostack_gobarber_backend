import IRadiosRepository from '@modules/radios/repositories/IRadiosRepository';
import { IRadioCreateDTO } from '@modules/radios/dtos/ICreateRadioDTO';
import Radio from '../../infra/typeorm/entities/Radio';

class FakeRadiosRepository implements IRadiosRepository {
  private radios: Radio[] = [];

  public async findById(id: string): Promise<Radio | undefined> {
    return this.radios.find(radio => radio.id === id);
  }

  public async findByAlias(alias: string): Promise<Radio | undefined> {
    return this.radios.find(radio => radio.alias === alias);
  }

  public async create(radioData: IRadioCreateDTO): Promise<Radio> {
    const radio = new Radio();

    Object.assign(radio, { id: radioData.id }, radioData);

    this.radios.push(radio);

    return radio;
  }

  public async save(radio: Radio): Promise<Radio> {
    const findIndex = this.radios.findIndex(
      findRadio => findRadio.id === radio.id,
    );

    this.radios[findIndex] = radio;

    return radio;
  }
}
export default FakeRadiosRepository;
