import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Follow } from './follower.entity';
import { FollowerResolver } from './follower.resolver';
import { FollowerService } from './follower.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), AuthModule, UserModule],
  providers: [FollowerService, FollowerResolver],
})
export class FollowerModule {}
