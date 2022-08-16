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
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UserService } from '../user/users.service';
import { PostService } from './post.service';
import { CreatePostRequest, CreatePostResponse } from './dto/createPost.dto';

import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { Post } from './entitiy/post.entity';
import { Tag } from '../tag/entity/tag.entity';
import DataLoader from 'dataloader';
import PostsTags from '../tag/entity/postTag.entity';

@Resolver((of) => Post)
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
  ): Promise<Post> {
    const savePost = await this.postService.createPost(user, post);

    return savePost;
  }

  @ResolveField('posts_tags', (retruns) => PostsTags, { nullable: true })
  async getPostTags(
    @Parent() post: Post,
    @Context('postTagLoader')
    postTagLoader: DataLoader<number, PostsTags>,
  ) {
    const { id } = post;

    return postTagLoader.load(id);
  }
}
