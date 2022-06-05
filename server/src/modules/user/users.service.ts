import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserinfoRequest } from './dto/getUserInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    const user = await this.userRepository;
    const users = await user.find();

    return users;
  }

  async getSingleUser(input: GetUserinfoRequest): Promise<User> {
    const { id, username } = input;
    const repo = await this.userRepository;

    if (username) {
      const user = await repo.findOne({
        where: {
          username,
        },
      });
      return user;
    }
    const user = await repo.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async getUsersByIds(ids: readonly number[]) {
    const user = await this.userRepository;
    const users = await user.find();

    return users.filter((u) => ids.includes(u.id));
  }

  async createUser(user: Partial<User>): Promise<User> {
    const { username, password } = user;

    if (!username || !password) {
      throw new HttpException(
        'Please enter your username and password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user == null) {
      return null;
    }

    let currentUser = new User();
    currentUser.id = user.id;
    currentUser.username = user.username;
    currentUser.email = user.email;

    return currentUser;
  }

  async findById(id): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id, user): Promise<User> {
    const oldUser = await this.userRepository.findOne(id);
    delete user.password;

    if (user.name && user.name !== oldUser.username) {
      const existUser = await this.userRepository.findOne({
        where: { username: user.name },
      });

      if (existUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    }

    const newUser = await this.userRepository.merge(oldUser, user);
    return this.userRepository.save(newUser);
  }

  async create(newUser: User): Promise<User> {
    const createdUser = this.userRepository.create(newUser);
    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findOne(email: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
