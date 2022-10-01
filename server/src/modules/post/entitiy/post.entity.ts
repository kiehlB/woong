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
  JoinColumn,
} from 'typeorm';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Tag } from '../../tag/entity/tag.entity';
import { Comments } from '../../comment/comment.entity';
import { User } from 'src/modules/user/entitiy/user.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  thumbnail?: string;

  @Field((type) => String, { nullable: true })
  @Column()
  title: string;

  @Field((type) => String, { nullable: true })
  @Column()
  body: string;

  @Field((type) => Int, { nullable: true })
  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Field((type) => Boolean, { nullable: true })
  @Column({ nullable: true })
  liked!: boolean;

  @Field((type) => String, { nullable: true })
  @Column()
  difficulty!: string;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  user_id!: number;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field((type) => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @Field((type) => [Comments], { nullable: true })
  @OneToMany((type) => Comments, (comments) => comments.post)
  comments: Comments[];
}
