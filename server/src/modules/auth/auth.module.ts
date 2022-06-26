import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import * as dotenv from 'dotenv';
import { GithubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import SocialUser from './socialUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { User } from '../user/user.entity';

dotenv.config();

const passModule = PassportModule.register({ defaultStrategy: 'jwt' });
const jwtModule = JwtModule.register({
  secret: process.env.jwtSecretKey,
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialUser, User]),
    passModule,
    jwtModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubStrategy,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [passModule, jwtModule],
})
export class AuthModule {}
