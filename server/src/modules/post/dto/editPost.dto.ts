import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('editPost')
export class EditPostRequest {
  @Field((type) => Int, { nullable: true })
  user_id?: number;

  @Field((type) => Int, { nullable: true })
  post_id?: number;

  @Field((type) => String, { nullable: true })
  @IsString()
  title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  body?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  thumbnail?: string;

  @Field((type) => [String], { nullable: true })
  @IsString()
  tags?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  difficulty?: string;
}

@ObjectType()
export class EditPostResponse {
  @Field((type) => String)
  title!: string;
}
