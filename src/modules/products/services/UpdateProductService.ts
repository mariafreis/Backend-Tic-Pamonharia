import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
  pricecomp: number;
  pricevend: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    description,
    pricecomp,
    pricevend,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Já existe um produto com esse nome.');
    }

    product.name = name;
    product.description = description;
    product.pricecomp = pricecomp;
    product.pricevend = pricevend;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
