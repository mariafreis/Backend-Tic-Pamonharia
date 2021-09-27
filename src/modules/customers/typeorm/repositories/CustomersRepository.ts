import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });
    return customer;
  }
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });
    return customer;
  }
  public async findByCPF(cpf: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        cpf,
      },
    });
    return customer;
  }
}
export default CustomersRepository;
