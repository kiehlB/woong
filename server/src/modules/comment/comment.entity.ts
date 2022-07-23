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
} from 'typeorm';

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../user/entitiy/user.entity';
import { Post } from '../post/entitiy/post.entity';

@ObjectType()
@Entity()
export class Comments {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'text', default: null })
  text!: string;

  @Field((type) => Number, { nullable: true })
  @Column({ default: 0 })
  likes!: number;

  @Field((type) => String, { nullable: true })
  @Column('uuid', {
    nullable: true,
  })
  reply!: string;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false })
  has_replies!: boolean;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false })
  deleted!: boolean;

  @Field((type) => String, { nullable: true })
  @Column('uuid')
  user_id!: string;

  @Field((type) => String, { nullable: true })
  @Column('uuid')
  post_id!: string;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  post: Post;

  subcomments!: Comments[];
}
