import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, MoreThanOrEqual, FindManyOptions, In } from 'typeorm';
import { UserProfile } from './profile.entity';
import { User } from '../user/user.entity';
import { TokenUser } from 'src/decorator/auth-user.decorator';
import { UserService } from '../user/users.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
  ) {}

  async createAndUpdateProfile(user, bio) {
    const profile = await this.profileRepository;

    const newUserProfile = await profile.create({ id: user.id, bio: bio.bio });

    await profile.save(newUserProfile);

    return newUserProfile;
  }

  async getUsersByIds(ids: readonly number[]) {
    const user = await this.profileRepository;
    const users = await user.find();

    return users.filter((u) => ids.includes(u.id));
  }

  async findAll() {
    const user = await this.profileRepository;
    const users = await user.find();

    return users;
  }

  async findAllUserInfo(id) {
    const user = await this.profileRepository;
    const users = await user.find();

    const allUsers = users.find((users) => users.id === id);

    return allUsers;
  }
  async getByIds(ids: number[]) {
    return this.profileRepository.find({
      where: { id: In(ids) },
    });
  }
}
