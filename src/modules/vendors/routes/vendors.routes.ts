import { Router } from 'express';
import VendorsController from '../controllers/VendorsController';
import { celebrate, Joi, Segments } from 'celebrate';

const vendorsRouter = Router();
const vendorsController = new VendorsController();

vendorsRouter.get('/', vendorsController.index);

vendorsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vendorsController.show,
);

vendorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cellphone: Joi.string().required(),
      area: Joi.string().required(),
    },
  }),
  vendorsController.create,
);

vendorsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      cellphone: Joi.string().required(),
      area: Joi.string().required(),
    },
  }),
  vendorsController.update,
);

vendorsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vendorsController.delete,
);

export default vendorsRouter;
