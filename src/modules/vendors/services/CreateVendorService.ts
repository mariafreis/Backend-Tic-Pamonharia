import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Vendor from '../typeorm/entities/Vendor';
import VendorsRepository from '../typeorm/repositories/VendorsRepository';

interface IRequest {
  name: string;
  cellphone: string;
  area: string;
}
class CreateVendorService {
  public async execute({ name, cellphone, area }: IRequest): Promise<Vendor> {
    const vendorsRepository = getCustomRepository(VendorsRepository);
    const vendorExists = await vendorsRepository.findByName(name);

    if (vendorExists) {
      throw new AppError(
        'Nome já existe, adicione algo que possa diferenciá-los',
      );
    }
    const vendor = vendorsRepository.create({
      name,
      cellphone,
      area,
    });

    await vendorsRepository.save(vendor);

    return vendor;
  }
}

export default CreateVendorService;
