import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/entitiy/user.entity';
import { Post } from '../post/entitiy/post.entity';

@ObjectType()
@Entity()
export class Comments {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'text', default: null })
  text!: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    nullable: true,
  })
  reply!: number;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false, nullable: true })
  has_replies?: boolean;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false })
  deleted!: boolean;

  @Field((type) => Int, { nullable: true })
  @Column()
  user_id!: number;

  @Field((type) => Int, { nullable: true })
  @Column()
  post_id!: number;

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

  @ManyToOne((type) => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  subcomments!: Comments[];
}
