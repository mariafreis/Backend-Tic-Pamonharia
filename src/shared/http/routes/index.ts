import productsRouter from '@modules/products/routes/products.routes';
import exp from 'constants';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
