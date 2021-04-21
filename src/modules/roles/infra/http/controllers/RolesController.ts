import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoleService from '@modules/roles/services/CreateRoleService';

export default class RolesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, descripton, end, start, status, units } = request.body;

    const createRoles = container.resolve(CreateRoleService);

    const roles = await createRoles.execute({
      name,
      descripton,
      end,
      start,
      status,
      units,
    });

    return response.json(classToClass(roles));
  }
}
