import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { escapeForUrl } from '../../common/utils/escapeForUrl';

import { EntityManager, getManager, Repository } from 'typeorm';
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

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
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

  async getTrendingPosts() {
    const postsRepo = await this.PostRepository;
    const posts = await postsRepo.find();

    const rows = (await this.entityManager.getRepository(Post).query(
      `
    select post.id, post.title, SUM(score) as score  from post_score
    inner join post on post_score.post_id = post.id
    where post_score.created_at > now()
    group by post.id
    order by score desc, post.id desc
    offset $1
    limit $2
  `,
      [1, 10],
    )) as { id: string; score: number }[];

    console.log(rows);

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
      user_id: user.id,
      body: post.body,
      difficulty: post.difficulty,
      title: post.title,
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

        return await tagRepo.save(createTags);
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

  async editPost(user, post) {
    if (!user) {
      throw new AuthenticationError('plz login');
    }

    const { post_id, title, body, thumbnail, user_id } = post;

    const postsRepo = await this.PostRepository;
    const tagRepo = await this.TagRepository;
    const postagRepo = await this.PostsTagsRepository;

    const findPost = await postsRepo.findOne({
      where: {
        id: post_id,
      },
    });

    if (!findPost) {
      throw new ApolloError('Post not found');
    }

    if (user_id !== user.id) {
      throw new ApolloError('this is not yours');
    }

    const DoEditPost = await postsRepo.save({
      ...findPost,
      body: post.body,
      difficulty: post.difficulty,
      title: post.title,
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

        return await tagRepo.save(createTags);
      }),
    );

    /* @ts-ignore */
    const uniqueTags = tags.reduce<Tag[]>((acc, current) => {
      if (!acc.find((tag) => tag?.id === current?.id)) {
        acc.push(current);
        return acc;
      }
      return acc;
    }, []);

    const prevPostTags = await postagRepo.find({
      where: {
        post_id: findPost.id,
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
      postTag.post_id = findPost.id;

      postTag.tag_id = tag.id;
      return postTag;
    });
    await postagRepo.save(postTags);

    return DoEditPost;
  }

  async removePost(user, post) {
    const postsRepo = await this.PostRepository;

    if (!user) {
      throw new AuthenticationError('plz login');
    }

    const findPost = await postsRepo.findOne({
      where: {
        id: post.post_id,
      },
    });

    if (!findPost) {
      throw new ApolloError('Post not found');
    }

    if (post.user_id !== user.id) {
      throw new ApolloError('This is not your post');
    }

    await postsRepo.remove(findPost);

    return true;
  }
}
