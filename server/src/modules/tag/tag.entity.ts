import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((type) => String)
  @Column({ length: 200 })
  label: string;

  @Field((type) => String)
  @Column({ length: 200 })
  value: string;

  // @Field((type) => Number)
  // @RelationId((tags: Tag) => tags.posts)
  // post_id!: number;

  // @Field((type) => Post)
  // @ManyToOne(() => Post, (post) => post.tags)
  // @JoinColumn({ name: 'post_id' })
  // posts: Post[];

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
