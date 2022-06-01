import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/users.service';
import { TokenUser } from 'src/decorator/auth-user.decorator';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwtSecretKey,
    });
  }

  async validate(payload: TokenUser) {
    const user = await this.usersService.findById(payload.id);

    return user;
  }
}
