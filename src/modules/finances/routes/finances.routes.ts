import { Router } from 'express';
import FinancesController from '../controllers/FinancesController';
import { celebrate, Joi, Segments } from 'celebrate';

const financesRouter = Router();
const financesController = new FinancesController();

financesRouter.get('/', financesController.index);

financesRouter.get('/:id', financesController.show);

financesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      natureza: Joi.string().required(),
      valor: Joi.number().precision(2),
      parcelas: Joi.number(),
    },
  }),
  financesController.create,
);

financesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      natureza: Joi.string().required(),
      valor: Joi.number().precision(2),
      parcelas: Joi.number(),
    },
  }),
  financesController.update,
);

financesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  financesController.delete,
);

export default financesRouter;
