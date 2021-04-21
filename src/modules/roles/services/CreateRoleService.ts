import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { isAfter, isBefore } from 'date-fns';
import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../infra/typeorm/entities/Role';
import IRoleCreateDTO from '../dtos/ICreateRoleDTO';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    descripton,
    end,
    start,
    status,
    units,
  }: IRoleCreateDTO): Promise<Role> {
    const checkRoleExists = await this.rolesRepository.findByName(name);

    if (checkRoleExists) {
      throw new AppError('Role name already used.');
    }

    if (isAfter(new Date(start), Date.now())) {
      throw new AppError(
        "You can't create an role with a initial date after today",
      );
    }

    if (isBefore(new Date(end), Date.now())) {
      throw new AppError(
        "You can't create an role with a final date before today",
      );
    }

    const role = await this.rolesRepository.create({
      name,
      descripton,
      end,
      start,
      status,
      units,
    });

    return role;
  }
}
export default CreateRoleService;
