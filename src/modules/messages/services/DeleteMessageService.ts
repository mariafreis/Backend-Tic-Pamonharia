import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import MessageRepository from '../typeorm/repositories/MessageRepository';

interface IRequest {
  id: string;
}

class DeleteMessageService {
  public async execute({ id }: IRequest): Promise<void> {
    const messagesRepository = getCustomRepository(MessageRepository);

    const message = await messagesRepository.findOne(id);

    if (!message) {
      throw new AppError('Mensagem não existe.');
    }
    await messagesRepository.remove(message);
  }
}

export default DeleteMessageService;
