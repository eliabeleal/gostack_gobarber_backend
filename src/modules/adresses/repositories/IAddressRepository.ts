import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findByName(name: string): Promise<Address | undefined>;
}
