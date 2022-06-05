import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@InputType('InputSignin', { isAbstract: true })
@ObjectType()
@Entity()
export class Auth {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  social_id!: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  access_token!: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  provider!: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  githubId!: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: ' user_id' })
  user!: User;
}
