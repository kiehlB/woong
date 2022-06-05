import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostLikeModule } from '../postLike/postLike.module';
import { UserModule } from '../user/user.module';
import { Post } from './Post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, AuthModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
