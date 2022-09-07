import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/entitiy/post.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { PostLike } from './postLike.entity';
import { PostLikeResolver } from './postLike.resolver';
import { PostLikeService } from './postLike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLike]),
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [PostLikeService, PostLikeResolver],
  exports: [PostLikeService],
})
export class PostLikeModule {}
