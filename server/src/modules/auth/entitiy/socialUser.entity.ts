import { Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entitiy/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('social_user', {
  synchronize: true,
})
export default class SocialUser {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  social_id!: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  access_token!: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255 })
  provider!: string;

  @Index()
  @Field((type) => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  githubId: string;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => User, { nullable: true })
  @OneToOne((type) => User, { cascade: true })
  @JoinColumn({ name: ' user_id' })
  user!: User;

  @Field((type) => User, { nullable: true })
  @Column('uuid')
  user_id!: string;
}
