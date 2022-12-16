import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import * as dotenv from 'dotenv';
import { GithubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { ExpriedJwtStrategy, JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entitiy/user.entity';
import SocialUser from './entitiy/socialUser.entity';

dotenv.config();

 
const jwtModule = JwtModule.register({
  secret: process.env.jwtSecretKey
});

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialUser, User]),
    
    jwtModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubStrategy,
    AuthResolver,
    ExpriedJwtStrategy,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [jwtModule],
})
export class AuthModule {}
