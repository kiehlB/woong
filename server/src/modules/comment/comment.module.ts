import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/entitiy/post.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { Comments } from './comment.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
