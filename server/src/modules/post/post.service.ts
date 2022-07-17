import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostRequest } from './dto/createPost.dto';
import { Post } from './entitiy/post.entity';

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
  async createPost(user, post) {
    const postsRepo = await this.PostRepository;

    const newUserProfile = await postsRepo.create({
      title: post.title,
      body: post.body,
    });

    await postsRepo.save(newUserProfile);

    return newUserProfile;
  }
}
