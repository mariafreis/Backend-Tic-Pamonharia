import { EntityRepository, Repository } from 'typeorm';
import Message from '../entities/Message';

//criar e ja exportar a classe
@EntityRepository(Message)
export default class MessageRepository extends Repository<Message> {
  //exemplo de um metodod de busca por nome - algo customizado
  //assincrono
  public async findByName(name: string): Promise<Message | undefined> {
    const message = await this.findOne({
      where: {
        name,
      },
    });

    return message;
  }
}
