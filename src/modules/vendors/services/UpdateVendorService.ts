import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Vendor from '../typeorm/entities/Vendor';
import VendorsRepository from '../typeorm/repositories/VendorsRepository';

interface IRequest {
  id: string;
  name: string;
  cellphone: string;
  area: string;
}

class UpdateVendorService {
  public async execute({
    id,
    name,
    cellphone,
    area,
  }: IRequest): Promise<Vendor> {
    const vendorsRepository = getCustomRepository(VendorsRepository);

    const vendor = await vendorsRepository.findOne(id);

    if (!vendor) {
      throw new AppError('vendedor não encontrado');
    }

    const vendorExists = await vendorsRepository.findByName(name);

    if (vendorExists && name !== vendor.name) {
      throw new AppError('Já existe um vendedor com esse nome.');
    }

    vendor.name = name;
    vendor.cellphone = cellphone;
    vendor.area = area;

    await vendorsRepository.save(vendor);

    return vendor;
  }
}

export default UpdateVendorService;
