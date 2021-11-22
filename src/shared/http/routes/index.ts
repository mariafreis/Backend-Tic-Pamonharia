import customersRouter from '@modules/customers/routes/customers.routes';
import financesRouter from '@modules/finances/routes/finances.routes';
import messagesRouter from '@modules/messages/routes/messages.routes';
import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import vendorsRouter from '@modules/vendors/routes/vendors.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/messages', messagesRouter);
routes.use('/finances', financesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);
routes.use('/vendors', vendorsRouter);

export default routes;
