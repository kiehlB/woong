import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { UserProfile } from 'src/modules/profile/profile.entity';

@InputType('InputSignin', { isAbstract: true })
@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: true })
  @Column({ length: 30, nullable: true })
  username?: string;

  @Field((type) => String, { nullable: true })
  @Exclude()
  @Column({ length: 200, nullable: true })
  password?: string;

  @Field((type) => String, { nullable: true })
  @Index()
  @IsEmail()
  @Column({ length: 200, default: null })
  email!: string;

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false })
  email_verified!: boolean;

  @Field((type) => UserProfile, { nullable: true })
  @OneToOne((type) => UserProfile, (profile) => profile.user)
  profile?: UserProfile;

  @Field((type) => Date, { nullable: true })
  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Field((type) => Date, { nullable: true })
  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  static async comparePassword(PreEncryptionPassword, EncryptedPassword) {
    return bcrypt.compareSync(PreEncryptionPassword, EncryptedPassword);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      if (!/^\$2a\$\d+\$/.test(this.password)) {
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
