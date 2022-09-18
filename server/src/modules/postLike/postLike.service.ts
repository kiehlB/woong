import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../post/entitiy/post.entity';
import { PostScore } from '../post/entitiy/postScore.entity';
import { PostLike } from './postLike.entity';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,

    @InjectRepository(PostScore)
    private readonly PostScoreRepository: Repository<PostScore>,
  ) {}

  async liked(user, args) {
    if (!user) {
      throw new Error('유저가 없습니다!');
    }
    const getPost = await this.PostRepository;
    const LikePost = await this.postLikeRepository;
    const PostScore = await this.PostScoreRepository;

    const post = await getPost.findOne({
      where: {
        id: args.id,
      },
    });

    const alreadyLiked = await this.postLikeRepository.findOne({
      where: {
        post_id: args.id,
        user_id: user.id,
      },
    });

    if (alreadyLiked) {
      return post;
    }

    const newUser = LikePost.create({
      post_id: args.id,
      user_id: user.id,
    });

    try {
      await LikePost.save(newUser);
    } catch (e) {
      return post;
    }

    const count = await LikePost.count({
      where: {
        post_id: args.id,
      },
    });

    post.likes = count;

    await getPost.save(post);

    const createPostScore = await PostScore.create({
      type: 'LIKE',
      post_id: args.id,
      score: 5,
      user_id: user.id,
    });

    PostScore.save(createPostScore);

    return post;
  }

  async getUsersByIds(ids) {
    return this.postLikeRepository.find({
      where: { post_id: In(ids) },
    });
  }
}
