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

@ObjectType()
@Entity()
export class Following {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { nullable: true })
  @Column('uuid')
  user_id!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid')
  following_id!: string;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'follower_id' })
  following!: User;
}
