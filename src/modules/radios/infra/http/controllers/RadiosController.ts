import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRadioService from '@modules/radios/services/CreateRadioService';

export default class RadiosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { alias, id, serial, unit_id } = request.body;

    const createRadio = container.resolve(CreateRadioService);

    const radio = await createRadio.execute({
      alias,
      id,
      serial,
      type: id[0],
      unit_id,
    });

    return response.json(classToClass(radio));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({});
  }
}
