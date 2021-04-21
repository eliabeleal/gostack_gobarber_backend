import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findById(id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne(id);
    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ where: { name } });
    return role;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);
    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }
}
export default RolesRepository;
