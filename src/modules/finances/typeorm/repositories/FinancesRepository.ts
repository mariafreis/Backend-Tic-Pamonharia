import { EntityRepository, Repository } from 'typeorm';
import Finance from '../entities/Finance';

@EntityRepository(Finance)
export class FinanceRepository extends Repository<Finance> {}
