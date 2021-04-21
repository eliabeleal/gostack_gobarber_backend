import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUnitService from '@modules/units/services/CreateUnitService';

export default class UnitsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;

    const createUnits = container.resolve(CreateUnitService);

    const units = await createUnits.execute({
      name,
      address,
    });

    return response.json(classToClass(units));
  }
}
