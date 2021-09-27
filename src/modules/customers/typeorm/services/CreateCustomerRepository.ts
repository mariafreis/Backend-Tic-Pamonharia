import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../entities/Customer';
import CustomersRepository from '../repositories/CustomersRepository';

interface IRequest {
  name: string;
  cpf: string;
  celular: string;
  endereco: string;
}
class CreateCustomerService {
  public async execute({
    name,
    cpf,
    celular,
    endereco,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const cpfExists = await customersRepository.findByCPF(cpf);

    if (cpfExists) {
      throw new AppError('CPF já pertence à algum cliente');
    }

    const customer = customersRepository.create({
      name,
      cpf,
      celular,
      endereco,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
