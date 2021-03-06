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
export class PostLike {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column('uuid')
  user_id!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid')
  post_id!: string;

  @ManyToOne((type) => Post)
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
