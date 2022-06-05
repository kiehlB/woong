import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';

import { User } from '../user/user.entity';
import { UserService } from '../user/users.service';
import { PostService } from './post.service';
import { CreatePostRequest, CreatePostResponse } from './dto/createPost.dto';
import { Post } from './post.entity';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  findPost(args): Promise<Post> {
    return this.postService.findPost(args);
  }

  @Query(() => [Post])
  findAllPost(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() user: TokenUser,
    @Args('input') post: CreatePostRequest,
  ) {
    const saveProfile = await this.postService.createPost(user, post.title);

    return saveProfile;
  }
}
