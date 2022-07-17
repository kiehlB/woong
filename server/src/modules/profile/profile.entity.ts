import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  RelationId,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../user/entitiy/user.entity';

@ObjectType()
@Entity()
export class UserProfile {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column()
  bio: string;

  @Field((type) => String, { nullable: true })
  @Column()
  user_id!: string;

  @Field((type) => User, { nullable: true })
  @OneToOne((type) => User, (user: User) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
