import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import IRequest from '@modules/adresses/dtos/ICreateAddressDTO';
import UnitsController from '../controllers/UnitsController';

const unitsRouter = Router();

const unitsController = new UnitsController();

unitsRouter.use(ensureAuthenticated);

unitsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.object<IRequest>(),
    },
  }),
  unitsController.create,
);

export default unitsRouter;
