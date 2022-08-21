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

@Entity()
@ObjectType()
export default class PostsTags {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((type) => Int, { nullable: true })
  @Column()
  post_id!: number;

  @Field((type) => Int, { nullable: true })
  @Column()
  tag_id!: number;

  @Field((type) => String, { nullable: true })
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => String, { nullable: true })
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Field((type) => Tag, { nullable: true })
  @ManyToOne((type) => Tag, { cascade: true, eager: true })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag;

  @Field((type) => [Post], { nullable: true })
  @ManyToOne((type) => Post, { cascade: true })
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
