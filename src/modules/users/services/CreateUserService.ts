import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  nickname: string;
  occupation: string;
}
class CreateUserService {
  public async execute({
    name,
    email,
    password,
    nickname,
    occupation,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email já pertence à algum usuário');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      nickname,
      occupation,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
