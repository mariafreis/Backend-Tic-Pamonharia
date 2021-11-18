import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Finance from '../typeorm/entities/Finance';
import { FinanceRepository } from '../typeorm/repositories/FinancesRepository';

interface IRequest {
  id: string;
  descricao: string;
  natureza: string;
  valor: number;
  parcelas: number;
}

class UpdateFinanceService {
  public async execute({
    id,
    descricao,
    natureza,
    valor,
    parcelas,
  }: IRequest): Promise<Finance> {
    const financesRepository = getCustomRepository(FinanceRepository);

    const finance = await financesRepository.findOne(id);

    if (!finance) {
      throw new AppError('Finança não encontrada');
    }

    finance.descricao = descricao;
    finance.natureza = natureza;
    finance.valor = valor;
    finance.parcelas = parcelas;

    await financesRepository.save(finance);

    return finance;
  }
}

export default UpdateFinanceService;
