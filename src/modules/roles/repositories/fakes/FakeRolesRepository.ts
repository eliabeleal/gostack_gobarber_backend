import { uuid } from 'uuidv4';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import Role from '../../infra/typeorm/entities/Role';

class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async findById(id: string): Promise<Role | undefined> {
    return this.roles.find(role => role.id === id);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.roles.find(role => role.name === name);
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { id: uuid() }, roleData);

    this.roles.push(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    const findIndex = this.roles.findIndex(findRole => findRole.id === role.id);

    this.roles[findIndex] = role;

    return role;
  }
}
export default FakeRolesRepository;
