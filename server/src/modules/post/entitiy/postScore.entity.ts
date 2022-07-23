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
  Index,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entitiy/user.entity';
import { Post } from './post.entity';

@ObjectType()
@Entity()
export class PostScore {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ length: 255 })
  type!: string;

  @Field(() => String, { nullable: true })
  @Index()
  @Column()
  user_id!: string;

  @Field(() => String, { nullable: true })
  @Index()
  @Column()
  post_id!: string;

  @Field(() => Int, { nullable: true })
  @Column({
    default: 0,
  })
  score!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne((type) => Post)
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
