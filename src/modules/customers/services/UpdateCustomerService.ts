import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  celular: string;
  endereco: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    cpf,
    celular,
    endereco,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }

    const customerExists = await customersRepository.findByCPF(cpf);

    if (customerExists) {
      throw new AppError('Já existe um cliente com esse cpf.');
    }
    customer.name = name;
    customer.cpf = cpf;
    customer.celular = celular;
    customer.endereco = endereco;

    return customer;
  }
}

export default UpdateCustomerService;
