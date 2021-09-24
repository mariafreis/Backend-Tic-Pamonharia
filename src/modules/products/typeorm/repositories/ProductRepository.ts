import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

//criar e ja exportar a classe
@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  //exemplo de um metodod de busca por nome - algo customizado
  //assincrono
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
