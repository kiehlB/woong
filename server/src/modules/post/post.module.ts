import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostLikeModule } from '../postLike/postLike.module';
import PostsTags from '../tag/entity/postTag.entity';
import { Tag } from '../tag/entity/tag.entity';
import { UserModule } from '../user/user.module';
import { Post } from './entitiy/post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([PostsTags]),
    UserModule,
    AuthModule,
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
