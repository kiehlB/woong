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
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { CreatePostLikeRequest } from './dto/postLikeRequest.dto';

import { PostLike } from './postLike.entity';
import { PostLikeService } from './postLike.service';

@Resolver((of) => PostLike)
export class PostLikeResolver {
  constructor(private readonly PostLikeService: PostLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostLike)
  async PostLike(
    @CurrentUser() user: TokenUser,
    @Args('input') post: CreatePostLikeRequest,
  ) {
    return this.PostLikeService.liked(user, post);
  }
}
