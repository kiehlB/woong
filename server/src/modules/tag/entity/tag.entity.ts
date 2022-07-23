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
  RelationId,
  Index,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((type) => [String])
  @Column({ length: 200 })
  name: string;

  @Field((type) => String)
  @Index()
  @Column({ length: 255 })
  name_filtered!: string;

  @Field((type) => Date)
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date)
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;
}
