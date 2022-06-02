import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import { TagService } from './tag.service';
import { Tag } from './tag.entity';

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
import { CreateTagRequest } from './dto/createTag.dto';
import { FindTagRequest } from './dto/findTag.dto';

import DataLoader from 'dataloader';
import { Post } from '../post/post.entity';

@Resolver((of) => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('input') tag: CreateTagRequest): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @ResolveField('post', () => Post)
  async getPosts(
    @Parent() tag: Tag,
    @Context('tagsLoader') tagsLoader: DataLoader<number, Post>,
  ) {
    const { post_id } = tag;

    return tagsLoader.load(post_id);
  }

  @Query(() => [Tag])
  findByIdTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findById(id);
  }
}
