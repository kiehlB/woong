import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('createPost')
export class CreatePostRequest {
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
}

@ObjectType()
export class CreatePostResponse {
  @Field((type) => String)
  title!: string;
}
