import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(tag: Partial<Tag>): Promise<Tag> {
    const { label } = tag;
    const existTag = await this.tagRepository.findOne({ where: { label } });

    if (existTag) {
      throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST);
    }

    const newTag = await this.tagRepository.create(tag);
    await this.tagRepository.save(newTag);
    return newTag;
  }

  async getTagsByIds(ids: readonly number[]) {
    const tag = await this.tagRepository;
    const tags = await tag.find();
    return tags.filter((u) => ids.includes(u.id));
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

  async findByIds(ids): Promise<Array<Tag>> {
    return this.tagRepository.findByIds(ids);
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
