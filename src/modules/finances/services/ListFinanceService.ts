import { getCustomRepository } from 'typeorm';
import Finance from '../typeorm/entities/Finance';
import { FinanceRepository } from '../typeorm/repositories/FinancesRepository';

class ListFinanceService {
  public async execute(): Promise<Finance[]> {
    const financesRepository = getCustomRepository(FinanceRepository);

    const finances = financesRepository.find();

    return finances;
  }
}

export default ListFinanceService;
