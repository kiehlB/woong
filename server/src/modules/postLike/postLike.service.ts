import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../post/entitiy/post.entity';
import { PostLike } from './postLike.entity';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,
  ) {}

  async liked(user, args) {
    const getPost = await this.PostRepository;
    const LikePost = await this.postLikeRepository;

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

    const newUser = LikePost.create({
      post_id: args.id,
      user_id: user.id,
    });

    try {
      await LikePost.save(newUser);
    } catch (e) {
      return post;
    }

    // const count = await getLikePost.count({
    //   where: {
    //     post_id: args.id,
    //   },
    // });

    // post.likes = count;

    // await getPost.save(post);

    // const score = new Score();
    // score.type = 'LIKE';
    // score.post_id = args.id;
    // score.score = 5;
    // score.user_id = user.id;
    // await getPostScore.save(score);

    return post;
  }

  async getUsersByIds(ids) {
    return this.postLikeRepository.find({
      where: { post_id: In(ids) },
    });
  }
}
