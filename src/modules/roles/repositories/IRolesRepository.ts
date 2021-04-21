import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import Role from '../infra/typeorm/entities/Role';

export default interface IRolesRepository {
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
}
