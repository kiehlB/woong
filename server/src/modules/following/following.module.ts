import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { Following } from './following.entity';
import { FollowingResolver } from './following.resolver';
import { FollowingService } from './following.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Following]),
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [FollowingService, FollowingResolver],
})
export class FollowingModule {}
