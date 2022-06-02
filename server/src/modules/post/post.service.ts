import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './Post.entity';
import { CreatePostRequest } from './dto/createPost.dto';

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
  async createPost(postArgs: CreatePostRequest) {
    const { title, content, cover } = postArgs;

    const post = new Post();

    post.title = title;
    post.content = content;
    post.cover = cover;
    await this.PostRepository.save(post);

    return post;
  }
}
