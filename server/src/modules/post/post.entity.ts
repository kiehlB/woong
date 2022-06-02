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
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Tag } from '../tag/tag.entity';
import { Comments } from '../comment/comment.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => String, { nullable: true })
  @Column({ default: null })
  cover: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  html: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'mediumtext', default: null })
  toc: string;

  @Field((type) => String, { nullable: true })
  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status!: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'int', default: 0 })
  views!: number;

  @Field((type) => Int, { nullable: true })
  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Field((type) => Boolean, { nullable: true })
  @Column({ type: 'boolean', default: false })
  isRecommended!: boolean;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Field((type) => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags!: Tag[];

  @Field((type) => Comments)
  @OneToMany((type) => Comments, (comment) => comment.post)
  comment!: Comments[];
}
