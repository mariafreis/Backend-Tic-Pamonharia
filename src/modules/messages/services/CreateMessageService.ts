import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Message from '../typeorm/entities/Message';
import MessageRepository from '../typeorm/repositories/MessageRepository';

interface IRequest {
  name: string;
  text: string;
}

class CreateMessageService {
  public async execute({ name, text }: IRequest): Promise<Message> {
    const messageRepository = getCustomRepository(MessageRepository);

    const message = messageRepository.create({
      name,
      text,
    });

    await messageRepository.save(message);

    return message;
  }
}

export default CreateMessageService;
