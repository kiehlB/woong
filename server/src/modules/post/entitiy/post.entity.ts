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
import { Tag } from '../../tag/entity/tag.entity';
import { Comments } from '../../comment/comment.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255, nullable: true, type: 'varchar' })
  thumbnail!: string | null;

  @Field((type) => String, { nullable: true })
  @Column()
  title: string;

  @Field((type) => String, { nullable: true })
  @Column()
  body: string;

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

  @Field((type) => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @Field((type) => Comments)
  @OneToMany((type) => Comments, (comments) => comments.post)
  comments: Comments[];
}
