import { Router } from 'express';
import MessagesController from '../controllers/MessagesController';
import { celebrate, Joi, Segments } from 'celebrate';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/', messagesController.index);

messagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      text: Joi.string().required(),
    },
  }),
  messagesController.create,
);

messagesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      text: Joi.string().required(),
    },
  }),
  messagesController.update,
);

messagesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  messagesController.delete,
);

export default messagesRouter;
