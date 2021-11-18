import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
}

class ShowProductService {
  public async execute({ name }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Produto não existe.');
    }

    return product;
  }
}

export default ShowProductService;
