import {
  Injectable,
  InternalServerErrorException,
  Provider,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import authConfig from './auth-config.development.template';
import { UserService } from '../user/users.service';
import { TokenUser } from 'src/decorator/auth-user.decorator';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entitiy/user.entity';
import SocialUser from './entitiy/socialUser.entity';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.jwtSecretKey;

  constructor(
    @InjectRepository(SocialUser)
    private socialUserRepository: Repository<SocialUser>,
    private readonly userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(
    accessToken,
    userProfile: any,
    provider: string,
  ): Promise<{ jwt: string; user: User }> {
    try {
      const userRepo = await this.userRepository;

      let existingUser = await this.userService.findOne(userProfile.email);

      // existingUser = await this.userService.create({
      //   id:userProfile.id,
      //   email:userProfile.email,
      //   username:userProfile.username
      // });

      if (!existingUser) {
        const newUser = await userRepo.create({
          email: userProfile.email,
          username: userProfile.username,
        });

        await userRepo.save(newUser);
      }

      const { email } = userProfile.email;

      const signingPayload = { email };

      const jwt: string = sign(signingPayload, process.env.jwtSecretKey, {
        expiresIn: 3600,
      });

      return { jwt, user: existingUser };
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async validateUser(
    userId: string,
    password: string,
  ): Promise<TokenUser | null> {
    const user = await this.userService.findById(userId);
    const isCompared = await user?.checkPassword(password);

    if (!isCompared || !user) return null;

    return { id: user.id };
  }

  async signin(user: TokenUser) {
    const payload = {
      ...user,
    };
    return this.jwtService.sign(payload);
  }
}
