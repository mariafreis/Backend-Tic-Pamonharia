import { EntityRepository, Repository } from 'typeorm';
import Vendor from '../entities/Vendor';

@EntityRepository(Vendor)
class VendorsRepository extends Repository<Vendor> {
  public async findByName(name: string): Promise<Vendor | undefined> {
    const vendor = await this.findOne({
      where: {
        name,
      },
    });
    return vendor;
  }
  public async findById(id: string): Promise<Vendor | undefined> {
    const vendor = await this.findOne({
      where: {
        id,
      },
    });
    return vendor;
  }
}

export default VendorsRepository;
