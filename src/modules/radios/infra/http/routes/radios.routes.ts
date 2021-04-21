import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RadiosController from '../controllers/RadiosController';

const radiosRouter = Router();

const radiosController = new RadiosController();

radiosRouter.use(ensureAuthenticated);

radiosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      alias: Joi.string().required(),
      id: Joi.string()
        .pattern(/^[123][0-2]\d{5}$/)
        .required(),
      serial: Joi.string().required(),
      unit_id: Joi.string().required(),
    },
  }),
  radiosController.create,
);

export default radiosRouter;
