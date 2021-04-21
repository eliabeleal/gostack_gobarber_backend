import { getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '@modules/adresses/dtos/ICreateAddressDTO';
import IAddressRepository from '@modules/adresses/repositories/IAddressRepository';
import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);
    return address;
  }

  public async findByName(name: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({ where: { name } });
    return address;
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData);
    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}
export default AddressRepository;
