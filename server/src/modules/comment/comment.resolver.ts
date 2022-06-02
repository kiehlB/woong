import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';
import { Comments } from './comment.entity';
import { User } from '../user/user.entity';
import { CurrentUser } from 'src/decorator/auth-user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentRequest } from './dto/createComment.dto';

@Resolver((of) => Comments)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Query(() => [Comments])
  async findAllComments(): Promise<Comments[]> {
    const users = await this.commentService.findAll();

    return users;
  }

  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @Mutation(() => Comments)
  //   createComment(
  //     @CurrentUser() user: User,
  //     @Args('input') comment: CreateCommentRequest,
  //   ): Promise<Comments> {
  //     return this.commentService.create(user, comment);
  //   }
}
