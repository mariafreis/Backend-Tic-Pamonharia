import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  description: string;
  pricecomp: number;
  pricevend: number;
  quantity: number;
}
class CreateProductService {
  public async execute({
    name,
    description,
    pricecomp,
    pricevend,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('Já existe um produto com esse nome');
    }

    const product = productRepository.create({
      name,
      description,
      pricecomp,
      pricevend,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
