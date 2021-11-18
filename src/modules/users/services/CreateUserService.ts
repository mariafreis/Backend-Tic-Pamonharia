import AppError from '@shared/errors/AppError';
import { hash, genSalt } from 'bcryptjs';
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

    const salt = await genSalt(8);
    let hashedPassword = await hash(password, salt);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      nickname,
      occupation,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
