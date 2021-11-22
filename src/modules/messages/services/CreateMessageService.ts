import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Message from '../typeorm/entities/Message';
import MessageRepository from '../typeorm/repositories/MessageRepository';

interface IRequest {
  name: string;
  message: string;
}

class CreateMessageService {
  public async execute({ name, message }: IRequest): Promise<Message> {
    const messageRepository = getCustomRepository(MessageRepository);
    const messageExists = await messageRepository.findByName(name);

    if (messageExists) {
      throw new AppError('Já existe um produto com esse nome');
    }

    const cmessage = messageRepository.create({
      name,
      message,
    });

    await messageRepository.save(cmessage);

    return cmessage;
  }
}

export default CreateMessageService;
