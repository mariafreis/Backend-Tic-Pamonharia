import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  // chama o ShowUserService
  public async show(request: Request, response: Response): Promise<Response> {
    // recupera o email e a senha fornecidos pelo usuário
    let email = request.params['email'];
    let password = request.params['password'];
    // cria um showUserService
    let showUserService = new ShowUserService();
    // executa o execute do showUserService
    let resposta = await showUserService.execute({ email, password });
    // retorna uma String
    return response.json(resposta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, nickname, occupation } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      nickname,
      occupation,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, nickname, occupation } = request.body;
    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      nickname,
      occupation,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({ id });

    return response.json([]);
  }
}
