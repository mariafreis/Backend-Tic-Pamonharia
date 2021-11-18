import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      pricecomp: Joi.number().precision(2),
      pricevend: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number().required(),
      pricecomp: Joi.number().precision(2),
      pricevend: Joi.number().precision(2),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
