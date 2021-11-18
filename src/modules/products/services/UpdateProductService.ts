import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
  quantity: number;
  pricecomp: number;
  pricevend: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    description,
    quantity,
    pricecomp,
    pricevend,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('Já existe um produto com esse nome.');
    }

    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.pricecomp = pricecomp;
    product.pricevend = pricevend;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
