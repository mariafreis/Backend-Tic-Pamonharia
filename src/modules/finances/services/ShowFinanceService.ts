import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Finance from '../typeorm/entities/Finance';
import { FinanceRepository } from '../typeorm/repositories/FinancesRepository';

interface IRequest {
  id: string;
}

class ShowFinanceService {
  public async execute({ id }: IRequest): Promise<Finance> {
    const financesRepository = getCustomRepository(FinanceRepository);

    const finance = await financesRepository.findOne(id);

    if (!finance) {
      throw new AppError('Finança não encontrada');
    }
    return finance;
  }
}

export default ShowFinanceService;
