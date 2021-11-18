import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { FinanceRepository } from '../typeorm/repositories/FinancesRepository';

interface IRequest {
  id: string;
}

class DeleteFinanceService {
  public async execute({ id }: IRequest): Promise<void> {
    const financesRepository = getCustomRepository(FinanceRepository);

    const finance = await financesRepository.findOne(id);

    if (!finance) {
      throw new AppError('Finança não encontrada');
    }

    await financesRepository.remove(finance);
  }
}

export default DeleteFinanceService;
