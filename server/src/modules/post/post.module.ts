import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Comments } from '../comment/comment.entity';
import { CommentModule } from '../comment/comment.module';
import { CommentService } from '../comment/comment.service';
import { PostLike } from '../postLike/postLike.entity';
import { PostLikeModule } from '../postLike/postLike.module';
import { PostLikeService } from '../postLike/postLike.service';
import PostsTags from '../tag/entity/postTag.entity';
import { Tag } from '../tag/entity/tag.entity';
import { UserModule } from '../user/user.module';
import { Post } from './entitiy/post.entity';
import { PostScore } from './entitiy/postScore.entity';
import PostsLoaders from './post.loader';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([PostsTags]),
    TypeOrmModule.forFeature([PostScore]),
    TypeOrmModule.forFeature([Comments]),
    TypeOrmModule.forFeature([PostLike]),
    UserModule,
    AuthModule,
  ],
  providers: [PostService, PostResolver, CommentService, PostsLoaders],
  exports: [PostService],
})
export class PostModule {}
