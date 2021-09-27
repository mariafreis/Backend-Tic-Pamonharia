import { getCustomRepository } from 'typeorm';
import Customer from '../entities/Customer';
import CustomersRepository from '../repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
