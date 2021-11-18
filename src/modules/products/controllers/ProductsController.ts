import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ name });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, pricecomp, pricevend, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      description,
      pricecomp,
      pricevend,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, quantity, pricecomp, pricevend } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      description,
      quantity,
      pricecomp,
      pricevend,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
