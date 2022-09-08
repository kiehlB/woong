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
import { Comments } from '../comment/comment.entity';
import { typeOrmConnectionDataSource } from 'src/app.module';
import { normalize } from 'src/common/utils/normalize';
import { CommentService } from '../comment/comment.service';
import PostsLoaders from './post.loader';
import { getSinglePostRequest } from './dto/getPost.dto';
import { PostLike } from '../postLike/postLike.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly CommentsService: CommentService,
    private postsLoaders: PostsLoaders,
  ) {}

  @Query(() => Post, { nullable: true })
  findSinglePost(@Args('input') post: getSinglePostRequest) {
    return this.postService.findPost(post);
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

  // @ResolveField('post_likes', (retruns) => PostLike, { nullable: true })
  // async getPostLike(
  //   @Parent() post: Post,
  //   @Context('postLikeLoader')
  //   postLikeLoader: DataLoader<number, PostLike>,
  // ) {
  //   const { id } = post;

  //   return postLikeLoader.load(id);
  // }

  @ResolveField('post_likes', (retruns) => [PostLike], { nullable: true })
  async getPostLikes(
    @Parent() post: Post,
    @Context('postLikeLoader')
    postLikeLoader: DataLoader<number, [PostLike]>,
  ) {
    const { id } = post;

    return postLikeLoader.load(id);
  }

  @ResolveField('posts_tags', (retruns) => [PostsTags], { nullable: true })
  async getPostTags(
    @Parent() post: Post,
    @Context('postTagLoader')
    postTagLoader: DataLoader<number, [PostsTags]>,
  ) {
    const { id } = post;

    return postTagLoader.load(id);
  }

  @ResolveField('comments', (retruns) => [Comments], { nullable: true })
  async getCommentsLoader(
    @Parent() user: Post,
    @Context('commentsLoader')
    commentsLoader: DataLoader<number, [Comments]>,
  ) {
    const { id } = user;

    return commentsLoader.load(id);
  }
}
