import { getCustomRepository } from 'typeorm';
import Vendor from '../typeorm/entities/Vendor';
import VendorsRepository from '../typeorm/repositories/VendorsRepository';

class ListVendorService {
  public async execute(): Promise<Vendor[]> {
    const vendorsRepository = getCustomRepository(VendorsRepository);

    const vendors = vendorsRepository.find();

    return vendors;
  }
}

export default ListVendorService;
