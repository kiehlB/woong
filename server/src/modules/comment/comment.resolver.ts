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
import { CurrentUser } from 'src/decorator/auth-user.decorator';
import { CommentService } from './comment.service';
import {
  CreateCommentRequest,
  DeleteCommentRequest,
} from './dto/createComment.dto';
import { User } from '../user/entitiy/user.entity';

@Resolver((of) => Comments)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comments])
  async findAllComments(): Promise<Comments[]> {
    const users = await this.commentService.findAll();

    return users;
  }

  @Mutation(() => Comments)
  createComment(
    @CurrentUser() user: User,
    @Args('input') comment: CreateCommentRequest,
  ): Promise<Comments> {
    return this.commentService.create(user, comment);
  }

  @Mutation(() => Comments)
  editComment(
    @CurrentUser() user: User,
    @Args('input') comment: CreateCommentRequest,
  ): Promise<Comments> {
    return this.commentService.edit(user, comment);
  }

  @Mutation(() => Boolean)
  removeComment(
    @CurrentUser() user: User,
    @Args('input') comment: DeleteCommentRequest,
  ): Promise<Boolean> {
    return this.commentService.remove(user, comment);
  }
}
