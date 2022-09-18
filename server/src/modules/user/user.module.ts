import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UserProfileModule } from '../profile/profile.module';
import { User } from './entitiy/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserProfileModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
