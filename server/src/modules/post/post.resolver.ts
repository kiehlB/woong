import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostRequest, CreatePostResponse } from './dto/createPost.dto';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { Post } from './entitiy/post.entity';
import DataLoader from 'dataloader';
import PostsTags from '../tag/entity/postTag.entity';
import { Comments } from '../comment/comment.entity';
import { getSinglePostRequest } from './dto/getPost.dto';
import { PostLike } from '../postLike/postLike.entity';
import { EditPostRequest } from './dto/editPost.dto';
import { RemovePostRequest } from './dto/removePost.dto';
import { SearchPostRequest } from './dto/searchPost.dto';
import { User } from '../user/entitiy/user.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post, { nullable: true })
  findSinglePost(@Args('input') post: getSinglePostRequest): Promise<Post> {
    return this.postService.findPost(post);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean, { nullable: true })
  isPostLike(
    @CurrentUser() user: TokenUser,
    @Args('input') post: getSinglePostRequest,
  ): Promise<Boolean> {
    return this.postService.isPostLike(post, user);
  }

  @Query(() => [Post])
  findAllPost(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => [Post])
  getTrendingPosts(): Promise<Post[]> {
    return this.postService.getTrendingPosts();
  }

  @Query(() => [Post])
  getTextSearchPosts(@Args('input') post: SearchPostRequest): Promise<Post[]> {
    return this.postService.getTextSearchPosts(post);
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async editPost(
    @CurrentUser() user: TokenUser,
    @Args('input') post: EditPostRequest,
  ): Promise<Post> {
    const savePost = await this.postService.editPost(user, post);

    return savePost;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removePost(
    @CurrentUser() user: TokenUser,
    @Args('input') post: RemovePostRequest,
  ): Promise<any> {
    const savePost = await this.postService.removePost(user, post);

    return savePost;
  }

  @ResolveField('post_likes', (retruns) => [PostLike], { nullable: true })
  async getPostLikes(
    @Parent() post: Post,
    @Context('postLikeLoader')
    postLikeLoader: DataLoader<number, [PostLike]>,
  ) {
    const { id } = post;

    return postLikeLoader.load(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @ResolveField('liked', (retruns) => Boolean, { nullable: true })
  // async isPostLiked(@CurrentUser() user: TokenUser, @Parent() p: Post) {
  //   console.log(user);
  //   const savePost = await this.postService.postLiked(p, user);

  //   return savePost;
  // }

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

  @ResolveField('user', (retruns) => [User], { nullable: true })
  async getUsersLoader(
    @Parent() user: Post,
    @Context('usersLoader')
    usersLoader: DataLoader<number, [User]>,
  ) {
    const { id } = user;

    return usersLoader.load(id);
  }
}
