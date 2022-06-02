import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { PostLike } from './postLike.entity';
import { PostLikeResolver } from './postLike.resolver';
import { PostLikeService } from './postLike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLike]),
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [PostLikeService, PostLikeResolver],
})
export class postLikeModule {}
