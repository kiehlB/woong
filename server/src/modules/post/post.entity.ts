import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Tag } from '../tag/tag.entity';
import { Comments } from '../comment/comment.entity';
import { PostLike } from '../postLike/postLike.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Field((type) => String, { nullable: true })
  @Column()
  title: string;

  @Field((type) => Int, { nullable: true })
  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  // @Field((type) => [Tag], { nullable: true })
  // @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  // @JoinTable()
  // tags!: Tag[];

  @Field((type) => Comments)
  @OneToMany((type) => Comments, (comments) => comments.post)
  comments: Comments[];
}
