import { Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/user/entitiy/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('post_reads', {
  synchronize: false,
})
export default class PostRead {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    nullable: true,
  })
  user_id!: string | null;

  @Index()
  @Column()
  post_id!: string;

  @Index()
  @Column({ length: 255 })
  ip_hash!: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne((type) => Post, { cascade: true, eager: true })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
