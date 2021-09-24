import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Vendor from '../typeorm/entities/Vendor';
import VendorsRepository from '../typeorm/repositories/VendorsRepository';

interface IRequest {
  id: string;
}

class ListUserService {
  public async execute({ id }: IRequest): Promise<Vendor> {
    const vendorsRepository = getCustomRepository(VendorsRepository);
    const vendor = await vendorsRepository.findOne(id);

    if (!vendor) {
      throw new AppError('Vendedor não existe.');
    }

    return vendor;
  }
}

export default ListUserService;
