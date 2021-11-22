import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Message from '../typeorm/entities/Message';
import MessageRepository from '../typeorm/repositories/MessageRepository';

interface IRequest {
  id: string;
  name: string;
  message: string;
}

class UpdateMessageService {
  public async execute({ id, name, message }: IRequest): Promise<Message> {
    const messagesRepository = getCustomRepository(MessageRepository);

    const umessage = await messagesRepository.findOne(id);

    if (!umessage) {
      throw new AppError('Mensagem não encontrada');
    }

    umessage.name = name;
    umessage.message = message;

    await messagesRepository.save(umessage);

    return umessage;
  }
}

export default UpdateMessageService;
