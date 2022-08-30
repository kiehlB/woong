import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { escapeForUrl } from '../../common/utils/escapeForUrl';

import { Repository } from 'typeorm';
import PostsTags from '../tag/entity/postTag.entity';
import { Tag } from '../tag/entity/tag.entity';

import { CreatePostRequest } from './dto/createPost.dto';
import { Post } from './entitiy/post.entity';
import { normalize } from '../../common/utils/normalize';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,

    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>,

    @InjectRepository(PostsTags)
    private readonly PostsTagsRepository: Repository<PostsTags>,
  ) {}
  async findPost(args): Promise<Post> {
    const findPost = await this.PostRepository.createQueryBuilder('post')
      .where('post.id = :id', { id: args.id })
      .leftJoinAndSelect('post.user', 'user')
      .getOne();

    return findPost;
  }
  async findAll() {
    const postsRepo = await this.PostRepository;
    const posts = await postsRepo.find();

    const findPost = await this.PostRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .getMany();

    return posts;
  }
  async createPost(user, post) {
    if (!user.id) {
      throw new AuthenticationError('Not Logged In');
    }
    const postsRepo = await this.PostRepository;
    const tagRepo = await this.TagRepository;
    const postagRepo = await this.PostsTagsRepository;

    const newPost = await postsRepo.create({
      title: post.title,
      body: post.body,
      difficulty: post.difficulty,
    });

    const tags = await Promise.all(
      post.tags.map(async (e) => {
        const tag = await tagRepo.findOne({
          where: {
            name_filtered: escapeForUrl(e).toLowerCase(),
          },
        });
        if (tag) {
          return tag;
        }

        const createTags = await tagRepo.create({
          name: e,
          name_filtered: escapeForUrl(e).toLowerCase(),
        });

        await tagRepo.save(createTags);
      }),
    );

    await postsRepo.save(newPost);

    const uniqueTags = tags.reduce<Tag[]>((acc, current) => {
      if (!acc.find((tag) => tag?.id === current?.id)) {
        acc.push(current);
        return acc;
      }
      return acc;
    }, []);

    const prevPostTags = await postagRepo.find({
      where: {
        post_id: newPost.id,
      },
    });

    const normalized = {
      prev: normalize(prevPostTags, (postTag) => postTag.tag_id),
      current: normalize(uniqueTags),
    };

    const missing = prevPostTags.filter(
      (postTag) => !normalized.current[postTag.tag_id],
    );
    missing.forEach((tag) => postagRepo.remove(tag));

    const tagsToAdd = uniqueTags.filter((tag) => !normalized.prev[tag.id]);
    const postTags = tagsToAdd.map((tag) => {
      const postTag = new PostsTags();
      postTag.post_id = newPost.id;

      postTag.tag_id = tag.id;
      return postTag;
    });
    postagRepo.save(postTags);

    return newPost;
  }
}
