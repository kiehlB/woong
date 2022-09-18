import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/entitiy/post.entity';
import { PostScore } from '../post/entitiy/postScore.entity';
import { PostModule } from '../post/post.module';
import { PostService } from '../post/post.service';
import { UserModule } from '../user/user.module';
import { PostLike } from './postLike.entity';
import { PostLikeResolver } from './postLike.resolver';
import { PostLikeService } from './postLike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLike]),
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([PostScore]),
  ],
  providers: [PostLikeService, PostLikeResolver],
  exports: [PostLikeService],
})
export class PostLikeModule {}
