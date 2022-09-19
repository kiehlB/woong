import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserinfoRequest } from './dto/getUserInfo.dto';
import { User } from './entitiy/user.entity';

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
    const { id } = input;
    const repo = await this.userRepository;

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
    const { email, password } = user;

    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 입력해 주세요!');
    }

    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existUser) {
      throw new HttpException(
        '이메일이 이미 존재합니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user == null) {
      return null;
    }

    const currentUser = new User();
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
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
