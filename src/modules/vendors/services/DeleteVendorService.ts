import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import VendorsRepository from '../typeorm/repositories/VendorsRepository';

interface IRequest {
  id: string;
}

class DeleteVendorService {
  public async execute({ id }: IRequest): Promise<void> {
    const vendorsRepository = getCustomRepository(VendorsRepository);
    const vendor = await vendorsRepository.findOne(id);

    if (!vendor) {
      throw new AppError('Vendedor não existe.');
    }
    await vendorsRepository.remove(vendor);
  }
}

export default DeleteVendorService;
