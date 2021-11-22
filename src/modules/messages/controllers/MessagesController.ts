import { Request, Response } from 'express';
import CreateMessageService from '../services/CreateMessageService';
import DeleteMessageService from '../services/DeleteMessageService';
import ListMessageService from '../services/ListMessageService';
import UpdateMessageService from '../services/UpdateMessageService';

export default class MessagesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMessages = new ListMessageService();

    const messages = await listMessages.execute();

    return response.json(messages);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, message } = request.body;

    const createMessage = new CreateMessageService();

    const cmessage = await createMessage.execute({
      name,
      message,
    });

    return response.json(cmessage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, message } = request.body;
    const { id } = request.params;

    const updateMessage = new UpdateMessageService();

    const umessage = await updateMessage.execute({
      id,
      name,
      message,
    });

    return response.json(umessage);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMessage = new DeleteMessageService();

    await deleteMessage.execute({ id });

    return response.json([]);
  }
}
