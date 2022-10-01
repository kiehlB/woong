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
import { PostLikeRequest } from './dto/postLikeRequest.dto';

import { PostLike } from './postLike.entity';
import { PostLikeService } from './postLike.service';

@Resolver((of) => PostLike)
export class PostLikeResolver {
  constructor(private readonly PostLikeService: PostLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostLike)
  async postLike(
    @CurrentUser() user: TokenUser,
    @Args('input') post: PostLikeRequest,
  ) {
    return this.PostLikeService.liked(user, post);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostLike)
  async postUnLike(
    @CurrentUser() user: TokenUser,
    @Args('input') post: PostLikeRequest,
  ) {
    return this.PostLikeService.unLiked(user, post);
  }
}
