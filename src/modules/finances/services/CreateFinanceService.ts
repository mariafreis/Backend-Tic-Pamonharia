import { getCustomRepository } from 'typeorm';
import Finance from '../typeorm/entities/Finance';
import { FinanceRepository } from '../typeorm/repositories/FinancesRepository';

interface IRequest {
  descricao: string;
  natureza: string;
  valor: number;
  parcelas: number;
}

class CreateFinanceService {
  public async execute({
    descricao,
    natureza,
    valor,
    parcelas,
  }: IRequest): Promise<Finance> {
    const financesRepository = getCustomRepository(FinanceRepository);

    const finance = financesRepository.create({
      descricao,
      natureza,
      valor,
      parcelas,
    });

    await financesRepository.save(finance);

    return finance;
  }
}

export default CreateFinanceService;
