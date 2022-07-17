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
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';

import { PostLike } from './PostLike.entity';
import { PostLikeService } from './postLike.service';

@Resolver((of) => PostLike)
@UseGuards(JwtAuthGuard)
export class PostLikeResolver {
  constructor(private readonly PostLikeService: PostLikeService) {}
}
