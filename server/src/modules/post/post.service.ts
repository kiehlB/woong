import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './Post.entity';
import { CreatePostRequest } from './dto/createPost.dto';

const Segment = require('segment');
const segment = new Segment();
segment.useDefault();

export const extractProtectedPost = (Post) => {
  delete Post.content;
  delete Post.html;
};

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,
  ) {}
  async findPost(args): Promise<Post> {
    const findPost = await this.PostRepository.createQueryBuilder('post')
      .where('post.id = :id', { id: args.id })
      .leftJoinAndSelect('post.user', 'user')
      .getOne();

    return findPost;
  }
  async findAll(): Promise<Post[]> {
    const postsRepo = await this.PostRepository;
    const posts = await postsRepo.find();

    return posts;
  }
}
