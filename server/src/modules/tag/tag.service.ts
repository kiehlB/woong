import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import PostsTags from './entity/postTag.entity';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(PostsTags)
    private readonly PostTagRepository: Repository<PostsTags>,
  ) {}

  async create(tag: Partial<Tag>): Promise<Tag> {
    const newTag = await this.tagRepository.create(tag);
    await this.tagRepository.save(newTag);
    return newTag;
  }

  async getAllTags(): Promise<Tag[]> {
    const tag = await this.tagRepository;
    const tags = await tag.find();

    return tags;
  }

  async getUsersByIds(ids) {
    return this.PostTagRepository.find({
      where: { post_id: In(ids) },
    });
  }

  async getAllPostTags(): Promise<PostsTags[]> {
    const postTag = await this.PostTagRepository;
    const tags = await postTag.find();

    return tags;
  }

  async getTagsByIds(ids: readonly number[]) {
    const tag = await this.tagRepository;
    const tags = await tag.find();
    return tags.filter((u) => ids.includes(u.id));
  }

  async getPostTagsByIds(ids: readonly number[]) {
    const tag = await this.PostTagRepository;

    const tags = await tag.find();

    return tags;
  }

  async findById(id): Promise<Tag> {
    const data = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.id=:id')
      .orWhere('tag.label=:id')
      .orWhere('tag.value=:id')
      .setParameter('id', id)
      .getOne();

    return data;
  }

  async updateById(id, tag: Partial<Tag>): Promise<Tag> {
    const oldTag = await this.tagRepository.findOne(id);
    const updatedTag = await this.tagRepository.merge(oldTag, tag);
    return this.tagRepository.save(updatedTag);
  }

  async deleteById(id) {
    try {
      const tag = await this.tagRepository.findOne(id);
      await this.tagRepository.remove(tag);
      return true;
    } catch (e) {
      throw new HttpException(
        'something went to wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
