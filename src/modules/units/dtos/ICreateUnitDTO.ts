import IAddress from '@modules/adresses/dtos/ICreateAddressDTO';

export default interface IUnitCreateDTO {
  name: string;
  address: IAddress;
}
