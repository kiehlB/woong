import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { Comments } from './comment.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    AuthModule,
    PostModule,
    UserModule,
  ],
  providers: [CommentService, CommentResolver],
})
export class CommentsModule {}
