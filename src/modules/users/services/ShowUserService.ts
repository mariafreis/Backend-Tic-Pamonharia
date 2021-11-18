import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';

interface ILogin {
  email: string;
  password: string;
}

class ShowUserService {
  public async execute({ email, password }: ILogin): Promise<String> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (user) {
      // caso exista usuário com este email
      // compara a senha informado com a senha do banco de dados
      // função compare do bcrypts
      const validPassword = await compare(password, user.password);
      if (validPassword) {
        // senha válida
        return 'Usuário OK';
      } else {
        // senha inválida
        return 'Usuário/Senha inválidos';
      }
    } else {
      // usuário não encontrada
      return 'Usuário/Senha inválidos';
    }
  }
}

export default ShowUserService;
