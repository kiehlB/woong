import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  getManager,
} from 'typeorm';

import DataLoader from 'dataloader';
import { Tag } from './tag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entitiy/post.entity';

@Entity('posts_tags', {
  synchronize: true,
})
@ObjectType()
export default class PostsTags {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((type) => Number, { nullable: true })
  @Column()
  post_id!: number;

  @Field((type) => Number, { nullable: true })
  @Column()
  tag_id!: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne((type) => Tag, { cascade: true, eager: true })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag;

  @ManyToOne((type) => Post, { cascade: true })
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
