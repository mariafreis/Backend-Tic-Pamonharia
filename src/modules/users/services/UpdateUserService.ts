import AppError from '@shared/errors/AppError';
import { genSalt, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
  occupation: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    nickname,
    occupation,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    } else {
      user.name = name;
      user.email = email;
      user.password = password;
      user.nickname = nickname;
      user.occupation = occupation;

      await usersRepository.save(user);

      return user;
    }
  }
}
export default UpdateUserService;
