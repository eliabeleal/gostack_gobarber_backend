import ICreateUnitDTO from '@modules/units/dtos/ICreateUnitDTO';

export default interface IRoleCreateDTO {
  name: string;
  descripton: string;
  start: Date;
  end: Date;
  status: boolean;
  units: ICreateUnitDTO[];
}
