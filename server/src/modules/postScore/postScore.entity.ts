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
import { Tag } from '../tag/tag.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class PostScore {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ length: 255 })
  type!: string;

  @Field(() => String, { nullable: true })
  @Index()
  @Column('uuid')
  user_id!: string;

  @Field(() => String, { nullable: true })
  @Index()
  @Column('uuid')
  post_id!: string;

  @Field(() => Int, { nullable: true })
  @Column({
    default: 0,
  })
  score!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // @ManyToOne((type) => Post)
  // @JoinColumn({ name: 'post_id' })
  // post!: Post;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
