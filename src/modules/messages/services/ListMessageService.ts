import { getCustomRepository } from 'typeorm';
import Message from '../typeorm/entities/Message';
import MessageRepository from '../typeorm/repositories/MessageRepository';

class ListMessageService {
  public async execute(): Promise<Message[]> {
    const messageRepository = getCustomRepository(MessageRepository);

    const messages = messageRepository.find();

    return messages;
  }
}

export default ListMessageService;
