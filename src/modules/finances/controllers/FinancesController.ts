import { Request, Response } from 'express';
import CreateFinanceService from '../services/CreateFinanceService';
import DeleteFinanceService from '../services/DeleteFinanceService';
import ListFinanceService from '../services/ListFinanceService';
import ShowFinanceService from '../services/ShowFinanceService';
import UpdateFinanceService from '../services/UpdateFinanceService';

export default class FinancesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFinances = new ListFinanceService();

    const finances = await listFinances.execute();

    return response.json(finances);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showFinance = new ShowFinanceService();

    const finance = await showFinance.execute({ id });

    return response.json(finance);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, natureza, valor, parcelas } = request.body;

    const createFinance = new CreateFinanceService();

    const finance = await createFinance.execute({
      descricao,
      natureza,
      valor,
      parcelas,
    });

    return response.json(finance);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { descricao, natureza, valor, parcelas } = request.body;
    const { id } = request.params;

    const updateFinance = new UpdateFinanceService();

    const finance = await updateFinance.execute({
      id,
      descricao,
      natureza,
      valor,
      parcelas,
    });
    return response.json(finance);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFinance = new DeleteFinanceService();

    await deleteFinance.execute({ id });

    return response.json([]);
  }
}
