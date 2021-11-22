import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Message from '../typeorm/entities/Message';
import MessageRepository from '../typeorm/repositories/MessageRepository';

interface IRequest {
  id: string;
  name: string;
  text: string;
}

class UpdateMessageService {
  public async execute({ id, name, text }: IRequest): Promise<Message> {
    const messagesRepository = getCustomRepository(MessageRepository);

    const message = await messagesRepository.findOne(id);

    if (!message) {
      throw new AppError('Mensagem não encontrada');
    }

    message.name = name;
    message.text = text;

    await messagesRepository.save(message);

    return message;
  }
}

export default UpdateMessageService;
