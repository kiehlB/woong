import {
  Injectable,
  InternalServerErrorException,
  Provider,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import authConfig from './auth-config.development.template';
import { UserService } from '../user/users.service';
import { User } from '../user/user.entity';
import { TokenUser } from 'src/decorator/auth-user.decorator';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = authConfig.jwtSecretKey;

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(
    userProfile: any,
    provider: string,
  ): Promise<{ jwt: string; user: User }> {
    try {
      let existingUser = await this.userService.findOne(userProfile.email);
      if (!existingUser) {
        existingUser = await this.userService.create({
          ...userProfile,
        });
      }

      const { email } = existingUser;
      const signingPayload = { email };
      const jwt: string = sign(signingPayload, this.JWT_SECRET_KEY, {
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
