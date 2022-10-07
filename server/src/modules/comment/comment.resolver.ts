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
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Comments } from './comment.entity';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { CommentService } from './comment.service';
import {
  CreateCommentRequest,
  DeleteCommentRequest,
} from './dto/createComment.dto';
import { User } from '../user/entitiy/user.entity';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';

import { EditCommentRequest } from './dto/editComment.dto';

@Resolver((of) => Comments)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comments], { nullable: true })
  async findAllComments(): Promise<Comments[]> {
    const users = await this.commentService.findAll();

    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comments)
  createComment(
    @CurrentUser() user: TokenUser,
    @Args('input') comment: CreateCommentRequest,
  ): Promise<Comments> {
    console.log(user);
    return this.commentService.create(user, comment);
  }

  @Mutation(() => Comments)
  editComment(
    @CurrentUser() user: TokenUser,
    @Args('input') comment: EditCommentRequest,
  ): Promise<Comments> {
    return this.commentService.edit(user, comment);
  }

  @Mutation(() => Boolean)
  removeComment(
    @CurrentUser() user: TokenUser,
    @Args('input') comment: DeleteCommentRequest,
  ): Promise<Boolean> {
    return this.commentService.remove(user, comment);
  }
}
